import { formatHelpers } from 'style-dictionary';
import { exposeThemeables, pairCssUnitToSizing } from './_utils';


const { fileHeader, formattedVariables } = formatHelpers;

export default {
	name: 'css/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences, selector = ':root' } = options;

		dictionary.allTokens
			.map(token => exposeThemeables(dictionary, token))
			.map(pairCssUnitToSizing);

		return fileHeader({ file }) +
			`${selector} {\n` +
			formattedVariables({
				outputReferences,
				format: 'css',
				dictionary,
			}) +
			'\n}\n';
	}
};
