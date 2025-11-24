const { getTokens } = require('./token-helpers.js');

module.exports = {
	data: function () {
		return {
			pagination: {
				data: 'tokenTypes',
				size: 1,
				alias: 'tokenPage',
				addAllPagesToCollections: true,
			},
			layout: 'tokens.njk',
			permalink: function (data) {
				return `/design-tokens/reference/${data.tokenPage.slug}/`;
			},
			eleventyComputed: {
				title: (data) => `${data.tokenPage.name} Tokens`,
				parent: 'Token Types and References',
				tokens: async function (data) {
					return await getTokens(data.tokenPage.category);
				},
			},
		};
	},
};
