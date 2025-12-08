import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteStrikethroughFeature } from './strikethrough';
import { RteToolbarFeature } from './toolbar';

const { text, paragraph: p, strikethrough } = docFactories;

const features = [
	new RteBase(),
	new RteStrikethroughFeature(),
	new RteToolbarFeature(),
];

describe('RteStrikethroughFeature', () => {
	it('should add a strikethrough mark to the schema', async () => {
		const { docStr } = await setup(features, [
			p(text.marks(strikethrough())('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph(<strikethrough>'|Hello')"`
		);
	});

	it('should deserialize strikethrough from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(`<div><s>strikethrough</s><del>strikethrough</del></div>`);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<strikethrough>'|strikethroughstrikethrough')"`
		);
	});

	it('should serialize strikethrough to HTML', async () => {
		const rte = await setup(features, [
			p(text.marks(strikethrough())('strikethrough')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><s>strikethrough</s></p>"`
		);
	});

	it('should toggle strikethrough mark of selected text on Alt+Shift+5', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			p('Hello world'),
		]);

		selectText('[world]');
		keydown('5', { alt: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <strikethrough>'[world|]')"`
		);

		keydown('5', { alt: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should toggle strikethrough mark of selected text on Cmd+Shift+X', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			p('Hello world'),
		]);

		selectText('[world]');
		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <strikethrough>'[world|]')"`
		);

		keydown('X', { cmd: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
	});

	it('should remember the strikethrough mark when no text is selected', async () => {
		const { placeCursor, docStr, typeTextAtCursor, toolbarButton } =
			await setup(features, [p('Hello world')]);

		placeCursor('Hello |world');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<strikethrough>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <strikethrough>'beautiful |', 'world')"`
		);
	});

	it('should add a toolbar item that toggles strikethrough', async () => {
		const { toolbarButton, isActive, selectText, docStr } = await setup(
			features,
			[p('Hello world')]
		);

		selectText('[world]');
		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <strikethrough>'[world|]')"`
		);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(true);

		toolbarButton('Strikethrough').click();

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('Hello [world|]')"`);
		expect(isActive(toolbarButton('Strikethrough'))).toBe(false);
	});
});
