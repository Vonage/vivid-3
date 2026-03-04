import { Project, type ResolutionHostFactory } from 'ts-morph';
import * as path from 'path';
import * as ts from 'typescript';
import { tryGuessSourcePath } from './guess-source-path';

export function createProject(packageRoot: string): Project {
	const tsConfigFilePath = path.join(packageRoot, 'tsconfig.json');

	const projectOptions: ConstructorParameters<typeof Project>[0] = {
		tsConfigFilePath,
		resolutionHost: createSourceResolutionHost(packageRoot),
	};

	return new Project(projectOptions);
}

/**
 * Creates a ResolutionHostFactory that tries to redirects `.d.ts` resolution to `.ts` source files when available.
 *
 * When TypeScript resolves a module to `<pkg>/dist/foo.d.ts`, this checks if
 * `<pkg>/src/foo.ts` exists and uses that instead. This allows the extractor
 * to see the full AST including decorators and function bodies when importing
 * e.g. mixins from another package in our repo.
 */
const createSourceResolutionHost =
	(packageRoot: string): ResolutionHostFactory =>
	(moduleResolutionHost: ts.ModuleResolutionHost, getCompilerOptions) => ({
		resolveModuleNames: (moduleNames, containingFile) => {
			const compilerOptions = getCompilerOptions();

			return moduleNames.map((moduleName) => {
				// Default resolution
				const result = ts.resolveModuleName(
					moduleName,
					containingFile,
					compilerOptions as ts.CompilerOptions,
					moduleResolutionHost
				);

				const resolved = result.resolvedModule;
				if (!resolved) return undefined;

				if (!resolved.resolvedFileName.endsWith('.d.ts')) {
					// Try to find the corresponding .ts source file
					const sourceFile = tryGuessSourcePath(
						path.relative(packageRoot, resolved.resolvedFileName),
						(f) => moduleResolutionHost.fileExists(path.join(packageRoot, f))
					);

					if (sourceFile) {
						return {
							resolvedFileName: path.join(packageRoot, sourceFile),
							isExternalLibraryImport: false,
							extension: ts.Extension.Ts,
						};
					}
				}

				return resolved;
			});
		},
	});
