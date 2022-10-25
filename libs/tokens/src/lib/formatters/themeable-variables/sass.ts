import { formatHelpers } from 'style-dictionary';
import { exposeThemeables, pairCssUnitToSizing } from './_utils';

const { fileHeader, formattedVariables } = formatHelpers;


export default {
	name: 'sass/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences } = options;

		dictionary.allTokens
			.map(token => exposeThemeables(dictionary, token))
			.map(pairCssUnitToSizing);

		return fileHeader({ file }) +
			formattedVariables({
				outputReferences,
				format: 'sass',
				dictionary,
			})
	}
};
