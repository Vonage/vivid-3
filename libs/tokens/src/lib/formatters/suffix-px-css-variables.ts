import type { Format, Named } from "style-dictionary";

export const suffixPxCssVariables: Named<Format> = {
	name: 'suffixPxCssVariables',
	formatter({ dictionary, options: { selector } }) {
		return `${selector} {
	${dictionary.allProperties.map(
			(token) => `--${token.name}: ${token.value}px;`
			).join('\n')}
}`;}
};
