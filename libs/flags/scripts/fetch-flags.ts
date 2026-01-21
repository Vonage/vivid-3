import {
	createIconEntry,
	type CreateIconEntryFunction,
	fetchIcons,
	type NodeFilterFunction,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import { kebabCase } from 'change-case';

import 'dotenv/config';

const onlyFlags: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	return (
		node.type === 'COMPONENT' && // Only components
		path.length >= 3 && // Which are at least three level deep
		path.at(-3)?.name === 'Icons' && // Inside "Icons" frame
		path.at(-2)?.name === 'flags' // And only "flags" category.
	);
};

const entryFunction: CreateIconEntryFunction = (
	node: Node,
	path: Node[],
	file
) => {
	const entry = createIconEntry(node, path, file);

	entry.name = node.name.replace('flag-', '');
	entry.figmaComponentName = node.name;
	entry.category = 'flags';
	entry.style = 'flag';

	return entry;
};

(async () => {
	await fetchIcons('isdKI406usLCxZ2U8ljDrn', {
		dir: './src/',
		filter: onlyFlags,
		createEntry: entryFunction,
		outputs: [
			{
				fileName: (entry) => `svg/${kebabCase(entry.name)}.svg`,
				template: (_entry, svg) => svg,
			},
		],
	});
})();
