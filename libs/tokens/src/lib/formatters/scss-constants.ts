import { fileHeader } from 'style-dictionary/utils';

export default {
	name: 'scss/constants',
	async format({ dictionary, file, options }) {
		const tokens = dictionary.allTokens ?? dictionary.allProperties ?? [];
		const header =
			typeof fileHeader === 'function'
				? await Promise.resolve(fileHeader({ file, options }))
				: '';
		return (
			header +
			tokens.map((token) => `$${token.name}: --${token.name};`).join('\n')
		);
	},
};
