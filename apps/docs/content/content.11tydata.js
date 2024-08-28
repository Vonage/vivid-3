const { githubEditLinkFromPath } = require('../filters/githubEditLink');

module.exports = {
	eleventyComputed: {
		githubEditLink: (data) => githubEditLinkFromPath(data.page.inputPath),
		eleventyNavigation: {
			key: (data) => data.key || data.title,
			title: (data) => data.title,
			parent: (data) => data.parent,
			order: (data) => data.order,
			status: (data) => data.status,
		},
	},
};
