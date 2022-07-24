module.exports = {
	name: 'sourceOnly',
	matcher: function (token) {
		if(token.path.at(-1) == '50') console.log(token)
		return token.isSource;
	}
};
