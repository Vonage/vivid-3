const { isPublicStatus } = require('../filters/publicPages');
const { manifestsBySlug } = require('../utils/manifestsStore');
const components = require('../content/_data/components.json');

const navItems = [];

const componentByTitle = new Map(
	components.map((component) => [component.title, component])
);

for (const component of components) {
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
