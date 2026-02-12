/**
 * Given a `.d.ts` file path, attempts to find the corresponding `.ts` source file.
 * Paths must be relative to the package root, e.g. `./dist/index.d.ts`
 */
export function tryGuessSourcePath(
	dtsPath: string,
	fileExists: (filePath: string) => boolean
): string | undefined {
	const guessedPath = dtsPath
		.replace(/^\.\/dist\//, './src/')
		.replace(/\.d\.ts$/, '.ts');
	if (!fileExists(guessedPath)) {
		return undefined;
	}
	return guessedPath;
}
