import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteMonospaceFeature } from './monospace';
import { RteToolbarFeature } from './toolbar';
import { RteFreeformStructure } from './freeform';

const { text, text_line: line, monospace } = docFactories;

const features = [
	new RteCore(),
	new RteFreeformStructure(),
	new RteMonospaceFeature(),
	new RteToolbarFeature(),
];

describe('RteMonospaceFeature', () => {
	it('should add a monospace mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(monospace())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"text_line(<monospace>'|Hello')"`);
	});

	it('should deserialize monospace from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><tt>monospace</tt><code>monospace</code></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"text_line(<monospace>'|monospacemonospace')"`
		);
	});

	it('should serialize monospace to HTML', async () => {
		const rte = await setup(features, [
			line(text.marks(monospace())('monospace')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<div><tt>monospace</tt></div>"`
		);
	});

	it('should toggle monospace mark of selected text on Mod-M', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <monospace>'[world|]')"`
		);

		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
	});

	it('should remember the monospace mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<monospace>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <monospace>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles monospace', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[line('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Monospace').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <monospace>'[world|]')"`
		);
		expect(isActive(toolbarButton('Monospace'))).toBe(true);

		toolbarButton('Monospace').click();

		expect(docStr()).toMatchInlineSnapshot(`"text_line('Hello [world|]')"`);
		expect(isActive(toolbarButton('Monospace'))).toBe(false);
	});
});
