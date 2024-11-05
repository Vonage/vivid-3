import { readonlyPlugin } from 'cem-plugin-readonly';
import { asyncFunctionPlugin } from 'cem-plugin-async-function';
import { jsdocFunctionPlugin } from 'cem-plugin-jsdoc-function';
import { jsdocExamplePlugin } from 'cem-plugin-jsdoc-example';
import * as sass from 'sass';
import fs from 'fs';

export default {
	/** Globs to analyze */
	globs: [
		'libs/components/src/lib/**/*.ts',
		'libs/components/src/shared/date-picker/date-picker-base.ts',
	],
	/** Globs to exclude */
	exclude: [
		'**/*.md',
		'**/*.spec.ts',
		'**/index.ts',
		'**/*.template.ts',
		'**/enums.ts',
		'**/components.ts',
		'**/helpers/*.ts',
	],
	/** Directory to output CEM to */
	outdir: '/dist/libs/components',
	/** Run in dev mode, provides extra logging */
	dev: false,
	/** Enable special handling for fast */
	fast: true,
	plugins: [
		jsdocFunctionPlugin(),
		jsdocExamplePlugin(),
		asyncFunctionPlugin(),
		readonlyPlugin(),
		{
			name: 'stylePlugin',
			analyzePhase({ ts, node, moduleDoc, context }) {
				switch (node.kind) {
					case ts.SyntaxKind.ClassDeclaration:
						const className = node.name.getText();
						const classDeclaration = moduleDoc.declarations.find(
							(declaration) => declaration.name === className
						);

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

							let cssProperty = {};

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

							classDeclaration.cssProperties.push(cssProperty);
						}
				}
			},
		},
		/**
		 * Adds a `vividComponent` property to the class declaration of components.
		 */
		{
			name: 'vivid-component',
			analyzePhase({ ts, node, moduleDoc, context }) {
				switch (node.kind) {
					case ts.SyntaxKind.ClassDeclaration: {
						const className = node.name.getText();
						const classDoc = moduleDoc.declarations.find(
							(x) => x.name === className
						);
						if (!classDoc) {
							return;
						}

						const vividComponent = {};

						for (const doc of node.jsDoc ?? []) {
							for (const tag of doc.tags ?? []) {
								if (tag.tagName.getText() === 'component') {
									vividComponent.name = tag.comment;
									classDoc.vividComponent = vividComponent;
								}

								if (tag.tagName.getText() === 'vueModel') {
									const [
										name,
										attributeName,
										eventNames,
										...valueMappingParts
									] = tag.comment.split(' ');
									const valueMappingStr = valueMappingParts.join(' ');
									const valueMapping = valueMappingStr.substring(
										1,
										valueMappingStr.length - 1
									);

									if (vividComponent.vueModels === undefined) {
										vividComponent.vueModels = [];
									}

									vividComponent.vueModels.push({
										name,
										attributeName,
										eventNames: eventNames.split(',').map((x) => x.trim()),
										valueMapping,
									});
								}

								if (tag.tagName.getText() === 'public') {
									vividComponent.public = true;
								}
							}
						}
					}
				}
			},
		},
	],
};
