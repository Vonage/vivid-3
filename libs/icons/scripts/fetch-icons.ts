import { fetchIcons, type NodeFilterFunction } from '@repo/tools';
import 'dotenv/config';
import { svg } from './svg.output';

const figmaFileId = 'isdKI406usLCxZ2U8ljDrn';

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
	await fetchIcons(figmaFileId, {
		dir: './src/generated/',
		forceUpdate: true,
		filter: allIcons,
		outputs: [svg],
	});
})();
