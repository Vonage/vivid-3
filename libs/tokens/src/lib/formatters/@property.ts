import { formatHelpers } from 'style-dictionary';

const { fileHeader } = formatHelpers;

export default {
	name: 'scss/@property',
	formatter({ dictionary, file, options }) {
		const { selector = ':root' } = options;

		return fileHeader({ file }) +
			`${selector} {\n` +
			dictionary.allProperties.map(({ name, value, '@property': { inherits, syntax } }) =>
				`  @property --${name} {\n` +
				`    syntax: "<${syntax}>";\n` +
				`    inherits: ${inherits};\n` +
				`    initial-value: ${value};\n` +
				`  }\n`
			).join('\n') +
			`}\n`;
	}
};
