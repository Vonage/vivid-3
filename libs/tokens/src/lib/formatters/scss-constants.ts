const { formatHelpers: { fileHeader } } = require('style-dictionary');

module.exports = {
	name: 'scss/constants',
	formatter({ dictionary, file }) {
		return fileHeader({file}) + dictionary.allProperties.map(({ name }) =>
			`$${name}: --${name};`
		).join('\n');
	}
};
