import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEStrikethroughFeature } from './strikethrough';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEStrikethroughFeature(),
	new RTEToolbarFeature(),
];

describe('RTEStrikethroughFeature', () => {
	it('should add a strikethrough mark to the schema', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'strikethrough' }],
			},
		]);
		expect(docStr()).toBe(`doc(<strikethrough>"Hello")`);
	});

	it('should toggle strikethrough mark of selected text on Alt+Shift+5', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('5', { alt: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <strikethrough>"world")`);

		keydown('5', { alt: true, shift: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should toggle strikethrough mark of selected text on Cmd+Shift+X', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			{ type: 'text', text: 'Hello world' },
		]);

		selectText('[world]');
		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <strikethrough>"world")`);

		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toBe(`doc("Hello world")`);
	});

	it('should remember the strikethrough mark when no text is selected', async () => {
		const { placeCursor, docStr, typeTextAtCursor, toolbarButton } =
			await setup(features, [{ type: 'text', text: 'Hello world' }]);

		placeCursor('Hello |world');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(
			`doc("Hello ", <strikethrough>"beautiful ", "world")`
		);
	});

	it('should add a toolbar item that toggles strikethrough', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[{ type: 'text', text: 'Hello world' }]
		);

		selectText('[world]');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toBe(`doc("Hello ", <strikethrough>"world")`);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(true);

		toolbarButton('Strikethrough').click();

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(false);
	});
});
