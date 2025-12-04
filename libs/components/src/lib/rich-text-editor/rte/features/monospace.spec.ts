import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteMonospaceFeature } from './monospace';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph: p, monospace } = docFactories;

const features = [
	new RteBase(),
	new RteMonospaceFeature(),
	new RteToolbarFeature(),
];

describe('RteMonospaceFeature', () => {
	it('should add a monospace mark to the schema', async () => {
		const { docStr } = await setup(features, [
			p(text.marks(monospace())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"paragraph(<monospace>'|Hello')"`);
	});

	it('should deserialize monospace from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><tt>monospace</tt><code>monospace</code></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<monospace>'|monospacemonospace')"`
		);
	});

	it('should serialize monospace to HTML', async () => {
		const rte = await setup(features, [
			p(text.marks(monospace())('monospace')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(`"<p><tt>monospace</tt></p>"`);
	});

	it('should toggle monospace mark of selected text on Mod-M', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			p('Hello world'),
		]);

		selectText('[world]');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <monospace>'[world|]')"`
		);

		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the monospace mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[p('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('M', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<monospace>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <monospace>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles monospace', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[p('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Monospace').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <monospace>'[world|]')"`
		);
		expect(isActive(toolbarButton('Monospace'))).toBe(true);

		toolbarButton('Monospace').click();

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(isActive(toolbarButton('Monospace'))).toBe(false);
	});
});
