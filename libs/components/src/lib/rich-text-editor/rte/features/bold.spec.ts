import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteBoldFeature } from './bold';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph, bold } = docFactories;

const features = [new RteBase(), new RteBoldFeature(), new RteToolbarFeature()];

describe('RteBoldFeature', () => {
	it('should add a bold mark to the schema', async () => {
		const { docStr } = await setup(features, [
			paragraph(text.marks(bold())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"paragraph(<bold>'|Hello')"`);
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
		const { selectText, keydown, docStr } = await setup(features, [
			paragraph('Hello world'),
		]);

		selectText('[world]');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'[world|]')"`
		);

		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the bold mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[paragraph('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<bold>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles bold', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[paragraph('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Bold').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <bold>'[world|]')"`
		);
		expect(isActive(toolbarButton('Bold'))).toBe(true);

		toolbarButton('Bold').click();

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(isActive(toolbarButton('Bold'))).toBe(false);
	});
});
