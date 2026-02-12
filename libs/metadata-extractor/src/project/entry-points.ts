import { log, warn } from '../utils/log';
import { getPackageEntryPoints } from 'pkg-entry-points';
import * as fs from 'node:fs';
import path from 'node:path';
import { tryGuessSourcePath } from './guess-source-path';

/**
 * subpath -> filepath relative to packageRoot
 * e.g. '.' -> './src/index.ts'
 */
export type EntryPoints = Record<string, string>;

/**
 * Gets the source code entry points to the package based on package.json exports.
 * Note: This is not possible in the general case since it unknown which source file an export maps to, so we support a
 * 'source' condition to specify the source file.
 */
export async function getSourceEntryPoints(
	packageRoot: string
): Promise<EntryPoints> {
	log(`Entry points for ${packageRoot}:`);
	const eps = await getPackageEntryPoints(packageRoot);
	return Object.fromEntries(
		[...Object.entries(eps)].flatMap(([subpath, conditionsToPath]) => {
			if (conditionsToPath.some(([, path]) => path.endsWith('.ts'))) {
				// Allow specifying a 'source' condition to find the source path
				const result =
					conditionsToPath.find(([conditions]) =>
						conditions.includes('source')
					) ??
					conditionsToPath.find(([conditions]) => conditions.includes('types'));

				if (!result) return [];

				let [, filePath] = result;

				if (filePath.endsWith('.d.ts')) {
					const guessedPath = tryGuessSourcePath(filePath, (f) =>
						fs.existsSync(path.join(packageRoot, f))
					);
					if (!guessedPath) {
						warn(`Could not find source path for ${subpath}`);
						return [];
					}
					filePath = guessedPath;
				}

				log(` - ${subpath} -> ${filePath}`);
				return [[subpath, filePath]];
			}
			return [];
		})
	);
}
