import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteUnderlineFeature } from './underline';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph: p, underline } = docFactories;

const features = [
	new RteBase(),
	new RteUnderlineFeature(),
	new RteToolbarFeature(),
];

describe('RteUnderlineFeature', () => {
	it('should add an underline mark to the schema', async () => {
		const rte = await setup(features, [p(text.marks(underline())('Hello'))]);
		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<underline>'|Hello')"`
		);
	});

	it('should deserialize underline from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><u>underline</u></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<underline>'|underline')"`
		);
	});

	it('should serialize underline to HTML', async () => {
		const rte = await setup(features, [
			p(text.marks(underline())('underline')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(`"<p><u>underline</u></p>"`);
	});

	it('should toggle underline mark of selected text on Mod-u', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.selectText('[world]');
		rte.keydown('u', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <underline>'[world|]')"`
		);

		rte.keydown('u', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the underline mark when no text is selected', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.placeCursor('Hello |world');
		rte.keydown('u', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<underline>|world')"`
		);

		await rte.typeTextAtCursor('beautiful ');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <underline>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles underline', async () => {
		const rte = await setup(features, [p('Hello world')]);

		rte.selectText('[world]');
		rte.toolbarButton('Underline').click();

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <underline>'[world|]')"`
		);
		expect(rte.isActive(rte.toolbarButton('Underline'))).toBe(true);

		rte.toolbarButton('Underline').click();

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(rte.isActive(rte.toolbarButton('Underline'))).toBe(false);
	});
});
