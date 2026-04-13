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
		const rte = await setup(features(basicFontSizeOptions), [
			p(text.marks(size({ size: '123px' }))('Hello')),
		]);
		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('normal ', text.marks(size({ size: '18px' }))('large'))]
		);

		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Large'))).toBe(false);
		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(true);

		rte.placeCursor('lar|ge');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Large'))).toBe(true);
	});

	it('should change font size when choosing an option', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
			}),
			[p('Hello world')]
		);

		rte.selectText('[world]');
		await rte.click(rte.toolbarButton('Text size'));
		await rte.click(rte.menuItem(rte.openMenu(), 'Large'));

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(
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

		rte.selectText('st[art', 'en]d');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Large'))).toBe(false);
		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Small'))).toBe(false);

		await rte.click(rte.menuItem(rte.openMenu(), 'Small'));

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('first', br(), 'after break'), p('second'), p('third')]
		);

		rte.selectText('firs[t', 'seco]nd');
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(true);

		await rte.click(rte.menuItem(rte.openMenu(), 'Large'));

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p(), p()]
		);

		rte.selectAll();
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(true);
	});

	it("should consider blocks that don't allow fontSize to have no font size", async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [],
			}),
			[h1()]
		);

		rte.selectAll();
		await rte.click(rte.toolbarButton('Text size'));

		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Large'))).toBe(false);
		expect(rte.isChecked(rte.menuItem(rte.openMenu(), 'Normal'))).toBe(false);
	});

	it('should remember the font size mark when no text is selected', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		rte.placeCursor('Hello |world');

		await rte.click(rte.toolbarButton('Text size'));
		await rte.click(rte.menuItem(rte.openMenu(), 'Large'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<fontSize[size=\\"18px\\"]>|world')"`
		);

		await rte.typeTextAtCursor('beautiful ');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph('Hello ', <fontSize[size="18px"]>'beautiful |', 'world')
			"
		`
		);
	});

	it('should handle default font size as removing the mark', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('normal ', text.marks(size({ size: '18px' }))('large'))]
		);

		rte.selectText('[large]');

		await rte.click(rte.toolbarButton('Text size'));
		await rte.click(rte.menuItem(rte.openMenu(), 'Normal'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('normal [large|]')"`
		);
	});

	it('should not apply a blocks default size when applying across multiple blocks', async () => {
		const rte = await setup(
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

		rte.selectText('hea[ding', 'para]graph');

		await rte.click(rte.toolbarButton('Text size'));
		await rte.click(rte.menuItem(rte.openMenu(), 'Normal'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			heading1('hea', <fontSize[size="14px"]>'[ding'),
			paragraph('para|]graph')
			"
		`
		);
	});

	it('should increase font size when pressing Mod + Shift + .', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		rte.selectText('[world]');

		rte.keydown('.', { ctrl: true, shift: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);

		// Cannot go larger than large
		rte.keydown('.', { ctrl: true, shift: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);
	});

	it('should decrease font size when pressing Mod + Shift + ,', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		rte.selectText('[world]');

		rte.keydown(',', { ctrl: true, shift: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);

		// Cannot go smaller than small
		rte.keydown(',', { ctrl: true, shift: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);
	});

	it('should not adjust the font size when the selection is mixed', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('normal ', text.marks(size({ size: '18px' }))('large'))]
		);
		rte.selectText('nor[mal', 'lar]ge]');
		const initialDoc = rte.docStr();

		rte.keydown('.', { ctrl: true, shift: true });

		expect(rte.docStr()).toBe(initialDoc);

		rte.keydown(',', { ctrl: true, shift: true });

		expect(rte.docStr()).toBe(initialDoc);
	});

	it('should not adjust the font size when it is unknown', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
			}),
			[p('normal')]
		);
		rte.selectText('[normal]');
		const initialDoc = rte.docStr();

		rte.keydown('.', { ctrl: true, shift: true });

		expect(rte.docStr()).toBe(initialDoc);

		rte.keydown(',', { ctrl: true, shift: true });

		expect(rte.docStr()).toBe(initialDoc);
	});

	it('should adjust the cursor size based on the stored mark', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'paragraph', defaultSize: '14px' }],
			}),
			[p('Hello world')]
		);

		rte.placeCursor('Hello |world');
		rte.keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello |<fontSize[size=\\"18px\\"]>|world')"`
		);
		expect(
			rte.element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML
		).toBe(
			'<p part="node--paragraph">Hello <span style="font-size: 18px;" class="ProseMirror-widget">\u200b</span>world</p>'
		);

		rte.selectAll();
		rte.keydown('.', { ctrl: true, shift: true }); // Increase font size
		rte.placeCursor('Hello |world');
		rte.keydown(',', { ctrl: true, shift: true }); // Decrease font size back to normal
		expect(
			rte.element.shadowRoot!.querySelector('.ProseMirror')!.innerHTML
		).toBe(
			'<p part="node--paragraph"><span style="font-size: 18px;">Hello <span style="font-size: 14px;" class="ProseMirror-widget">\u200b</span>world</span></p>'
		);
	});

	it('should not show cursor fix when on a node without default size and no fontSize stored', async () => {
		const rte = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				onBlocks: [{ node: 'heading1', defaultSize: '18px' }], // paragraph has no default
			}),
			[p('Hello world')]
		);

		rte.placeCursor('Hello |world');
		rte.view.dispatch(rte.view.state.tr.setStoredMarks([]));

		expect(
			rte.element.shadowRoot!.querySelector('.ProseMirror .ProseMirror-widget')
		).toBeNull();
	});

	it('should not show cursor fix when stored marks has non-fontSize marks', async () => {
		const rte = await setup(
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

		rte.placeCursor('Hello |world');
		rte.click(rte.toolbarButton('Bold')); // Add bold stored mark

		expect(
			rte.element.shadowRoot!.querySelector('.ProseMirror .ProseMirror-widget')
		).toBeNull();
	});
});
