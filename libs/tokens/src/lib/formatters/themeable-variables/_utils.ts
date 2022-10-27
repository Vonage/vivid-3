import { cssUnit } from "../../common";

export const pairCssUnitToSizing = token => token.type === 'sizing' ? token.value = `${token.value}${cssUnit}` : token.value;

export const exposeThemeables = (dictionary, token) => {

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
