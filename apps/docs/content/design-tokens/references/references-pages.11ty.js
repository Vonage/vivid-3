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
				return `/design-tokens/references/${data.tokenPage.slug}/`;
			},
			eleventyComputed: {
				title: (data) => `${data.tokenPage.name} Tokens`,
				parent: 'Token Types  and Reference Pages',
				tokens: async function (data) {
					return await getTokens(data.tokenPage.category);
				},
			},
		};
	},
};
