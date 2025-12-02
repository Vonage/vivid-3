import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteCore } from './core';
import {
	RteTextBlockStructure,
	type RteTextBlockStructureConfig,
} from './text-block';
import { RteToolbarFeature } from './toolbar';
import { RteBoldFeature } from './bold';
import { RteItalicFeature } from './italic';
import { RteListFeature } from './list';
import { RteAlignmentFeature } from './alignment';

const { node, doc, bullet_list, list_item, bold, italic, text } = docFactories;

const features = (config: RteTextBlockStructureConfig) => [
	new RteCore(),
	new RteTextBlockStructure(config),
	new RteToolbarFeature(),
	new RteBoldFeature(),
	new RteItalicFeature(),
];

describe('RteTextBlockStructure', () => {
	describe('block definition', () => {
		it('should create a node for each block type', async () => {
			const rte = await setup(
				features({
					blocks: [
						{
							id: 'my-block',
							label: 'My Block',
							semanticRole: 'generic',
						},
					],
				}),
				[node('my-block')('Hello world')]
			);
			expect(rte.docStr()).toMatchInlineSnapshot(`"my-block('|Hello world')"`);
		});

		it('should throw an error for invalid block type IDs', () => {
			expect(
				() =>
					new RteTextBlockStructure({
						blocks: [
							{
								id: 'invalid id',
								label: 'Invalid',
								semanticRole: 'paragraph',
							},
						],
					})
			).toThrow(
				'Invalid block type id "invalid id". Only alphanumeric characters, hyphens and underscores are allowed.'
			);
		});

		it('should respect marksAllowed configuration', async () => {
			const rte = await setup(
				features({
					blocks: [
						{
							id: 'default-no-marks',
							label: 'Default No Marks',
							semanticRole: 'generic',
						},
						{
							id: 'explicit-no-marks',
							label: 'Explicit No Marks',
							semanticRole: 'generic',
							marksAllowed: false,
						},
						{
							id: 'all-marks',
							label: 'All Marks',
							semanticRole: 'generic',
							marksAllowed: true,
						},
						{
							id: 'bold-only',
							label: 'Bold Only',
							semanticRole: 'generic',
							marksAllowed: 'bold',
						},
					],
				})
			);

			expect(() =>
				rte.instance.replaceDocument(
					doc(node('default-no-marks')(text.marks(bold())('I want to be bold')))
				)
			).toThrow(/Invalid content/);

			expect(() =>
				rte.instance.replaceDocument(
					doc(
						node('explicit-no-marks')(text.marks(bold())('I want to be bold'))
					)
				)
			).toThrow(/Invalid content/);

			rte.instance.replaceDocument(
				doc(node('all-marks')(text.marks(bold())('I am bold')))
			);
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"all-marks(<bold>'|I am bold')"`
			);

			rte.instance.replaceDocument(
				doc(node('bold-only')(text.marks(bold())('I am bold')))
			);
			expect(rte.docStr()).toMatchInlineSnapshot(
				`"bold-only(<bold>'|I am bold')"`
			);

			expect(() =>
				rte.instance.replaceDocument(
					doc(node('bold-only')(text.marks(italic())('I want to be italic')))
				)
			).toThrow(/Invalid content/);
		});

		it('should use defaultBlocks to determine which block to use when creating new blocks', async () => {
			const { keydown, docStr, setHtml } = await setup(
				features({
					blocks: [
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
						{
							id: 'custom-paragraph',
							label: 'Custom Paragraph',
							semanticRole: 'paragraph',
						},
						{
							id: 'heading-1',
							label: 'Heading 1',
							semanticRole: 'heading-1',
						},
						{
							id: 'custom-heading',
							label: 'Custom Heading',
							semanticRole: 'heading-1',
						},
					],
					defaultBlocks: {
						paragraph: 'custom-paragraph',
						'heading-1': 'custom-heading',
					},
				}),
				[node('custom-paragraph')('Initial text')]
			);

			// Test that Mod+Alt+1 converts to the default heading-1 block
			keydown('1', { ctrl: true, alt: true });
			expect(docStr()).toMatchInlineSnapshot(
				`"custom-heading('|Initial text')"`
			);

			// Test that Mod+Alt+0 converts back to the default paragraph block
			keydown('0', { ctrl: true, alt: true });
			expect(docStr()).toMatchInlineSnapshot(
				`"custom-paragraph('|Initial text')"`
			);

			// Test that HTML without data-block-type uses the default block
			setHtml('<p>Test paragraph</p><h1>Test heading</h1>');
			expect(docStr()).toMatchInlineSnapshot(`
			"
			custom-paragraph('|Test paragraph'),
			custom-heading('Test heading')
			"
		`);
		});

		it('should add part attribute and stylePreset class to DOM elements', async () => {
			const { view } = await setup(
				features({
					blocks: [
						{
							id: 'styled-heading',
							label: 'Styled Heading',
							semanticRole: 'heading-1',
							stylePreset: 'h3',
						},
						{
							id: 'plain-paragraph',
							label: 'Plain Paragraph',
							semanticRole: 'paragraph',
						},
					],
				}),
				[
					node('styled-heading')('Heading with style'),
					node('plain-paragraph')('Paragraph without style'),
				]
			);

			const dom = view.dom;
			const heading = dom.querySelector('h1')!;
			const paragraph = dom.querySelector('p')!;

			// Check that part attribute is added with block id
			expect(heading.getAttribute('part')).toBe('text-block--styled-heading');
			expect(paragraph.getAttribute('part')).toBe(
				'text-block--plain-paragraph'
			);

			// Check that stylePreset class is added when specified
			expect(heading.className).toBe('text-block text-block--h3');
			expect(paragraph.className).toBe('text-block');
		});

		it('should deserialize blocks from HTML based on their semantic role', async () => {
			const rte = await setup(
				features({
					blocks: [
						{
							id: 'heading-1',
							label: 'Heading 1',
							semanticRole: 'heading-1',
						},
						{
							id: 'heading-2',
							label: 'Heading 2',
							semanticRole: 'heading-2',
						},
						{
							id: 'heading-3',
							label: 'Heading 3',
							semanticRole: 'heading-3',
						},
						{
							id: 'heading-4',
							label: 'Heading 4',
							semanticRole: 'heading-4',
						},
						{
							id: 'heading-5',
							label: 'Heading 5',
							semanticRole: 'heading-5',
						},
						{
							id: 'heading-6',
							label: 'Heading 6',
							semanticRole: 'heading-6',
						},
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
						{
							id: 'generic',
							label: 'Generic',
							semanticRole: 'generic',
						},
					],
				})
			);
			rte.setHtml(
				`
				<h1>heading-1</h1>
				<h2>heading-2</h2>
				<h3>heading-3</h3>
				<h4>heading-4</h4>
				<h5>heading-5</h5>
				<h6>heading-6</h6>
				<p>paragraph</p>
				<div>generic</div>
			`.trim()
			);

			expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			heading-1('|heading-1'),
			heading-2('heading-2'),
			heading-3('heading-3'),
			heading-4('heading-4'),
			heading-5('heading-5'),
			heading-6('heading-6'),
			paragraph('paragraph'),
			generic('generic')
			"
		`);
		});

		it('should deserialize blocks from HTML based on data-block-type', async () => {
			const rte = await setup(
				features({
					blocks: [
						{
							id: 'heading-1',
							label: 'Heading 1',
							semanticRole: 'heading-1',
						},
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
					],
				})
			);
			rte.setHtml(`<p data-block-type="heading-1">heading-1</p>`.trim());

			expect(rte.docStr()).toMatchInlineSnapshot(`"heading-1('|heading-1')"`);
		});

		it('should serialize blocks to HTML based on their semantic role', async () => {
			const rte = await setup(
				features({
					blocks: [
						{
							id: 'heading-1',
							label: 'Heading 1',
							semanticRole: 'heading-1',
						},
						{
							id: 'heading-2',
							label: 'Heading 2',
							semanticRole: 'heading-2',
						},
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
					],
				}),
				[
					node('heading-1')('heading-1'),
					node('heading-2')('heading-2'),
					node('paragraph')('paragraph'),
				]
			);

			expect(rte.getHtml()).toMatchInlineSnapshot(
				`"<h1 data-block-type="heading-1">heading-1</h1><h2 data-block-type="heading-2">heading-2</h2><p data-block-type="paragraph">paragraph</p>"`
			);
		});
	});

	it('should insert a new paragraph when pressing Enter', async () => {
		const { keydown, docStr } = await setup(
			features({
				blocks: [
					{
						id: 'paragraph',
						label: 'Paragraph',
						semanticRole: 'paragraph',
					},
				],
			})
		);

		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(`"paragraph(), paragraph(|)"`);
	});

	it('should insert a hard break when pressing Shift+Enter', async () => {
		const { placeCursor, keydown, docStr } = await setup(
			features({
				blocks: [
					{
						id: 'paragraph',
						label: 'Paragraph',
						semanticRole: 'paragraph',
					},
				],
			}),
			[node('paragraph')('Hello world')]
		);

		placeCursor('Hello |world');
		keydown('Enter', { shift: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph('Hello ', hard_break(), '|world')"`
		);
	});

	it('should set paragraph block type with Mod+Alt+0', async () => {
		const { keydown, docStr } = await setup(
			features({
				blocks: [
					{
						id: 'heading-1',
						label: 'Heading 1',
						semanticRole: 'heading-1',
					},
					{
						id: 'paragraph',
						label: 'Paragraph',
						semanticRole: 'paragraph',
					},
				],
			}),
			[node('heading-1')('Title')]
		);

		keydown('0', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"paragraph('|Title')"`);
	});

	it('should set heading level with Mod+Alt+<level>', async () => {
		const { keydown, docStr } = await setup(
			features({
				blocks: [
					{
						id: 'heading-1',
						label: 'Heading 1',
						semanticRole: 'heading-1',
					},
					{
						id: 'heading-2',
						label: 'Heading 2',
						semanticRole: 'heading-2',
					},
					{
						id: 'heading-3',
						label: 'Heading 3',
						semanticRole: 'heading-3',
					},
					{
						id: 'heading-4',
						label: 'Heading 4',
						semanticRole: 'heading-4',
					},
					{
						id: 'heading-5',
						label: 'Heading 5',
						semanticRole: 'heading-5',
					},
					{
						id: 'heading-6',
						label: 'Heading 6',
						semanticRole: 'heading-6',
					},
					{
						id: 'paragraph',
						label: 'Paragraph',
						semanticRole: 'paragraph',
					},
				],
			}),
			[node('paragraph')('Text')]
		);

		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-1('|Text')"`);

		keydown('2', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-2('|Text')"`);

		keydown('3', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-3('|Text')"`);

		keydown('4', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-4('|Text')"`);

		keydown('5', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-5('|Text')"`);

		keydown('6', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"heading-6('|Text')"`);
	});

	it('should change block type across selection', async () => {
		const { selectText, keydown, docStr } = await setup(
			features({
				blocks: [
					{
						id: 'heading-1',
						label: 'Heading 1',
						semanticRole: 'heading-1',
					},
					{
						id: 'paragraph',
						label: 'Paragraph',
						semanticRole: 'paragraph',
					},
				],
			}),
			[
				node('paragraph')('First paragraph'),
				node('paragraph')('Second paragraph'),
			]
		);

		selectText('First [paragraph', 'Second] paragraph');
		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"heading-1('First [paragraph'), heading-1('Second|] paragraph')"`
		);
	});

	it('should render a paragraph styles dropdown in the toolbar with the current block type selected', async () => {
		const { toolbarSelect, option, docStr, selectAll } = await setup(
			features({
				blocks: [
					{
						id: 'heading-1',
						label: 'Title',
						semanticRole: 'heading-1',
					},
					{
						id: 'paragraph',
						label: 'Body',
						semanticRole: 'paragraph',
					},
				],
			})
		);
		toolbarSelect('Paragraph styles').click();

		expect(option(toolbarSelect('Paragraph styles'), 'Body').selected).toBe(
			true
		);

		selectAll(); // special selection

		expect(option(toolbarSelect('Paragraph styles'), 'Body').selected).toBe(
			true
		);

		option(toolbarSelect('Paragraph styles'), 'Title').click();

		expect(docStr()).toMatchInlineSnapshot(`"[heading-1()|]"`);
		expect(option(toolbarSelect('Paragraph styles'), 'Title').selected).toBe(
			true
		);
	});

	it('should have no selected option when cursor spans different block types', async () => {
		const { toolbarSelect, selectText, selectAll } = await setup(
			features({
				blocks: [
					{
						id: 'heading-1',
						label: 'Title',
						semanticRole: 'heading-1',
					},
					{
						id: 'paragraph',
						label: 'Body',
						semanticRole: 'paragraph',
					},
				],
			}),
			[node('heading-1')('Title'), node('paragraph')('Body')]
		);

		selectText('Tit[le', 'Bo]dy');

		expect(toolbarSelect('Paragraph styles').value).toBe('');

		selectAll(); // special selection

		expect(toolbarSelect('Paragraph styles').value).toBe('');
	});

	it('should show no selection cursor is in a non-text-block node', async () => {
		const { toolbarSelect } = await setup(
			[
				new RteCore(),
				new RteTextBlockStructure({
					blocks: [
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
					],
				}),
				new RteListFeature(),
				new RteToolbarFeature(),
			],
			[bullet_list(list_item('item'))]
		);

		expect(toolbarSelect('Paragraph styles').value).toBe('');
	});

	it('should should not convert non-text-blocks', async () => {
		const { keydown, docStr } = await setup(
			[
				new RteCore(),
				new RteTextBlockStructure({
					blocks: [
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
						{
							id: 'heading-1',
							label: 'Heading 1',
							semanticRole: 'heading-1',
						},
					],
				}),
				new RteListFeature(),
				new RteToolbarFeature(),
			],
			[bullet_list(list_item('item'))]
		);

		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"bullet_list(list_item('|item'))"`);
	});

	it('should render textblock attributes in the DOM', async () => {
		const { view } = await setup(
			[
				new RteCore(),
				new RteTextBlockStructure({
					blocks: [
						{
							id: 'paragraph',
							label: 'Paragraph',
							semanticRole: 'paragraph',
						},
					],
				}),
				new RteAlignmentFeature(),
				new RteToolbarFeature(),
			],
			[node('paragraph').attrs({ textAlign: 'center' })('Centered')]
		);

		const dom = view.dom;
		const paragraph = dom.querySelector('p')!;

		expect(paragraph.style.textAlign).toBe('center');
	});
});
