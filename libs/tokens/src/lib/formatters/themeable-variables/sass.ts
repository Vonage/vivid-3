import { formatHelpers } from 'style-dictionary';
import { exposeThemeables } from './_utils';

const { fileHeader, formattedVariables } = formatHelpers;


export default {
	name: 'sass/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences } = options;

		dictionary.allTokens
			.map(token => exposeThemeables(dictionary, token));

		return fileHeader({ file }) +
			formattedVariables({
				outputReferences,
				format: 'sass',
				dictionary,
			})
	}
};
