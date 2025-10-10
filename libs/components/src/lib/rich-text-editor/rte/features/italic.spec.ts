import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEItalicFeature } from './italic';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEItalicFeature(),
	new RTEToolbarFeature(),
];

describe('RTEItalicFeature', () => {
	it('should add an italic mark to the schema', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'italic' }],
			},
		]);
		expect(docStr()).toBe(`doc(<italic>"Hello")`);
	});

	it('should toggle italic mark of selected text on Mod-i', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('i', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello ", <italic>"world")`);

		keydown('i', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should remember the italic mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		placeCursor('Hello |world');
		keydown('i', { ctrl: true });

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(`doc("Hello ", <italic>"beautiful ", "world")`);
	});

	it('should add a toolbar item that toggles italic', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		selectText('[world]');
		toolbarButton('Italic').click();

		expect(docStr()).toBe(`doc("Hello ", <italic>"world")`);
		expect(isActive(toolbarButton('Italic'))).toBe(true);

		toolbarButton('Italic').click();

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(isActive(toolbarButton('Italic'))).toBe(false);
	});
});
