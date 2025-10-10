import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEFreeformStructure } from './freeform';

const features = [new RTECore(), new RTEFreeformStructure()];

describe('RTEFreeformStructure', () => {
	it('should create a schema with text and hard breaks at the top level', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
			},
			{ type: 'hard_break' },
			{
				type: 'text',
				text: 'world',
			},
		]);
		expect(docStr()).toBe(`doc("Hello", hard_break(), "world")`);
	});

	it('should insert a hard break when pressing Enter', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		placeCursor('Hello |world');
		keydown('Enter');

		expect(docStr()).toBe(`doc("Hello ", hard_break(), "world")`);
	});
});
