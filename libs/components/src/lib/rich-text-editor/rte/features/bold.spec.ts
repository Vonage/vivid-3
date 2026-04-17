import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteBoldFeature } from './bold';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph, bold } = docFactories;

const features = [new RteBase(), new RteBoldFeature(), new RteToolbarFeature()];

describe('RteBoldFeature', () => {
	it('should add a bold mark to the schema', async () => {
		const rte = await setup(features, [paragraph(text.marks(bold())('Hello'))]);
		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph(<bold>'|Hello')"`);
	});

	it('should deserialize bold from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(
			`<div><strong>bold</strong><b>bold</b><span style="font-weight: bold">bold</span></div>`
		);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<bold>'|boldboldbold')"`
		);
	});

	it('should serialize bold to HTML', async () => {
		const rte = await setup(features, [paragraph(text.marks(bold())('bold'))]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><strong>bold</strong></p>"`
		);
	});

	it('should toggle bold mark of selected text on Mod-b', async () => {
		const rte = await setup(features, [paragraph('Hello world')]);

		rte.selectText('[world]');
		rte.keydown('b', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'[world|]')"`
		);

		rte.keydown('b', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the bold mark when no text is selected', async () => {
		const rte = await setup(features, [paragraph('Hello world')]);

		rte.placeCursor('Hello |world');
		rte.keydown('b', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<bold>|world')"`
		);

		await rte.typeTextAtCursor('beautiful ');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles bold', async () => {
		const rte = await setup(features, [paragraph('Hello world')]);

		rte.selectText('[world]');
		rte.toolbarButton('Bold').click();

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'[world|]')"`
		);
		expect(rte.isActive(rte.toolbarButton('Bold'))).toBe(true);

		rte.toolbarButton('Bold').click();

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(rte.isActive(rte.toolbarButton('Bold'))).toBe(false);
	});
});
