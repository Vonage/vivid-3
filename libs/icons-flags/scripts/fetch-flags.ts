import {
	createIconEntry,
	type CreateIconEntryFunction,
	fetchIcons,
	type NodeFilterFunction,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import 'dotenv/config';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

// Only Flags icons
const onlyFlags: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	return (
		node.type === 'COMPONENT' &&
		path.length >= 3 &&
		path.at(-3)?.name === 'Icons' &&
		path.at(-2)?.name === 'flags'
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
	entry.style = 'color';
	entry.id = `flag-${entry.name}`;

	return entry;
};

(async () => {
	await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		forceUpdate: true,
		filter: onlyFlags,
		createEntry: entryFunction,
		// output: - use default output without any changes to SVG.
	});
})();
