const slugify = require('slugify');

const componentSlug = (component) =>
	component.slug || slugify(component.title, { lower: true });

module.exports = {
	componentSlug,
};
