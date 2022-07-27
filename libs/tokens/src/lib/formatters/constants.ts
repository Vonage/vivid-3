module.exports = {
	name: 'scss/constants',
	formatter: function ({ dictionary }) {
		return dictionary.allProperties.map(function (prop) {
			return `$${prop.name}: --${prop.name};`
		}).join('\n');
	}
};
