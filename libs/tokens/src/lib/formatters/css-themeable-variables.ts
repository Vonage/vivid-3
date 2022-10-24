import { formatHelpers } from 'style-dictionary';

const { fileHeader, formattedVariables } = formatHelpers;

const pairCssUnitToSizing = token => token.type === 'sizing' ? token.value = `${token.value}px` : token.value;


export default{
  name: 'css/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences, selector = ':root' } = options;

		const exposeThemeables = token => {

			const findAndReplaceReferences = (parent, value) => {
				if (dictionary.usesReference(parent)) {
					const refs = dictionary.getReferences(parent);
					refs.forEach(ref => {
						value = ref.public
							? value.replace(ref.value, `var(--${ref.name})`)
							: findAndReplaceReferences(ref, value);
					});
				}

				return value;
			};

			token.value = findAndReplaceReferences(token, token.value);

			return token;
		};

		dictionary.allTokens
			.map(exposeThemeables)
			.map(pairCssUnitToSizing)

		return fileHeader({file}) +
			`${selector} {\n` +
			formattedVariables({
				outputReferences,
				format: 'css',
				dictionary,
			}) +
			'\n}\n';
	}
}
