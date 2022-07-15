module.exports = {
	name: 'isNotAlias',
	matcher: function (token) {
		return token.attributes.category !== 'alias';
	}
};
