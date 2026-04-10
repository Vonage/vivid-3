import { createIconEntry } from './create-icon-entry';
import type { CreateIconEntryFunction } from './types';
import type { Node } from '@figma/rest-api-spec';

export const createBrandIconEntry: CreateIconEntryFunction = (
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
