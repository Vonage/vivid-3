const { formatHelpers: { fileHeader } } = require('style-dictionary');

module.exports = {
	name: 'scss/constants',
	formatter: function ({ dictionary, file }) {
		return fileHeader({file}) + dictionary.allProperties.map(function (prop) {
			return `$${prop.name}: --${prop.name};`
		}).join('\n');
	}
};
