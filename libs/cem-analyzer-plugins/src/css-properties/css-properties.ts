import * as fs from 'fs';
import * as sass from 'sass';
import * as path from 'path';
import type { Plugin } from '@custom-elements-manifest/analyzer';
import type {
	CssCustomProperty,
	CustomElementDeclaration,
} from 'custom-elements-manifest';
import { exports as resolveExports } from 'resolve.exports';

const resolveScssPath = (importPath: string): string => {
	// e.g. 'path/module' -> 'path/_module'
	const prefixed = path.join(
		path.dirname(importPath),
		`_${path.basename(importPath)}`
	);
	for (const candidate of [
		importPath,
		`${importPath}.scss`,
		`${importPath}/index.scss`,
		prefixed,
		`${prefixed}.scss`,
		`${importPath}/_index.scss`,
	]) {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
			return candidate;
		}
	}
	throw new Error(`SCSS file not found for path: ${importPath}`);
};

/// Custom importer for Sass to resolve package paths
const importer: sass.Importer = {
	canonicalize(url, options) {
		if (url.startsWith('@repo')) {
			const libName = url.split('/')[1]; // e.g. 'styles'
			const pkg = JSON.parse(
				fs.readFileSync(
					path.resolve(path.join('..', libName, 'package.json')),
					'utf-8'
				)
			);
			const [resolved] = resolveExports(
				pkg,
				`./${url.split('/').slice(2).join('/')}`,
				{
					conditions: ['sass'],
				}
			)!;
			const resolvedPath = path.resolve(path.join('..', libName, resolved));
			return new URL(`file://${resolveScssPath(resolvedPath)}`);
		}

		if (options.containingUrl) {
			const resolvedPath = path.resolve(
				path.dirname(options.containingUrl.pathname),
				url
			);
			return new URL(`file://${resolveScssPath(resolvedPath)}`);
		}
		return null;
	},
	load(url: URL) {
		return {
			contents: fs.readFileSync(url, 'utf-8'),
			syntax: 'scss',
		};
	},
};

/**
 * Plugin to extract CSS custom properties from the components SCSS file.
 */
export const cssPropertiesPlugin = (): Plugin => {
	const compiler = sass.initCompiler();

	return {
		name: 'stylePlugin',
		analyzePhase({ ts, node, moduleDoc }) {
			switch (node.kind) {
				case ts.SyntaxKind.ClassDeclaration: {
					const className = (node as any).name.getText();
					const classDeclaration = moduleDoc.declarations!.find(
						(declaration) => declaration.name === className
					) as CustomElementDeclaration;

					// Try to find corresponding scss file
					const filePath = node.getSourceFile().fileName; // e.g 'libs/components/src/lib/tree-view/tree-view.ts'
					const withoutExtension = filePath.replace(/\.[^/.]+$/, '');
					const stylePath = `${withoutExtension}.scss`;
					if (!fs.existsSync(stylePath)) {
						return;
					}

					const result = compiler.compile(stylePath, {
						importers: [importer, new sass.NodePackageImporter()],
					});
					const compiledCss = result.css.toString();

					for (const line of compiledCss.split('\n')) {
						const match = line.match(
							/^.*\/\*\s*@cssprop(erty)?\s+(.+)\s*\*\/\s*$/
						);
						if (!match) {
							continue;
						}

						let definition = match[2];

						const cssProperty: Partial<CssCustomProperty> = {};

						if (definition.startsWith('[')) {
							// Definition provides a default value, e.g. '[--vvd-button-cta-primary=var(--vvd-color-canvas-text)]'
							const insideBrackets = definition.substring(
								1,
								definition.indexOf(']')
							);
							definition = definition
								.substring(definition.indexOf(']') + 1)
								.trim();
							const parts = insideBrackets.split('='); // e.g. ['--vvd-button-cta-primary', 'var(--vvd-color-canvas-text)']
							cssProperty.name = parts[0]; // e.g. '--vvd-button-cta-primary'
							cssProperty.default = parts[1]; // e.g. 'var(--vvd-color-canvas-text)'
						} else {
							// Definition just contains the name, e.g. '--vvd-button-cta-primary'
							const [varName, ...rest] = definition.split(' ');
							definition = rest.join(' ').trim();
							cssProperty.name = varName; // e.g. '--vvd-button-cta-primary'
						}

						// Now there may be a description left, e.g. '- Primary button color'
						const description = definition.replace('-', '').trim();
						if (description) {
							cssProperty.description = description;
						}

						classDeclaration.cssProperties!.push(
							cssProperty as CssCustomProperty
						);
					}
				}
			}
		},
	};
};
