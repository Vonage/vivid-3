import type {
	CreateIconEntryFunction,
	IconCategory,
	IconEntry,
	IconStyle,
} from './types';

export const createIconEntry: CreateIconEntryFunction = (node, path, file) => {
	const description = file.components[node.id]?.description || '';

	const keywordsString = description
		.split(/[Kk]eyword:/)
		.at(1)
		?.split(/[Aa]lias:/)
		.at(0);
	const aliasString = description.split(/[Aa]lias:/).at(1);

	const name = path.at(-2)?.name || node.id.replace(':', '-');
	const style: IconStyle = node.name.replace('style=', '');
	const keywords =
		keywordsString
			?.split(',')
			.map((keyword) => keyword.trim().replace(/[:;]/g, '')) || [];
	const aliases =
		aliasString?.split(',').map((alias) => alias.trim().replace(/[:;]/g, '')) ||
		[];

	const entry: IconEntry = {
		id: '',
		figmaNodeId: node.id,
		imageUrl: '',
		figmaComponentName: path.at(-2)?.name || '[UNKNOWN]',
		category: path.at(-3)?.name as IconCategory,
		name,
		style,
		keywords,
		aliases,
	};

	return entry;
};
