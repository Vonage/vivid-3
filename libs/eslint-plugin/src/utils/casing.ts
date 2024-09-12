export const kebabToPascal = (kebab: string) =>
	kebab
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('');

export const kebabToCamel = (kebab: string) =>
	kebab[0] + kebabToPascal(kebab).slice(1);

export const camelToKebab = (camel: string) =>
	camel.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
