import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEMonospaceFeature } from './monospace';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEMonospaceFeature(),
	new RTEToolbarFeature(),
];

describe('RTEMonospaceFeature', () => {
	it('should add a monospace mark to the schema', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'monospace' }],
			},
		]);
		expect(docStr()).toBe(`doc(<monospace>"Hello")`);
	});

	it('should toggle monospace mark of selected text on Mod-M', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <monospace>"world")`);

		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should remember the monospace mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		placeCursor('Hello |world');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(`doc("Hello ", <monospace>"beautiful ", "world")`);
	});

	it('should add a toolbar item that toggles monospace', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		selectText('[world]');
		toolbarButton('Monospace').click();

		expect(docStr()).toBe(`doc("Hello ", <monospace>"world")`);
		expect(isActive(toolbarButton('Monospace'))).toBe(true);

		toolbarButton('Monospace').click();

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(isActive(toolbarButton('Monospace'))).toBe(false);
	});
});
