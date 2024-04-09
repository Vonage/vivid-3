export const kebabToPascal = (kebab: string) =>
	kebab
		.split('-')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join('');
