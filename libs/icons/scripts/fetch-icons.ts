import { fetchIcons, type NodeFilterFunction } from '@repo/tools';
import { rmSync } from 'node:fs';
import 'dotenv/config';
import { svg } from './svg.output';
import { fastComponent } from './fast-component.output';
import { createIndex } from './create-index';
import { createDefine } from './create-define';

let counter = 0;

const allIcons: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	const isIcon =
		node.type === 'COMPONENT' && // Only components
		path.length >= 4 && // Which are at least three level deep
		counter < 10;

	if (isIcon) counter++;

	return isIcon;
};

(async () => {
	const clear = true;

	if (clear) {
		rmSync('./src/generated', { recursive: true, force: true });
	}

	const icons = await fetchIcons('isdKI406usLCxZ2U8ljDrn', {
		dir: './src/generated/',
		forceUpdate: clear,
		filter: allIcons,
		indexFileName: 'index.json',
		outputs: [svg, fastComponent],
	});

	createIndex(icons, './src/generated/index.ts');
	createDefine(icons, './src/generated/register.ts');
})();
