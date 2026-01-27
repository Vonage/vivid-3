import {
	fetchIcons,
	writeJson,
	type IconsManifest,
	type NodeFilterFunction,
} from '@repo/tools';
import { rmSync } from 'node:fs';
import 'dotenv/config';
import { svg } from './svg.output';

// All icons except 'brand' and 'flags'
const allIcons: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	return (
		node.type === 'COMPONENT' &&
		path.length >= 4 &&
		path.at(-4)?.name === 'Icons' &&
		path.at(-2)?.name !== 'flags' &&
		path.at(-3)?.name !== 'brand'
	);
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
		outputs: [svg],
	});

	const manifest: IconsManifest = icons.map((icon) => ({
		id: `${icon.name}-${icon.style}`,
		keyword: icon.keywords,
		tag: [
			`style_color_${icon.style === 'color' ? 'multi' : 'single'}`,
			`style_weight_${icon.style === 'solid' ? 'solid' : 'regular'}`,
			`category_${icon.category}`,
		],
	}));

	writeJson('./src/generated/manifest.json', manifest);
})();
