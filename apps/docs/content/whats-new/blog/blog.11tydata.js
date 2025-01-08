const slugify = require('slugify');

const permalink = (data) =>
	`/whats-new/${slugify(data.title, { lower: true })}/`;

module.exports = {
	parent: 'Blog',
	eleventyComputed: {
		permalink,
		order: (data) => -parseInt(data.month.replace('-', '')),
		eleventyNavigation: {
			url: permalink,
		},
	},
};
