import type { NodeFilterFunction } from '@repo/tools';

export const allIcons: NodeFilterFunction = (node, path) => {
	if (!Array.isArray(path)) return false;

	return (
		node.type === 'COMPONENT' &&
		path.at(1)?.name.toLocaleLowerCase().trim() === 'all icons' &&
		path.at(2)?.name.toLocaleLowerCase().trim() === 'icons'
	);
};
