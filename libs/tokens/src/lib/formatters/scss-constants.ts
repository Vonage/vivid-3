import SD from 'style-dictionary';

const { fileHeader } = SD.formatHelpers;

export default {
	name: 'scss/constants',
	formatter({ dictionary, file }) {
		return (
			fileHeader({ file }) +
			dictionary.allProperties
				.map(({ name }) => `$${name}: --${name};`)
				.join('\n')
		);
	},
};
