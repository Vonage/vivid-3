const { isPublicStatus } = require('./publicPages');
const { componentSlug } = require('./componentSlug');

/**
 * Transform components data into navigation structure compatible with Eleventy Navigation plugin
 */
function navigationFromComponents(components) {
	const navItems = components
		.filter((component) => isPublicStatus(component.status))
		.map((component) => ({
			...component,
			key: component.title,
			parentKey: component.parent,
			url: `/components/${componentSlug(component)}/`,
		}));

	const componentByKey = new Map(
		navItems.map((component) => [component.key, component])
	);
	for (const navItem of navItems) {
		if (navItem.children) {
			navItem.children = [
				{
					...navItem,
					key: `${navItem.key}_entry`,
					parentKey: navItem.key,
					children: undefined,
				},
				...navItem.children.map((child) => {
					const childItem = componentByKey.get(child);
					if (!childItem) {
						throw new Error(`Component not found: ${child}`);
					}
					return childItem;
				}),
			];
		}
	}

	return [
		{
			key: 'Components',
			title: 'Components',
			initiallyOpen: true,
			children: navItems
				.filter((component) => !component.parentKey)
				.sort((a, b) => a.title.localeCompare(b.title))
				.map((component) => ({
					...component,
					parentKey: 'Components',
				})),
		},
	];
}

module.exports = {
	navigationFromComponents,
};
