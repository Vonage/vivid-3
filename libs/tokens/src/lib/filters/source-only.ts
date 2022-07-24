module.exports = {
	name: 'sourceOnly',
	matcher: function ({ isSource }) {
		return isSource;
	}
};
