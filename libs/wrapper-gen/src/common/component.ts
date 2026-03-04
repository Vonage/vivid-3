import { pascalCase } from 'change-case';

/**
 * Gets the exported class name, e.g. 'accordion-item' -> 'VwcAccordionItemElement'.
 */
export const getExportedClassName = (componentName: string) =>
	`Vwc${pascalCase(componentName)}Element`;
