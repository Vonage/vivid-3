import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteFreeformStructure } from './freeform';

const { textLine: line } = docFactories;

const features = [new RteCore(), new RteFreeformStructure()];

describe('RteFreeformStructure', () => {
	it('should create a schema with textLine blocks at the top level', async () => {
		const { docStr } = await setup(features, [line('Hello'), line('World')]);
		expect(docStr()).toMatchInlineSnapshot(
			`"textLine('|Hello'), textLine('World')"`
		);
	});

	it('should insert a new text line when pressing Enter', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		placeCursor('Hello |world');
		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(
			`"textLine('Hello '), textLine('|world')"`
		);
	});
});
