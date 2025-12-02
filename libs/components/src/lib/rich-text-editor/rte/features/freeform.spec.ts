import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteFreeformStructure } from './freeform';

const { text_line: line } = docFactories;

const features = [new RteCore(), new RteFreeformStructure()];

describe('RteFreeformStructure', () => {
	it('should create a schema with text_line blocks at the top level', async () => {
		const { docStr } = await setup(features, [line('Hello'), line('World')]);
		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('|Hello'), text_line('World')"`
		);
	});

	it('should insert a new text line when pressing Enter', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		placeCursor('Hello |world');
		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello '), text_line('|world')"`
		);
	});
});
