import { kebabToPascal } from '../utils/casing';

/**
 * Gets the exported class name, e.g. 'accordion-item' -> 'VwcAccordionItemElement'.
 */
export const getExportedClassName = (componentName: string) =>
	`Vwc${kebabToPascal(componentName)}Element`;
