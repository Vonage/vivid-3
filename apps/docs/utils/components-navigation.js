const { isPublicStatus } = require('../filters/publicPages');
const { manifestsBySlug } = require('./components-manifests');
const components = require('../content/_data/components.json');

const navItems = [];

const componentByTitle = new Map(
	components.map((component) => [component.title, component])
);

// Collect all child titles so we can skip them in the main loop
// instead of splicing during iteration (which skips items).
const childTitles = new Set(
	components.flatMap((component) => component.children ?? [])
);

for (const component of components) {
	if (childTitles.has(component.title)) {
		continue;
	}

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
