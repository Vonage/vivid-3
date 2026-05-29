#!/usr/bin/env bun

/**
 * GitHub API stub.
 */

import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const PORT = parseInt(process.env.PORT!);
const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER!;
const GITHUB_REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME!;
const STATE_PATH = '/env/state/github-stub.json';

if (!existsSync(STATE_PATH)) writeState({ repos: {} });

function readState(): any {
	return JSON.parse(readFileSync(STATE_PATH, 'utf-8'));
}

function writeState(state: any) {
	writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');
}

function repoState(state: any, key: string) {
	return state.repos[key] ?? { refs: [], releases: [], pulls: [] };
}

function hashInt(value: string): number {
	return parseInt(
		createHash('sha1').update(value).digest('hex').slice(0, 8),
		16
	);
}

function isoNow(): string {
	return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function save(state: any, key: string, rs: any) {
	state.repos[key] = rs;
	writeState(state);
}

function refUrl(key: string, ref: string): string {
	return `https://api.github.com/repos/${key}/git/${ref}`;
}

Bun.serve({
	port: PORT,
	routes: {
		'/graphql': {
			POST: async (req) => {
				const { query = '', variables = {} } = await req.json();
				const state = readState();
				const key =
					variables.owner && variables.repo
						? `${variables.owner}/${variables.repo}`
						: `${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}`;
				const rs = repoState(state, key);

				if (query.includes('releases(')) {
					return Response.json({
						data: {
							repository: {
								releases: {
									nodes: rs.releases.map((r: any) => ({
										name: r.name,
										tag: { name: r.tag_name },
										tagCommit: { oid: r.target_commitish },
										url: r.html_url,
										description: r.body,
										isDraft: r.draft,
									})),
									pageInfo: { endCursor: null, hasNextPage: false },
								},
							},
						},
					});
				}

				if (query.includes('repository(')) {
					const repoMatches = Array.from(
						query.matchAll(
							/a(\d+):\s*repository\(\s*owner:\s*"([^"]+)"\s*name:\s*"([^"]+)"/g
						)
					);
					const commitMatches = Array.from(
						query.matchAll(
							/a([0-9a-f]{7,40}):\s*object\(expression:\s*"([^"]+)"\)/g
						)
					);
					const pullMatches = Array.from(
						query.matchAll(/pr__(\d+):\s*pullRequest\(number:\s*(\d+)\)/g)
					);
					const data: Record<string, any> = {};

					for (const [, repoIndex, owner, repo] of repoMatches) {
						const repoKey = `${owner}/${repo}`;
						const repoPulls = repoState(state, repoKey).pulls;
						const repoData: Record<string, any> = {};

						for (const [, field, expression] of commitMatches) {
							repoData[`a${field}`] = {
								commitUrl: `https://github.com/${repoKey}/commit/${expression}`,
								associatedPullRequests: { nodes: [] },
								author: {
									user: {
										login: 'pull-author',
										url: 'https://github.com/pull-author',
									},
								},
							};
						}

						for (const [, field, pullNumber] of pullMatches) {
							const pull = repoPulls.find(
								(p: any) => p.number === parseInt(pullNumber)
							);
							const login = pull?.head?.label?.split(':')[0] ?? owner;
							repoData[`pr__${field}`] = {
								url:
									pull?.html_url ??
									`https://github.com/${repoKey}/pull/${pullNumber}`,
								author: {
									login,
									url: `https://github.com/${login}`,
								},
								mergeCommit: {
									commitUrl: `https://github.com/${repoKey}/commit/${pullNumber}`,
									abbreviatedOid: `${pullNumber}`.padStart(7, '0'),
								},
							};
						}

						data[`a${repoIndex}`] = repoData;
					}

					return Response.json({ data });
				}

				return Response.json(
					{ message: 'Unsupported GraphQL route' },
					{ status: 404 }
				);
			},
		},

		'/repos/:owner/:repo': {
			GET: (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				return Response.json({
					id: hashInt(key),
					name: repo,
					full_name: key,
					default_branch: 'main',
					private: false,
					html_url: `https://github.com/${key}`,
					owner: { login: owner },
				});
			},
		},

		'/repos/:owner/:repo/git/trees/:ref': {
			GET: (req) => {
				const { owner, repo, ref } = req.params;
				return Response.json({
					sha: ref,
					tree: [],
					truncated: false,
				});
			},
		},

		'/repos/:owner/:repo/git/blobs/:sha': {
			GET: () => {
				return Response.json({ message: 'Not Found' }, { status: 404 });
			},
		},

		'/repos/:owner/:repo/git/refs': {
			POST: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const state = readState();
				const rs = repoState(state, key);
				const { ref, sha } = await req.json();
				// Idempotent: return existing ref if it already exists
				const existing = rs.refs.find((r: any) => r.ref === ref);
				if (existing) {
					return Response.json({
						ref: existing.ref,
						url: existing.url,
						object: { type: 'commit', sha: existing.sha },
					});
				}
				const url = refUrl(key, ref);
				rs.refs.push({ ref, sha, url });
				save(state, key, rs);
				return Response.json(
					{ ref, url, object: { type: 'commit', sha } },
					{ status: 201 }
				);
			},
		},

		'/repos/:owner/:repo/git/refs/*': {
			PATCH: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const refName = `refs/${decodeURIComponent(
					new URL(req.url).pathname.slice(
						`/repos/${owner}/${repo}/git/refs/`.length
					)
				)}`;
				const state = readState();
				const rs = repoState(state, key);
				const ref = rs.refs.find((r: any) => r.ref === refName);
				if (!ref)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				const { sha } = await req.json();
				ref.sha = sha;
				save(state, key, rs);
				return Response.json({
					ref: ref.ref,
					url: ref.url,
					object: { type: 'commit', sha: ref.sha },
				});
			},
			DELETE: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const refName = `refs/${decodeURIComponent(
					new URL(req.url).pathname.slice(
						`/repos/${owner}/${repo}/git/refs/`.length
					)
				)}`;
				const state = readState();
				const rs = repoState(state, key);
				rs.refs = rs.refs.filter((r: any) => r.ref !== refName);
				save(state, key, rs);
				return new Response(null, { status: 204 });
			},
		},

		'/repos/:owner/:repo/git/matching-refs/*': {
			GET: (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const prefix = decodeURIComponent(
					new URL(req.url).pathname.slice(
						`/repos/${owner}/${repo}/git/matching-refs/`.length
					)
				);
				const state = readState();
				const rs = repoState(state, key);
				return Response.json(
					rs.refs
						.filter((r: any) => r.ref.startsWith(`refs/${prefix}`))
						.map((r: any) => ({
							ref: r.ref,
							url: r.url,
							object: { type: 'commit', sha: r.sha },
						}))
				);
			},
		},

		'/repos/:owner/:repo/git/ref/*': {
			GET: (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const refName = `refs/${decodeURIComponent(
					new URL(req.url).pathname.slice(
						`/repos/${owner}/${repo}/git/ref/`.length
					)
				)}`;
				const state = readState();
				const ref = repoState(state, key).refs.find(
					(r: any) => r.ref === refName
				);
				if (!ref)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				return Response.json({
					ref: ref.ref,
					url: ref.url,
					object: { type: 'commit', sha: ref.sha },
				});
			},
		},

		'/repos/:owner/:repo/tags': {
			GET: (req) => {
				const { owner, repo } = req.params;
				const state = readState();
				const rs = repoState(state, `${owner}/${repo}`);
				return Response.json(
					rs.refs
						.filter((r: any) => r.ref.startsWith('refs/tags/'))
						.map((r: any) => ({
							name: r.ref.replace('refs/tags/', ''),
							commit: { sha: r.sha },
						}))
				);
			},
		},

		'/repos/:owner/:repo/releases/tags/:tag': {
			GET: (req) => {
				const { owner, repo, tag } = req.params;
				const release = repoState(
					readState(),
					`${owner}/${repo}`
				).releases.find((r: any) => r.tag_name === tag);
				if (!release)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				return Response.json(release);
			},
		},

		'/repos/:owner/:repo/releases': {
			GET: (req) => {
				const { owner, repo } = req.params;
				return Response.json(
					repoState(readState(), `${owner}/${repo}`).releases
				);
			},
			POST: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const state = readState();
				const rs = repoState(state, key);
				const p = await req.json();
				// Idempotent: return existing release if one with the same tag exists
				const existing = rs.releases.find(
					(r: any) => r.tag_name === p.tag_name
				);
				if (existing) {
					return Response.json(existing);
				}
				const release = {
					id: Date.now(),
					tag_name: p.tag_name,
					name: p.name || p.tag_name,
					body: p.body || '',
					draft: Boolean(p.draft),
					prerelease: Boolean(p.prerelease),
					target_commitish: p.target_commitish || 'main',
					html_url: `https://github.com/${key}/releases/tag/${p.tag_name}`,
					created_at: isoNow(),
				};
				rs.releases.push(release);
				// Also create a tag ref (mirrors real GitHub API behaviour)
				const tagRef = `refs/tags/${p.tag_name}`;
				if (!rs.refs.some((r: any) => r.ref === tagRef)) {
					rs.refs.push({
						ref: tagRef,
						sha: release.target_commitish,
						url: refUrl(key, tagRef),
					});
				}
				save(state, key, rs);
				return Response.json(release, { status: 201 });
			},
		},

		'/repos/:owner/:repo/pulls': {
			GET: (req) => {
				const { owner, repo } = req.params;
				const url = new URL(req.url);
				const headParam = url.searchParams.get('head');
				const baseParam = url.searchParams.get('base');
				const stateParam = url.searchParams.get('state');

				let pulls = repoState(readState(), `${owner}/${repo}`).pulls;

				if (headParam) {
					// head is "owner:branch" or just "branch"
					const headBranch = headParam.includes(':')
						? headParam.split(':').slice(1).join(':')
						: headParam;
					pulls = pulls.filter((p: any) => p.head.ref === headBranch);
				}
				if (baseParam) {
					pulls = pulls.filter((p: any) => p.base.ref === baseParam);
				}
				if (stateParam) {
					pulls = pulls.filter((p: any) => p.state === stateParam);
				}
				return Response.json(pulls);
			},
			POST: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const state = readState();
				const rs = repoState(state, key);
				const p = await req.json();
				const number = rs.pulls.length + 1;
				const pull = {
					number,
					title: p.title || '',
					body: p.body || '',
					head: { ref: p.head, label: `${owner}:${p.head}` },
					base: { ref: p.base, label: `${owner}:${p.base}` },
					state: 'open',
					html_url: `https://github.com/${key}/pull/${number}`,
				};
				rs.pulls.push(pull);
				save(state, key, rs);
				return Response.json(pull, { status: 201 });
			},
		},

		'/repos/:owner/:repo/pulls/:number': {
			GET: (req) => {
				const { owner, repo, number } = req.params;
				const pull = repoState(readState(), `${owner}/${repo}`).pulls.find(
					(p: any) => p.number === parseInt(number)
				);
				if (!pull)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				return Response.json(pull);
			},
			PATCH: async (req) => {
				const { owner, repo, number } = req.params;
				const key = `${owner}/${repo}`;
				const state = readState();
				const rs = repoState(state, key);
				const idx = rs.pulls.findIndex(
					(p: any) => p.number === parseInt(number)
				);
				if (idx === -1)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				const updates = await req.json();
				if (updates.title !== undefined) rs.pulls[idx].title = updates.title;
				if (updates.body !== undefined) rs.pulls[idx].body = updates.body;
				if (updates.state !== undefined) rs.pulls[idx].state = updates.state;
				save(state, key, rs);
				return Response.json(rs.pulls[idx]);
			},
		},
	},

	fetch(req) {
		const url = new URL(req.url);
		return Response.json(
			{
				message: 'Unsupported stub route',
				method: req.method,
				path: `${url.pathname}${url.search}`,
			},
			{ status: 404 }
		);
	},
});

console.log(`github-api listening on :${PORT}`);
