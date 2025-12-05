import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import { RteBoldFeature } from './bold';
import { RteToolbarFeature } from './toolbar';
import { RteFreeformStructure } from './freeform';

const { text, textLine: line, bold } = docFactories;

const features = [
	new RteCore(),
	new RteFreeformStructure(),
	new RteBoldFeature(),
	new RteToolbarFeature(),
];

describe('RteBoldFeature', () => {
	it('should add a bold mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(bold())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(`"textLine(<bold>'|Hello')"`);
	});

	it('should deserialize bold from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(
			`<div><strong>bold</strong><b>bold</b><span style="font-weight: bold">bold</span></div>`
		);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"textLine(<bold>'|boldboldbold')"`
		);
	});

	it('should serialize bold to HTML', async () => {
		const rte = await setup(features, [line(text.marks(bold())('bold'))]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<div><strong>bold</strong></div>"`
		);
	});

	it('should toggle bold mark of selected text on Mod-b', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"textLine('Hello ', <bold>'[world|]')"`
		);

		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"textLine('Hello [world|]')"`);
	});

	it('should remember the bold mark when no text is selected', async () => {
		const { placeCursor, keydown, docStr, typeTextAtCursor } = await setup(
			features,
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('b', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(`"textLine('Hello |<bold>|world')"`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"textLine('Hello ', <bold>'beautiful |', 'world')"`
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
			`"textLine('Hello ', <bold>'[world|]')"`
		);
		expect(isActive(toolbarButton('Bold'))).toBe(true);

		toolbarButton('Bold').click();

		expect(docStr()).toMatchInlineSnapshot(`"textLine('Hello [world|]')"`);
		expect(isActive(toolbarButton('Bold'))).toBe(false);
	});
});
