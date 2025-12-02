import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteItalicFeature } from './italic';
import { RteToolbarFeature } from './toolbar';
import { RteFreeformStructure } from './freeform';

const { text, text_line: line, italic } = docFactories;

const features = [
	new RteCore(),
	new RteFreeformStructure(),
	new RteItalicFeature(),
	new RteToolbarFeature(),
];

describe('RteItalicFeature', () => {
	it('should add an italic mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(italic())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"text_line(<italic>'|Hello')"`);
	});

	it('should deserialize italic from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><em>italic</em><i>italic</i></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"text_line(<italic>'|italicitalic')"`
		);
	});

	it('should serialize italic to HTML', async () => {
		const rte = await setup(features, [line(text.marks(italic())('italic'))]);

		expect(rte.getHtml()).toMatchInlineSnapshot(`"<div><em>italic</em></div>"`);
	});

	it('should toggle italic mark of selected text on Mod-i', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('i', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <italic>'[world|]')"`
		);

		keydown('i', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
	});

	it('should remember the italic mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('i', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<italic>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <italic>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles italic', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[line('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Italic').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <italic>'[world|]')"`
		);
		expect(isActive(toolbarButton('Italic'))).toBe(true);

		toolbarButton('Italic').click();

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
		expect(isActive(toolbarButton('Italic'))).toBe(false);
	});
});
