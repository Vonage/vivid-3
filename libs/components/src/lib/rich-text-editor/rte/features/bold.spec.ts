import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEBoldFeature } from './bold';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEBoldFeature(),
	new RTEToolbarFeature(),
];

describe('RTEBoldFeature', () => {
	it('should add a bold mark to the schema', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'bold' }],
			},
		]);
		expect(docStr()).toBe(`doc(<bold>"Hello")`);
	});

	it('should toggle bold mark of selected text on Mod-b', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('b', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello ", <bold>"world")`);

		keydown('b', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should remember the bold mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		placeCursor('Hello |world');
		keydown('b', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(`doc("Hello ", <bold>"beautiful ", "world")`);
	});

	it('should add a toolbar item that toggles bold', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		selectText('[world]');
		toolbarButton('Bold').click();

		expect(docStr()).toBe(`doc("Hello ", <bold>"world")`);
		expect(isActive(toolbarButton('Bold'))).toBe(true);

		toolbarButton('Bold').click();

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(isActive(toolbarButton('Bold'))).toBe(false);
	});
});
