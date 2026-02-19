import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { basicFontSizeOptions } from '../__tests__/font-sizes';
import { RteBase } from './base';
import {
	type RteFontSizePickerConfig,
	RteFontSizePickerFeature,
} from './font-size-picker';
import { RteToolbarFeature } from './toolbar';
import { RteHardBreakFeature } from './hard-break';
import { RteBoldFeature } from './bold';

const {
	text,
	heading1: h1,
	paragraph: p,
	fontSize: size,
	hardBreak: br,
} = docFactories;

const features = (config: RteFontSizePickerConfig) => [
	new RteBase({ heading1: true, heading2: true }),
	new RteToolbarFeature(),
	new RteFontSizePickerFeature(config),
	new RteHardBreakFeature(),
];

describe('RteFontSizeFeature', () => {
	it('should add a fontSize mark to the schema', async () => {
		const { docStr } = await setup(features(basicFontSizeOptions), [
			p(text.marks(size({ size: '123px' }))('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph(<fontSize[size="123px"]>'|Hello')"`
		);
	});

	it('should deserialize the mark from HTML', async () => {
		const rte = await setup(features(basicFontSizeOptions));
		rte.setHtml('<span style="font-size: 123px;">Hello</span>');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<fontSize[size="123px"]>'|Hello')"`
		);
	});

	it('should ignore unrelated occurrences of font-size in style', async () => {
		const rte = await setup(features(basicFontSizeOptions));
		rte.setHtml('<span style="transition-property: font-size;">Hello</span>');

		expect(rte.docStr()).toMatchInlineSnapshot(`"paragraph('|Hello')"`);
	});

	it('should serialize the mark to HTML', async () => {
		const rte = await setup(features(basicFontSizeOptions), [
			p(text.marks(size({ size: '123px' }))('Hello')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><span style="font-size: 123px;">Hello</span></p>"`
		);
	});

	it('should escape font size values', async () => {
		const rte = await setup(features(basicFontSizeOptions), [
			p(text.marks(size({ size: '15px; background: red' }))('Hello')),
		]);

		expect(rte.view.dom.querySelector('span')!.style.cssText).toBe(
			'font-size: 15px;'
		);
		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><span style="font-size: 15px;">Hello</span></p>"`
		);
	});

	it('should provide a menu with font size options where the current font size is checked', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, placeCursor } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
				}),
				[p('normal ', text.marks(size({ size: '18px' }))('large'))]
			);

		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);

		placeCursor('lar|ge');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(true);
	});

	it('should change font size when choosing an option', async () => {
		const { toolbarButton, click, openMenu, menuItem, docStr, selectText } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
				}),
				[p('Hello world')]
			);

		selectText('[world]');
		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);
	});

	it('should have no options selected by default', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
			}),
			[p('normal')]
		);

		rte.selectText('[normal]');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(false);
	});

	it('should have no options selected when no default font size is defined', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph' }],
			}),
			[p('normal')]
		);

		rte.selectText('[normal]');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(false);
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
		} = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '12px', label: 'Small' },
				],
			}),
			[
				p(
					text.marks(size({ size: '12px' }))('start '),
					text.marks(size({ size: '18px' }))('large'),
					text.marks(size({ size: '12px' }))(' end')
				),
			]
		);

		selectText('st[art', 'en]d');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Small'))).toBe(false);

		await click(menuItem(openMenu(), 'Small'));

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph(<fontSize[size="12px"]>'st[art large en|]d')"`
		);
	});

	it('should disable options when font size cannot be applied to selection', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[h1('heading')]
		);

		rte.placeCursor('head|ing');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.menuItem(rte.openMenu(), 'Large').disabled).toBe(true);
		expect(rte.menuItem(rte.openMenu(), 'Normal').disabled).toBe(true);

		rte.selectText('h[eadin]g');

		expect(rte.menuItem(rte.openMenu(), 'Large').disabled).toBe(true);
		expect(rte.menuItem(rte.openMenu(), 'Normal').disabled).toBe(true);

		rte.selectAll();

		expect(rte.menuItem(rte.openMenu(), 'Large').disabled).toBe(true);
		expect(rte.menuItem(rte.openMenu(), 'Normal').disabled).toBe(true);
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
		} = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('first', br(), 'after break'), p('second'), p('third')]
		);

		selectText('firs[t', 'seco]nd');
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);

		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
				'firs',
				<fontSize[size="18px"]>'[t',
				hardBreak<fontSize[size="18px"]>(),
				<fontSize[size="18px"]>'after break'
			),
			paragraph(<fontSize[size="18px"]>'seco|]', 'nd'),
			paragraph('third')
			"
		`
		);
	});

	it('should consider empty text blocks to have their default size', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, selectAll } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
				}),
				[p(), p()]
			);

		selectAll();
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(true);
	});

	it("should consider blocks that don't allow fontSize to have no font size", async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, selectAll } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [],
				}),
				[h1()]
			);

		selectAll();
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
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
		} = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		placeCursor('Hello |world');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<fontSize[size=\\"18px\\"]>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph('Hello ', <fontSize[size="18px"]>'beautiful |', 'world')
			"
		`
		);
	});

	it('should handle default font size as removing the mark', async () => {
		const { selectText, docStr, toolbarButton, click, openMenu, menuItem } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
				}),
				[p('normal ', text.marks(size({ size: '18px' }))('large'))]
			);

		selectText('[large]');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Normal'));

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('normal [large|]')"`);
	});

	it('should not apply a blocks default size when applying across multiple blocks', async () => {
		const { selectText, docStr, toolbarButton, click, openMenu, menuItem } =
			await setup(
				features({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [
						{ node: 'heading1', defaultSize: '18px' },
						{ node: 'paragraph', defaultSize: '14px' },
					],
				}),
				[h1('heading'), p('paragraph')]
			);

		selectText('hea[ding', 'para]graph');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Normal'));

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			heading1('hea', <fontSize[size="14px"]>'[ding'),
			paragraph('para|]graph')
			"
		`
		);
	});

	it('should increase font size when pressing Mod + Shift + .', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		selectText('[world]');

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);

		// Cannot go larger than large
		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);
	});

	it('should decrease font size when pressing Mod + Shift + ,', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		selectText('[world]');

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);

		// Cannot go smaller than small
		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);
	});

	it('should not adjust the font size when the selection is mixed', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('normal ', text.marks(size({ size: '18px' }))('large'))]
		);
		selectText('nor[mal', 'lar]ge]');
		const initialDoc = docStr();

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);
	});

	it('should not adjust the font size when it is unknown', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
			}),
			[p('normal')]
		);
		selectText('[normal]');
		const initialDoc = docStr();

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toBe(initialDoc);
	});

	it('should adjust the cursor size based on the stored mark', async () => {
		const { placeCursor, docStr, keydown, element, selectAll } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<fontSize[size=\\"18px\\"]>|world')"`
		);
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'<p part="node--paragraph">Hello <span style="font-size: 18px;" class="ProseMirror-widget">\u200b</span>world</p>'
		);

		selectAll();
		keydown('.', { ctrl: true, shift: true }); // Increase font size
		placeCursor('Hello |world');
		keydown(',', { ctrl: true, shift: true }); // Decrease font size back to normal
		expect(element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML).toBe(
			'<p part="node--paragraph"><span style="font-size: 18px;">Hello <span style="font-size: 14px;" class="ProseMirror-widget">\u200b</span>world</span></p>'
		);
	});

	it('should not show cursor fix when on a node without default size and no fontSize stored', async () => {
		const { placeCursor, element, view } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'heading1', defaultSize: '18px' }], // paragraph has no default
			}),
			[p('Hello world')]
		);

		placeCursor('Hello |world');
		view.dispatch(view.state.tr.setStoredMarks([]));

		expect(
			element.shadowRoot!.querySelector('.ProseMirror .ProseMirror-widget')
		).toBeNull();
	});

	it('should not show cursor fix when stored marks has non-fontSize marks', async () => {
		const { placeCursor, element, click, toolbarButton } = await setup(
			[
				new RteBase({ heading1: true, heading2: true }),
				new RteToolbarFeature(),
				new RteFontSizePickerFeature({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
				}),
				new RteBoldFeature(),
			],
			[p('Hello world')]
		);

		placeCursor('Hello |world');
		click(toolbarButton('Bold')); // Add bold stored mark

		expect(
			element.shadowRoot!.querySelector('.ProseMirror .ProseMirror-widget')
		).toBeNull();
	});
});
