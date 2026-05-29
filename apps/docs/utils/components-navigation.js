const { isPublicStatus } = require('../filters/publicPages');
const { manifestsBySlug } = require('./components-manifests');
const components = require('../content/_data/components.json');

const navItems = [];

for (const component of components) {
	const manifest = manifestsBySlug.get(component.slug);

	if (manifest && !isPublicStatus(manifest.status)) {
		continue;
	}

	const createNavItem = (entry) => ({
		...entry,
		key: entry.title,
		parentKey: 'Components',
		url: `/components/${entry.slug}/`,
	});

	const entry = createNavItem(component);

	if (component.children) {
		entry.children = [
			{
				...entry,
				key: `${entry.key}_entry`,
				parentKey: entry.key,
				children: undefined,
			},
			...component.children.map((childComponent) => {
				const childEntry = createNavItem(childComponent);

				return {
					...childEntry,
					key: childEntry.title,
					parentKey: entry.key,
					url: `/components/${childEntry.slug}/`,
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
