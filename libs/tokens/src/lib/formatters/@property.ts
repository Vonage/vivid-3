import { fileHeader } from 'style-dictionary/utils';

const suffixMap = {
	integer: '',
	length: 'px',
};

export default {
	name: 'scss/@property',
	async format({ dictionary, file, options }) {
		const { selector = ':root' } = options ?? {};
		const tokens = dictionary.allTokens ?? dictionary.allProperties ?? [];
		const header =
			typeof fileHeader === 'function'
				? await Promise.resolve(fileHeader({ file, options }))
				: '';

		return (
			header +
			`${selector} {\n` +
			tokens
				.map((token) => {
					const prop = token['@property'] ?? token.$property;
					if (!prop) return '';
					const { inherits, syntax } = prop;
					const value = token.value ?? token.$value;
					return (
						`  @property --${token.name} {\n` +
						`    syntax: "<${syntax}>";\n` +
						`    inherits: ${inherits};\n` +
						`    initial-value: ${value}${suffixMap[syntax] ?? ''};\n` +
						`  }\n`
					);
				})
				.filter(Boolean)
				.join('\n') +
			`}\n`
		);
	},
};
