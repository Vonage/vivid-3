import type { BlockTypeSpec } from '../features/text-block';
import { docFactories } from './doc-factories';

export const basicTextBlocks: BlockTypeSpec[] = [
	{
		id: 'heading-1',
		label: 'Title',
		semanticRole: 'heading-1',
		stylePreset: 'h5',
	},
	{
		id: 'heading-2',
		label: 'Subtitle',
		semanticRole: 'heading-2',
		stylePreset: 'h6',
	},
	{
		id: 'paragraph',
		label: 'Body',
		semanticRole: 'paragraph',
		stylePreset: 'body-2',
		marksAllowed: true,
	},
];

export const basicTextBlockFactories = {
	h1: docFactories.node('heading-1'),
	h2: docFactories.node('heading-2'),
	p: docFactories.node('paragraph'),
};
