module.exports = {
	name: 'suffixPxCssVariables',
	formatter({ dictionary, options: { selector } }) {
		return `${selector} {
	${dictionary.allProperties.map(
			(token) => `--${token.name}: ${token.value}px;`
			).join('\n')}
}`;
	}
};
