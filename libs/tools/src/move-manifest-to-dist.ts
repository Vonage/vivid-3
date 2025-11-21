#!/usr/bin/env -S pnpm tsx

// For packages that publish to 'dist/', this script moves the package.json into 'dist/'
// It removes the 'dist/' prefix from paths and resolves 'workspace:' and 'catalog:' dependencies using pnpm

import { createExportableManifest } from '@pnpm/exportable-manifest';
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest';
import { writeFile } from 'fs/promises';
import { readProjectManifestOnly } from '@pnpm/read-project-manifest';
import { getCatalogsFromWorkspaceManifest } from '@pnpm/catalogs.config';
import path from 'node:path';

const moveManifestToDist = async (
	workspaceRoot: string,
	projectDir: string,
	distDir: string
) => {
	// Use pnpm to resolve 'workspace:' and 'catalog:' dependencies
	const workspaceManifest = await readWorkspaceManifest(workspaceRoot);
	const manifest = await readProjectManifestOnly(projectDir);
	const packageJson = (await createExportableManifest(projectDir, manifest, {
		catalogs: getCatalogsFromWorkspaceManifest(workspaceManifest as any),
	})) as any;

	// Modify paths to remove 'dist/' prefix

	// Update module and main paths
	if (packageJson.module?.startsWith('./dist/')) {
		packageJson.module = packageJson.module.replace('./dist/', './');
	}
	if (packageJson.main?.startsWith('./dist/')) {
		packageJson.main = packageJson.main.replace('./dist/', './');
	}

	// Update exports paths
	if (packageJson.exports) {
		const processExportsObject = (obj: Record<string, any>) => {
			for (const [key, value] of Object.entries(obj)) {
				if (typeof value === 'string' && value.startsWith('./dist/')) {
					obj[key] = value.replace('./dist/', './');
				} else if (typeof value === 'object' && value !== null) {
					processExportsObject(value);
				}
			}
		};

		processExportsObject(packageJson.exports);
	}

	// Update sideEffects paths
	if (Array.isArray(packageJson.sideEffects)) {
		packageJson.sideEffects = packageJson.sideEffects.map((item: string) => {
			if (typeof item === 'string' && item.startsWith('./dist/')) {
				return item.replace('./dist/', './');
			}
			return item;
		});
	}

	await writeFile(
		`${distDir}/package.json`,
		JSON.stringify(packageJson, undefined, 2)
	);

	process.stdout.write(
		`Package.json was successfully copied to ${distDir} with updated paths and dependencies.\n`
	);
};

const [_, __, projectDir] = process.argv;
const dirname = path.dirname(new URL(import.meta.url).pathname);
const workspaceRoot = path.resolve(dirname, '../../..');

moveManifestToDist(workspaceRoot, projectDir, path.resolve(projectDir, 'dist'));
