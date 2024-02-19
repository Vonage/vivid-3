// Importing from '@vonage/vivid' requires a DOM
import "./polyfill/dom";

import * as exportedNames from "@vonage/vivid";
import { pascalToKebab } from './utils/casing';

/**
 * List of all exported components from Vivid. E.g. 'accordion-item'.
 * Does not include internal components like popup.
 */
export const exportedComponents = Object.keys(exportedNames)
	.filter(exportName => !exportName.startsWith('registerFactory'))
	.filter(exportName => !exportName.startsWith('registerFilePicker'))
	.filter(exportName => exportName.startsWith('register'))
	.map(exportName => exportName.replace('register', ''))
	.map(pascalToKebab);
