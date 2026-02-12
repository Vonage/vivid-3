/**
 * Casing conversion utilities.
 */

export const kebabToPascal = (kebab: string) =>
	kebab
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('');

export const kebabToCamel = (kebab: string) =>
	kebab
		.split('-')
		.map((word, i) => (i === 0 ? word : word[0].toUpperCase() + word.slice(1)))
		.join('');

export const pascalToCamel = (pascal: string) =>
	pascal[0].toLowerCase() + pascal.slice(1);
