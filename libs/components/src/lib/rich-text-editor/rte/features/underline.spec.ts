import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEUnderlineFeature } from './underline';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEUnderlineFeature(),
	new RTEToolbarFeature(),
];

describe('RTEUnderlineFeature', () => {
	it('should add an underline mark to the schema', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'underline' }],
			},
		]);
		expect(docStr()).toBe(`doc(<underline>"Hello")`);
	});

	it('should toggle underline mark of selected text on Mod-u', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('u', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello ", <underline>"world")`);

		keydown('u', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should remember the underline mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		placeCursor('Hello |world');
		keydown('u', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(`doc("Hello ", <underline>"beautiful ", "world")`);
	});

	it('should add a toolbar item that toggles underline', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		selectText('[world]');
		toolbarButton('Underline').click();

		expect(docStr()).toBe(`doc("Hello ", <underline>"world")`);
		expect(isActive(toolbarButton('Underline'))).toBe(true);

		toolbarButton('Underline').click();

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(isActive(toolbarButton('Underline'))).toBe(false);
	});
});
