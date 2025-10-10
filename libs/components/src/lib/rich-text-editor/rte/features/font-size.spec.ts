import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTEFontSizeFeature } from './font-size';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';
import { RTETextBlockStructure } from './text-block';

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
			{
				type: 'text',
				text: 'Hello',
				marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
			},
		]);
		expect(docStr()).toBe(`doc(<fontSize[size="large"]>"Hello")`);
	});

	it('should deserialize the mark from HTML', async () => {
		const { rte, config, docStr } = await setup(features);
		rte.setDoc(
			config.parseHTML(
				`
					<span style="font-size: 12px;">small</span>
					normal
					<span style="font-size: 18px;">large</span>
					<span style="font-size: 24px;">extra-large</span>
					<span style="font-size: 10px;">other</span>
				`.trim()
			)
		);
		expect(docStr()).toBe(
			'doc(<fontSize[size="small"]>"small", " normal ", <fontSize[size="large"]>"large", " ", <fontSize[size="extra-large"]>"extra-large", " other")'
		);
	});

	it('should provide a menu with font size options where the current font size is checked', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, placeCursor } =
			await setup(features, [
				{ type: 'text', text: 'normal ' },
				{
					type: 'text',
					text: 'large',
					marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
				},
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
			await setup(features, [{ type: 'text', text: 'Hello world' }]);

		selectText('[world]');
		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toBe(`doc("Hello ", <fontSize[size="large"]>"world")`);
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
			{ type: 'text', text: 'normal ' },
			{
				type: 'text',
				text: 'large',
				marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
			},
		]);

		selectText('no[rmal', 'lar]ge]');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		await click(menuItem(openMenu(), 'Small'));

		expect(docStr()).toBe(
			'doc("no", <fontSize[size="small"]>"rmal lar", <fontSize[size="large"]>"ge")'
		);
	});

	it('should disable options when font size cannot be applied to selection', async () => {
		const { toolbarButton, click, openMenu, menuItem } = await setup(
			textBlockFeatures,
			[
				{
					type: 'heading',
					attrs: { level: 1 },
					content: [{ type: 'text', text: 'normal ' }],
				},
			]
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
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'first' },
					{ type: 'hard_break' },
					{ type: 'text', text: 'after break' },
				],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'second' }],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'third' }],
			},
		]);

		selectText('firs[t', 'seco]nd');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);

		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toBe(
			'doc(paragraph("firs", <fontSize[size="large"]>"t", hard_break<fontSize[size="large"]>(), <fontSize[size="large"]>"after break"), paragraph(<fontSize[size="large"]>"seco", "nd"), paragraph("third"))'
		);

		selectText('fir[s', 'third]'); // Mixed selection
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
	});

	it('should consider empty paragraphs to have normal size', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, selectAll } =
			await setup(textBlockFeatures, [
				{ type: 'paragraph', content: [] },
				{ type: 'paragraph', content: [] },
			]);

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
			rte,
			placeCursor,
		} = await setup(textBlockFeatures, [
			{ type: 'heading', attrs: { level: 1 }, content: [] },
		]);

		selectAll();
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		rte.setDoc([
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', text: 'Heading' }],
			},
		]);
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
		} = await setup(features, [{ type: 'text', text: 'Hello world' }]);

		placeCursor('Hello |world');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toBe(`doc("Hello world")`);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toBe(
			`doc("Hello ", <fontSize[size="large"]>"beautiful ", "world")`
		);
	});

	it('should handle normal font size as removing the mark', async () => {
		const { selectText, docStr, toolbarButton, click, openMenu, menuItem } =
			await setup(features, [
				{
					type: 'text',
					text: 'normal ',
				},
				{
					type: 'text',
					text: 'large',
					marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
				},
			]);

		selectText('[large]');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Normal'));

		expect(docStr()).toBe(`doc("normal large")`);
	});

	it('should increase font size when pressing Mod + Shift + .', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			{
				type: 'text',
				text: 'Hello world',
			},
		]);

		selectText('[world]');

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <fontSize[size="large"]>"world")`);

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(
			`doc("Hello ", <fontSize[size="extra-large"]>"world")`
		);

		// Cannot go larger than extra-large
		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(
			`doc("Hello ", <fontSize[size="extra-large"]>"world")`
		);
	});

	it('should decrease font size when pressing Mod + Shift + ,', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			{
				type: 'text',
				text: 'Hello world',
			},
		]);

		selectText('[world]');

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <fontSize[size="small"]>"world")`);

		// Cannot go smaller than small
		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(`doc("Hello ", <fontSize[size="small"]>"world")`);
	});

	it('should not adjust the font size when the selection is mixed', async () => {
		const { selectText, docStr, keydown } = await setup(features, [
			{ type: 'text', text: 'normal ' },
			{
				type: 'text',
				text: 'large',
				marks: [{ type: 'fontSize', attrs: { size: 'large' } }],
			},
		]);
		const initialDoc = docStr();

		selectText('nor[mal', 'lar]ge]');
		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);
	});

	it('should adjust the cursor size based on the stored mark', async () => {
		const { placeCursor, docStr, keydown, element, selectAll } = await setup(
			features,
			[
				{
					type: 'text',
					text: 'Hello world',
				},
			]
		);

		placeCursor('Hello |world');
		keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(docStr()).toBe(`doc("Hello world")`);
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'Hello <span style="font-size: 18px;" class="ProseMirror-widget"></span>world'
		);

		selectAll();
		keydown('.', { ctrl: true, shift: true }); // Increase font size
		placeCursor('Hello |world');
		keydown(',', { ctrl: true, shift: true }); // Decrease font size back to normal
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'<span style="font-size: 18px;">Hello <span style="font-size: 14px;" class="ProseMirror-widget"></span>world</span>'
		);
	});
});
