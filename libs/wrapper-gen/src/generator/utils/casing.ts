export const kebabToPascal = (kebab: string) =>
	kebab
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('');
export const pascalToKebab = (pascal: string) =>
	pascal
		.split(/(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('-');
export const kebabToCamel = (kebab: string) =>
	kebab
		.split('-')
		.map((word, i) => (i === 0 ? word : word[0].toUpperCase() + word.slice(1)))
		.join('');
export const camelToKebab = (camel: string) =>
	camel
		.split(/(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('-');
export const camelToPascal = (camel: string) =>
	camel[0].toUpperCase() + camel.slice(1);
