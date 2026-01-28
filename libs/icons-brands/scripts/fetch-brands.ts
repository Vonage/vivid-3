import {
	createIconEntry,
	type CreateIconEntryFunction,
	fetchIcons,
	type IconsManifest,
	type NodeFilterFunction,
	writeJson,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import { rmSync } from 'node:fs';
import 'dotenv/config';
import { svg } from './svg.output';

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
	const clear = true;

	if (clear) {
		rmSync('./src/generated', { recursive: true, force: true });
	}

	const icons = await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		forceUpdate: clear,
		filter: onlyBrands,
		createEntry: entryFunction,
		indexFileName: 'index.json',
		outputs: [svg],
	});

	const manifest: IconsManifest = icons.map((icon) => ({
		id: `${icon.name}-${icon.style}`,
		keyword: icon.keywords,
		tag: [
			`style_color_${icon.style === 'color' ? 'multi' : 'single'}`,
			'category_brand',
		],
	}));

	writeJson('./src/generated/manifest.json', manifest);
})();
