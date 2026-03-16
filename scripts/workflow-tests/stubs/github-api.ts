#!/usr/bin/env bun

/**
 * GitHub API stub.
 */

import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const PORT = parseInt(process.env.PORT!);
const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER!;
const GITHUB_REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME!;
const PROJECT_REPOSITORY = `${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}`;
const STATE_PATH = '/env/state/github-stub.json';
const REPO_ROOT = '/env/repo';
const RELEASE_PLEASE_FILES = [
	'.release-please-manifest.json',
	'release-please-config.json',
];

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

function gitBlobSha(content: Buffer): string {
	return createHash('sha1')
		.update(`blob ${content.length}\0`)
		.update(content)
		.digest('hex');
}

function isoNow(): string {
	return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function repoFiles(repoKey: string): Record<string, any> {
	if (repoKey !== PROJECT_REPOSITORY) return {};
	const files: Record<string, any> = {};
	for (const rel of RELEASE_PLEASE_FILES) {
		const p = `${REPO_ROOT}/${rel}`;
		if (!existsSync(p)) continue;
		const content = readFileSync(p);
		const sha = gitBlobSha(content as unknown as Buffer);
		files[rel] = { path: rel, sha, size: content.length, content };
	}
	return files;
}

function save(state: any, key: string, rs: any) {
	state.repos[key] = rs;
	writeState(state);
}

Bun.serve({
	port: PORT,
	routes: {
		'/graphql': {
			POST: async (req) => {
				const { query = '', variables = {} } = await req.json();
				const key =
					variables.owner && variables.repo
						? `${variables.owner}/${variables.repo}`
						: '';
				const state = readState();
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

				if (query.includes('pullRequestsSince(')) {
					return Response.json({
						data: {
							repository: {
								ref: {
									target: {
										history: {
											nodes: [],
											pageInfo: { hasNextPage: false, endCursor: null },
										},
									},
								},
							},
						},
					});
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
				const key = `${owner}/${repo}`;
				const files = repoFiles(key);
				return Response.json({
					sha: ref,
					tree: Object.values(files).map((e: any) => ({
						path: e.path,
						mode: '100644',
						type: 'blob',
						sha: e.sha,
						size: e.size,
						url: `https://api.github.com/repos/${key}/git/blobs/${e.sha}`,
					})),
					truncated: false,
				});
			},
		},

		'/repos/:owner/:repo/git/blobs/:sha': {
			GET: (req) => {
				const { owner, repo, sha } = req.params;
				const file = Object.values(repoFiles(`${owner}/${repo}`)).find(
					(f: any) => f.sha === sha
				);
				if (!file)
					return Response.json({ message: 'Not Found' }, { status: 404 });
				return Response.json({
					sha: (file as any).sha,
					size: (file as any).size,
					content: Buffer.from((file as any).content).toString('base64'),
					encoding: 'base64',
				});
			},
		},

		'/repos/:owner/:repo/git/refs': {
			POST: async (req) => {
				const { owner, repo } = req.params;
				const key = `${owner}/${repo}`;
				const state = readState();
				const rs = repoState(state, key);
				const { ref, sha } = await req.json();
				if (rs.refs.some((r: any) => r.ref === ref)) {
					return Response.json(
						{ message: 'Reference already exists', ref },
						{ status: 422 }
					);
				}
				const url = `https://api.github.com/repos/${key}/git/${ref}`;
				rs.refs.push({ ref, sha, url });
				save(state, key, rs);
				return Response.json(
					{ ref, url, object: { type: 'commit', sha } },
					{ status: 201 }
				);
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
				save(state, key, rs);
				return Response.json(release, { status: 201 });
			},
		},

		'/repos/:owner/:repo/pulls': {
			GET: (req) => {
				const { owner, repo } = req.params;
				return Response.json(repoState(readState(), `${owner}/${repo}`).pulls);
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
					title: p.title,
					head: { ref: p.head },
					base: { ref: p.base },
					state: 'open',
					html_url: `https://github.com/${key}/pull/${number}`,
				};
				rs.pulls.push(pull);
				save(state, key, rs);
				return Response.json(pull, { status: 201 });
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
