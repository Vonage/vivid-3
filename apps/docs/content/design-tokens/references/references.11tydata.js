const { getTokens } = require('./token-helpers.js');

module.exports = async function () {
	const tokens = await getTokens();

	return {
		layout: 'article.njk',
		parentKey: 'Token Types  and Reference Pages',
		tokens,
	};
};
