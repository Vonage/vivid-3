import type {
	CreateIconEntryFunction,
	IconCategory,
	IconEntry,
	IconStyle,
} from './types';

export const createIconEntry: CreateIconEntryFunction = (node, path, file) => {
	const keywords = (file.components[node.id]?.description || '')
		.replace('keyword:', '')
		.split(',')
		.map((k) => k.trim());

	const entry: IconEntry = {
		figmaNodeId: node.id,
		imageUrl: '',
		figmaComponentName: path.at(-2)?.name || '[UNKNOWN]',
		name: path.at(-2)?.name || node.id.replace(':', '-'),
		style: node.name.replace('style=', '') as IconStyle,
		category: path.at(-3)?.name as IconCategory,
		keywords: keywords,
	};

	return entry;
};
