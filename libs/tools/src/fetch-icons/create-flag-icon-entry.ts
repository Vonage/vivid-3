import { createIconEntry } from './create-icon-entry';
import type { CreateIconEntryFunction } from './types';
import type { Node } from '@figma/rest-api-spec';

export const createFlagIconEntry: CreateIconEntryFunction = (
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
