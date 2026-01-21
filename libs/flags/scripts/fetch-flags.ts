import {
	createIconEntry,
	type CreateIconEntryFunction,
	fetchIcons,
	type NodeFilterFunction,
} from '@repo/tools';
import type { Node } from '@figma/rest-api-spec';
import { rmSync } from 'node:fs';
import 'dotenv/config';
import { svg } from './svg.output';
import { fastComponent } from './fast-component.output';
import { createIndex } from './create-index';
import { createDefine } from './create-define';

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
	const clear = true;

	if (clear) {
		rmSync('./src/generated', { recursive: true, force: true });
	}

	const icons = await fetchIcons('isdKI406usLCxZ2U8ljDrn', {
		dir: './src/generated/',
		forceUpdate: clear,
		filter: onlyFlags,
		createEntry: entryFunction,
		indexFileName: 'index.json',
		outputs: [svg, fastComponent],
	});

	createIndex(icons, './src/generated/index.ts');
	createDefine(icons, './src/generated/register.ts');
})();
