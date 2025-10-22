import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RTECore } from './core';
import { RTEBoldFeature } from './bold';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const { text, text_line: line, bold } = docFactories;

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEBoldFeature(),
	new RTEToolbarFeature(),
];

describe('RTEBoldFeature', () => {
	it('should add a bold mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(bold())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"text_line(<bold>'|Hello')"`);
	});

	it('should toggle bold mark of selected text on Mod-b', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <bold>'[world|]')"`
		);

		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
	});

	it('should remember the bold mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello |<bold>|world')"`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <bold>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles bold', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[line('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Bold').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <bold>'[world|]')"`
		);
		expect(isActive(toolbarButton('Bold'))).toBe(true);

		toolbarButton('Bold').click();

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
		expect(isActive(toolbarButton('Bold'))).toBe(false);
	});
});
