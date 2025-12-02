import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import {
	basicTextBlockFactories,
	basicTextBlocks,
} from '../__tests__/text-blocks';
import { basicFontSizeOptions } from '../__tests__/font-sizes';
import { RteCore } from './core';
import { RteFontSizeFeature, type RteFontSizeFeatureConfig } from './font-size';
import { RteToolbarFeature } from './toolbar';
import { RteFreeformStructure } from './freeform';
import { RteTextBlockStructure } from './text-block';

const {
	doc,
	text,
	text_line: line,
	fontSize: size,
	hard_break: br,
} = docFactories;

const { p, h1 } = basicTextBlockFactories;

const features = (config: RteFontSizeFeatureConfig) => [
	new RteCore(),
	new RteFreeformStructure(),
	new RteToolbarFeature(),
	new RteFontSizeFeature(config),
];

const textBlockFeatures = (config: RteFontSizeFeatureConfig) => [
	new RteCore(),
	new RteTextBlockStructure({
		blocks: basicTextBlocks,
	}),
	new RteToolbarFeature(),
	new RteFontSizeFeature(config),
];

describe('RteFontSizeFeature', () => {
	it('should add a fontSize mark to the schema', async () => {
		const { docStr } = await setup(features(basicFontSizeOptions), [
			line(text.marks(size({ size: '123px' }))('Hello')),
		]);
		expect(docStr()).toMatchInlineSnapshot(
			`"text_line(<fontSize[size="123px"]>'|Hello')"`
		);
	});

	it('should deserialize the mark from HTML', async () => {
		const rte = await setup(features(basicFontSizeOptions));
		rte.setHtml('<span style="font-size: 123px;">Hello</span>');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"text_line(<fontSize[size="123px"]>'|Hello')"`
		);
	});

	it('should ignore unrelated occurrences of font-size in style', async () => {
		const rte = await setup(features(basicFontSizeOptions));
		rte.setHtml('<span style="transition-property: font-size;">Hello</span>');

		expect(rte.docStr()).toMatchInlineSnapshot(`"text_line('|Hello')"`);
	});

	it('should serialize the mark to HTML', async () => {
		const rte = await setup(features(basicFontSizeOptions), [
			line(text.marks(size({ size: '123px' }))('Hello')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<div><span style="font-size: 123px;">Hello</span></div>"`
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
					defaultSize: '14px',
				}),
				[line('normal ', text.marks(size({ size: '18px' }))('large'))]
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
					defaultSize: '14px',
				}),
				[line('Hello world')]
			);

		selectText('[world]');
		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="18px"]>'[world|]')"`
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
		} = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				defaultSize: '14px',
			}),
			[line('normal ', text.marks(size({ size: '18px' }))('large'))]
		);

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
				<fontSize[size="12px"]>'[rmal lar|]',
				<fontSize[size="18px"]>'ge'
			)
			"
		`
		);
	});

	it('should disable options when font size cannot be applied to selection', async () => {
		const { toolbarButton, click, openMenu, menuItem } = await setup(
			textBlockFeatures({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				defaultSize: '14px',
			}),
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
		} = await setup(
			textBlockFeatures({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				defaultSize: '14px',
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
				hard_break<fontSize[size="18px"]>(),
				<fontSize[size="18px"]>'after break'
			),
			paragraph(<fontSize[size="18px"]>'seco|]', 'nd'),
			paragraph('third')
			"
		`
		);

		selectText('fir[s', 'third]'); // Mixed selection
		await click(toolbarButton('Text size'));

		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);
		expect(isChecked(menuItem(openMenu(), 'Large'))).toBe(false);
	});

	it('should consider empty text blocks to have default size', async () => {
		const { toolbarButton, click, openMenu, menuItem, isChecked, selectAll } =
			await setup(
				textBlockFeatures({
					options: [
						{ size: '18px', label: 'Large' },
						{ size: '14px', label: 'Normal' },
					],
					defaultSize: '14px',
				}),
				[p(), p()]
			);

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
		} = await setup(
			textBlockFeatures({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				defaultSize: '14px',
			}),
			[h1()]
		);

		selectAll();
		await click(toolbarButton('Text size'));

		// Empty h1
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		instance.replaceDocument(doc(h1('Heading')));
		placeCursor('Head|ing');

		// Cursor inside h1
		expect(isChecked(menuItem(openMenu(), 'Normal'))).toBe(false);

		selectText('H[eadin]g');

		// Selection inside h1
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
				defaultSize: '14px',
			}),
			[line('Hello world')]
		);

		placeCursor('Hello |world');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Large'));

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<fontSize[size=\\"18px\\"]>|world')"`
		);

		await typeTextAtCursor('beautiful ');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			text_line('Hello ', <fontSize[size="18px"]>'beautiful |', 'world')
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
					defaultSize: '14px',
				}),
				[line('normal ', text.marks(size({ size: '18px' }))('large'))]
			);

		selectText('[large]');

		await click(toolbarButton('Text size'));
		await click(menuItem(openMenu(), 'Normal'));

		expect(docStr()).toMatchInlineSnapshot(`"text_line('normal [large|]')"`);
	});

	it('should increase font size when pressing Mod + Shift + .', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				defaultSize: '14px',
			}),
			[line('Hello world')]
		);

		selectText('[world]');

		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);

		// Cannot go larger than large
		keydown('.', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="18px"]>'[world|]')"`
		);
	});

	it('should decrease font size when pressing Mod + Shift + ,', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '14px', label: 'Normal' },
					{ size: '12px', label: 'Small' },
				],
				defaultSize: '14px',
			}),
			[line('Hello world')]
		);

		selectText('[world]');

		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);

		// Cannot go smaller than small
		keydown(',', { ctrl: true, shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello ', <fontSize[size="12px"]>'[world|]')"`
		);
	});

	it('should not adjust the font size when the selection is mixed', async () => {
		const { selectText, docStr, keydown } = await setup(
			features({
				options: [
					{ size: '18px', label: 'Large' },
					{ size: '14px', label: 'Normal' },
				],
				defaultSize: '14px',
			}),
			[line('normal ', text.marks(size({ size: '18px' }))('large'))]
		);
		selectText('nor[mal', 'lar]ge]');
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
				defaultSize: '14px',
			}),
			[line('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('.', { ctrl: true, shift: true }); // Increase font size

		expect(docStr()).toMatchInlineSnapshot(
			`"text_line('Hello |<fontSize[size=\\"18px\\"]>|world')"`
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
