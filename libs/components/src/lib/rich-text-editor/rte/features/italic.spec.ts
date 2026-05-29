import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteItalicFeature } from './italic';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph: p, italic } = docFactories;

const features = [
	new RteBase(),
	new RteItalicFeature(),
	new RteToolbarFeature(),
];

describe('RteItalicFeature', () => {
	it('should add an italic mark to the schema', async () => {
		const rte = await setup(features, [p(text.marks(italic())('Hello'))]);
		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(<italic>'|Hello')"`);
	});

	it('should deserialize italic from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><em>italic</em><i>italic</i></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<italic>'|italicitalic')"`
		);
	});

	it('should serialize italic to HTML', async () => {
		const rte = await setup(features, [p(text.marks(italic())('italic'))]);

		expect(rte.getHtml()).toMatchInlineSnapshot(`"<p><em>italic</em></p>"`);
	});

	it('should toggle italic mark of selected text on Mod-i', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.selectText('[world]');
		rte.keydown('i', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <italic>'[world|]')"`
		);

		rte.keydown('i', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the italic mark when no text is selected', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.placeCursor('Hello |world');
		rte.keydown('i', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<italic>|world')"`
		);

		await rte.typeTextAtCursor('beautiful ');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <italic>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles italic', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.selectText('[world]');
		rte.toolbarButton('Italic').click();

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <italic>'[world|]')"`
		);
		expect(rte.isActive(rte.toolbarButton('Italic'))).toBe(true);

		rte.toolbarButton('Italic').click();

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(rte.isActive(rte.toolbarButton('Italic'))).toBe(false);
	});
});
