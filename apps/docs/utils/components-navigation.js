const { isPublicStatus } = require('../filters/publicPages');
const { manifestsBySlug } = require('./components-manifests');
const components = require('../content/_data/components.json');

const navItems = [];

const componentByTitle = new Map(
	components.map((component) => [component.title, component])
);

// Create a copy of components to avoid modification during iteration
const componentsCopy = [...components];

for (const component of componentsCopy) {
	const manifest = manifestsBySlug.get(component.slug);

	if (manifest && !isPublicStatus(manifest.status)) {
		continue;
	}

	const entry = {
		...component,
		key: component.title,
		parentKey: 'Components',
		url: `/components/${component.slug}/`,
	};

	if (component.children) {
		entry.children = [
			{
				...entry,
				key: `${entry.key}_entry`,
				parentKey: entry.key,
				children: undefined,
			},
			...component.children.map((childTitle) => {
				const childItem = componentByTitle.get(childTitle);

				const childIndex = components.indexOf(childItem);
				if (childIndex > 0) {
					components.splice(childIndex, 1);
				}

				return {
					...childItem,
					key: childItem.title,
					parentKey: entry.key,
					url: `/components/${childItem.slug}/`,
					children: undefined,
				};
			}),
		];
	}

	navItems.push(entry);
}

exports.componentsNav = [
	{
		key: 'Components',
		title: 'Components',
		initiallyOpen: true,
		children: navItems.sort((a, b) => a.title.localeCompare(b.title)),
	},
];
