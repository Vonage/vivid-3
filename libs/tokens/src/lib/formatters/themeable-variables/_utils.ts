import { formatHelpers } from 'style-dictionary';
import { cssUnit } from "../../common";

const { fileHeader, formattedVariables } = formatHelpers;

export const pairCssUnitToSizing = token => token.type === 'sizing' ? token.value = `${token.value}${cssUnit}` : token.value;

export const exposePublicRefs = (dictionary, token) => {

	const findAndReplaceReferences = (parent, value) => {
		if (dictionary.usesReference(parent)) {
			const refs = dictionary.getReferences(parent);
			refs.forEach(ref => {
				value = ref.public
					? `var(--${ref.name})`
					: findAndReplaceReferences(ref, value);
			});
		}

		return value;
	};

	token.value = findAndReplaceReferences(token, token.value);

	return token;
};

export default {
	name: 'css/themeableVariables',
	formatter: function ({ dictionary, file, options }) {

		const { outputReferences, selector = ':root' } = options;

		dictionary.allTokens
			.map(token => exposePublicRefs(dictionary, token))
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
