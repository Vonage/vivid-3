import * as fs from 'fs';
import * as sass from 'sass';
import { Plugin } from '@custom-elements-manifest/analyzer';
import type {
	CssCustomProperty,
	CustomElementDeclaration,
} from 'custom-elements-manifest';

/**
 * Plugin to extract CSS custom properties from the components SCSS file.
 */
export const cssPropertiesPlugin = (): Plugin => ({
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

				// Then find comments beginning '/* @cssprop' in the compiled css
				const result = sass.compile(stylePath);
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
});
