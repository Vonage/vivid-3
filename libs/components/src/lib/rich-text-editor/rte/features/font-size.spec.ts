import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RTECore } from './core';
import { RTEFontSizeFeature } from './font-size';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';
import { RTETextBlockStructure } from './text-block';

const {
	doc,
	text,
	text_line: line,
	fontSize: size,
	paragraph: p,
	hard_break: br,
} = docFactories;
const h1 = docFactories.heading.attrs({ level: 1 });

const features = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEToolbarFeature(),
	new RTEFontSizeFeature(),
];

const textBlockFeatures = [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEToolbarFeature(),
	new RTEFontSizeFeature(),
];

describe('RTEFontSizeFeature', () => {
	it('should add a fontSize mark to the schema', async () => {
		const { docStr } = await setup(features, [
			line(text.marks(size({ size: 'large' }))('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(
			`"text_line(<fontSize[size="large"]>'|Hello')"`
		);
	});

	it('should deserialize the mark from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(
			'<span style="font-size: 12px;">small</span>' +
				'normal' +
				'<span style="font-size: 18px;">large</span>' +
				'<span style="font-size: 24px;">extra-large</span>' +
				'<span style="font-size: 10px;">other</span>'
		);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			text_line(
				<fontSize[size="small"]>'|small',
				'normal',
				<fontSize[size="large"]>'large',
				<fontSize[size="extra-large"]>'extra-large',
				'other'
			)
			"
		`);
	});

	it('should serialize the mark to HTML', async () => {
		const rte = await setup(features, [
			line(
				text.marks(size({ size: 'small' }))('small'),
				'normal',
				text.marks(size({ size: 'large' }))('large'),
				text.marks(size({ size: 'extra-large' }))('extra-large')
			),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<div><span style="font-size: 12px;">small</span>normal<span style="font-size: 18px;">large</span><span style="font-size: 24px;">extra-large</span></div>"`
		);
	});

	it('should provide a menu with font size options where the current font size is checked', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, placeCursor } =
			await setup(features, [
				line('normal ', text.marks(size({ size: 'large' }))('large')),
			]);

		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Extra large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);
		expect(isChecked(menuItem(openMenu(), 'Small'))).toBe(false);

		placeCursor('lar|ge');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(true);
	});

	it('should change font size when choosing an option', async () => {
		const { toolbarButton, click, openMenu, menuItem, docStr, selectText } =
			await setup(features, [line('Hello world')]);

		selectText('[world]');
		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="large"]>'[world|]')"`
		);
	});

	it('should have no options selected when selection is mixed', async () => {
		const {
			toolbarButton,
			click,
			openMenu,
			menuItem,
			isChecked,
			docStr,
			selectText,
		} = await setup(features, [
			line('normal ', text.marks(size({ size: 'large' }))('large')),
		]);

		selectText('no[rmal', 'lar]ge]');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		await click(menuItem(openMenu(), 'Small'));

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line(
				'no',
				<fontSize[size="small"]>'[rmal lar|]',
				<fontSize[size="large"]>'ge'
			)
			"
		`
		);
	});

	it('should disable options when font size cannot be applied to selection', async () => {
		const { toolbarButton, click, openMenu, menuItem } = await setup(
			textBlockFeatures,
			[h1('normal')]
		);

		await click(toolbarButton('Text size'));

		expect(menuItem(openMenu(), 'Large').disabled).toBe(true);
		expect(menuItem(openMenu(), 'Normal').disabled).toBe(true);
	});

	it('should apply font size across text blocks and hard breaks', async () => {
		const {
			toolbarButton,
			click,
			openMenu,
			menuItem,
			selectText,
			isChecked,
			docStr,
		} = await setup(textBlockFeatures, [
			p('first', br(), 'after break'),
			p('second'),
			p('third'),
		]);

		selectText('firs[t', 'seco]nd');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);

		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
				'firs',
				<fontSize[size="large"]>'[t',
				hard_break<fontSize[size="large"]>(),
				<fontSize[size="large"]>'after break'
			),
			paragraph(<fontSize[size="large"]>'seco|]', 'nd'),
			paragraph('third')
			"
		`
		);

		selectText('fir[s', 'third]'); // Mixed selection
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
	});

	it('should consider empty paragraphs to have normal size', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, selectAll } =
			await setup(textBlockFeatures, [p(), p()]);

		selectAll();
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);
	});

	it("should consider blocks that don't allow fontSize to have no font size", async () => {
		const {
			toolbarButton,
			click,
			openMenu,
			menuItem,
			isChecked,
			selectAll,
			selectText,
			instance,
			placeCursor,
		} = await setup(textBlockFeatures, [h1()]);

		selectAll();
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		instance.replaceDocument(doc(h1('Heading')));
		placeCursor('Head|ing');

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		selectText('H[eadin]g');

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);
	});

	it('should remember the font size mark when no text is selected', async () => {
		const {
			placeCursor,
			docStr,
			typeTextAtCursor,
			toolbarButton,
			click,
			menuItem,
			openMenu,
		} = await setup(features, [line('Hello world')]);

		placeCursor('Hello |world');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<fontSize[size=\\"large\\"]>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line('Hello ', <fontSize[size="large"]>'beautiful |', 'world')
			"
		`
		);
	});

	it('should handle normal font size as removing the mark', async () => {
		const { selectText, docStr, toolbarButton, click, openMenu, menuItem } =
			await setup(features, [
				line('normal ', text.marks(size({ size: 'large' }))('large')),
			]);

		selectText('[large]');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Normal'));

		expect(docStr()).toMatchInlineSnapshot(`"text_line('normal [large|]')"`);
	});

	it('should increase font size when pressing Mod + Shift + .', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="large"]>'[world|]')"`
		);

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line('Hello ', <fontSize[size="extra-large"]>'[world|]')
			"
		`
		);

		// Cannot go larger than extra-large
		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line('Hello ', <fontSize[size="extra-large"]>'[world|]')
			"
		`
		);
	});

	it('should decrease font size when pressing Mod + Shift + ,', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			line('Hello world'),
		]);

		selectText('[world]');

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="small"]>'[world|]')"`
		);

		// Cannot go smaller than small
		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="small"]>'[world|]')"`
		);
	});

	it('should not adjust the font size when the selection is mixed', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			line('normal ', text.marks(size({ size: 'large' }))('large')),
		]);
		selectText('nor[mal', 'lar]ge]');
		const initialDoc = docStr();

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);
	});

	it('should adjust the cursor size based on the stored mark', async () => {
		const { placeCursor, docStr, keydown, element, selectAll } = await setup(
			features,
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<fontSize[size=\\"large\\"]>|world')"`
		);
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'<div>Hello <span style="font-size: 18px;" class="ProseMirror-widget"></span>world</div>'
		);

		selectAll();
		keydown('.', { ctrl: true, shift: true }); // Increase font size
		placeCursor('Hello |world');
		keydown(',', { ctrl: true, shift: true }); // Decrease font size back to normal
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'<div><span style="font-size: 18px;">Hello <span style="font-size: 14px;" class="ProseMirror-widget"></span>world</span></div>'
		);
	});
});
