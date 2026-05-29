#!/usr/bin/env -S pnpm tsx

// Rewrites coverage/coverage-final.json so that all absolute file paths are
// replaced with paths relative to the workspace root.
// This is required because turbo caches the coverage/ output directory and
// absolute paths would make the cache invalid across different machines or
// workspace locations.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const relativizeCoverage = async (
	projectDir: string,
	workspaceRoot: string
) => {
	const coveragePath = path.resolve(projectDir, 'coverage/coverage-final.json');

	let raw: string;
	try {
		raw = await readFile(coveragePath, 'utf-8');
	} catch {
		// No coverage file – nothing to do
		return;
	}

	const data: Record<string, { path: string; [key: string]: unknown }> =
		JSON.parse(raw);

	const result: typeof data = {};
	for (const [absKey, entry] of Object.entries(data)) {
		const relKey = path.relative(workspaceRoot, absKey);
		result[relKey] = {
			...entry,
			path: path.relative(workspaceRoot, entry.path),
		};
	}

	await writeFile(coveragePath, JSON.stringify(result));
	process.stdout.write(`Relativized paths in ${coveragePath}\n`);
};

const [, , projectDir] = process.argv;
const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const workspaceRoot = path.resolve(scriptDir, '../../..');

relativizeCoverage(projectDir ?? process.cwd(), workspaceRoot);
