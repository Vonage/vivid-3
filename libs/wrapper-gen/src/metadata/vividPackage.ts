import { kebabToPascal } from '../utils/casing';

/**
 * Gets the path to the corresponding .d.ts file from original file path.
 */
export const getTypescriptDefinitionPath = (originalFilePath: string) =>
	originalFilePath
		.replace(/^libs\/components\/src\//, '../../dist/libs/components/')
		.replace(/\.ts$/, '.d.ts');

/**
 * Gets the exported class name, e.g. 'accordion-item' -> 'VwcAccordionItemElement'.
 */
export const getExportedClassName = (componentName: string) =>
	`Vwc${kebabToPascal(componentName)}Element`;
