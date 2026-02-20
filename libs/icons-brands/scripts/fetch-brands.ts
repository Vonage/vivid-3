import {
	createIconEntry,
	type CreateIconEntryFunction,
	fetchIcons,
	type NodeFilterFunction,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import 'dotenv/config';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

// Only brands icons
const onlyBrands: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	return (
		node.type === 'COMPONENT' &&
		path.length >= 3 &&
		path.at(-4)?.name === 'Icons' &&
		path.at(-3)?.name === 'brand'
	);
};

const entryFunction: CreateIconEntryFunction = (
	node: Node,
	path: Node[],
	file
) => {
	const entry = createIconEntry(node, path, file);

	entry.name = path.at(-2)?.name || '[UNKNOWN]';
	entry.figmaComponentName = path.at(-2)?.name || '[UNKNOWN]';
	entry.category = 'brand';
	entry.style = node.name.replace('style=', '') || '[UNKNOWN]';

	return entry;
};

(async () => {
	await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		forceUpdate: true,
		filter: onlyBrands,
		createEntry: entryFunction,
		// output: - use default output without any changes to SVG.
	});
})();
