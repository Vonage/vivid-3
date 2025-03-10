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

export const camelToPascal = (camel: string) =>
	camel[0].toUpperCase() + camel.slice(1);

export const pascalToCamel = (pascal: string) =>
	pascal[0].toLowerCase() + pascal.slice(1);

export const camelToKebab = (camel: string) =>
	camel.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
