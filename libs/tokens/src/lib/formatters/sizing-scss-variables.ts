export const sizingScssVariables = {
	name: 'sizingScssVariables',
	formatter({ dictionary }) {
		return dictionary.allProperties.map(
			(token) => `$${token.name}: calc(${token.value});`
		).join('\n');
	}
};
