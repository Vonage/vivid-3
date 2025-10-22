import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RTECore } from './core';
import { RTEStrikethroughFeature } from './strikethrough';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const { text, text_line: line, strikethrough } = docFactories;

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEStrikethroughFeature(),
	new RTEToolbarFeature(),
];

describe('RTEStrikethroughFeature', () => {
	it('should add a strikethrough mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(strikethrough())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(
			`"text_line(<strikethrough>'|Hello')"`
		);
	});

	it('should toggle strikethrough mark of selected text on Alt+Shift+5', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('5', { alt: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <strikethrough>'[world|]')"`
		);

		keydown('5', { alt: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
	});

	it('should toggle strikethrough mark of selected text on Cmd+Shift+X', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <strikethrough>'[world|]')"`
		);

		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
	});

	it('should remember the strikethrough mark when no text is selected', async () => {
		const { placeCursor, docStr, typeTextAtCursor, toolbarButton } =
			await setup(features, [line('Hello world')]);

		placeCursor('Hello |world');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<strikethrough>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <strikethrough>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles strikethrough', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[line('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <strikethrough>'[world|]')"`
		);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(true);

		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(false);
	});
});
