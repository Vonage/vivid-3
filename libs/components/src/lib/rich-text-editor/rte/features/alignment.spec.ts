import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEAlignmentFeature } from './alignment';
import { RTEToolbarFeature } from './toolbar';
import { RTEFreeformStructure } from './freeform';

const features = [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEAlignmentFeature(),
	new RTEToolbarFeature(),
];

const freeformFeatures = [
	new RTECore(),
	new RTEFreeformStructure(),
	new RTEAlignmentFeature(),
	new RTEToolbarFeature(),
];

describe('RTEAlignmentFeature', () => {
	it('should add a textAlign attribute to text block nodes that defaults to left', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'heading',
				attrs: { level: 1, textAlign: 'right' },
				content: [{ type: 'text', text: 'Right' }],
			},
			{
				type: 'paragraph',
				attrs: { textAlign: 'center' },
				content: [{ type: 'text', text: 'Centered' }],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Default' }],
			},
		]);

		expect(docStr()).toBe(
			`doc(heading[level=1 textAlign="right"]("Right"), paragraph[textAlign="center"]("Centered"), paragraph[textAlign="left"]("Default"))`
		);
	});

	it('should deserialize the attribute from HTML', async () => {
		const { rte, config, docStr } = await setup(features);
		rte.setDoc(
			config.parseHTML(
				`
					<h1 style="text-align: center">center</h1>
					<h2 style="text-align: right">right</h2>
					<p style="text-align: left">left</p>
					<p>default</p>
				`.trim()
			)
		);

		expect(docStr()).toBe(
			`doc(heading[level=1 textAlign="center"]("center"), heading[level=2 textAlign="right"]("right"), paragraph[textAlign="left"]("left"), paragraph[textAlign="left"]("default"))`
		);
	});

	it('should set left alignment with Mod+Shift+L', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				attrs: { textAlign: 'center' },
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		keydown('L', { ctrl: true });

		expect(docStr()).toBe(`doc(paragraph[textAlign="left"]("Text"))`);
	});

	it('should set center alignment with Mod+Shift+E', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		keydown('E', { ctrl: true });

		expect(docStr()).toBe(`doc(paragraph[textAlign="center"]("Text"))`);
	});

	it('should set right alignment with Mod+Shift+R', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		keydown('R', { ctrl: true });

		expect(docStr()).toBe(`doc(paragraph[textAlign="right"]("Text"))`);
	});

	it('should apply alignment to multiple paragraphs in selection', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'First' }],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Second' }],
			},
		]);

		selectText('[First', 'Second]');
		keydown('E', { ctrl: true });

		expect(docStr()).toBe(
			`doc(paragraph[textAlign="center"]("First"), paragraph[textAlign="center"]("Second"))`
		);
	});

	it('should add toolbar menu to toggle alignment', async () => {
		const { toolbarButton, click, docStr, isActive } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		expect(toolbarButton('Alignment').icon).toBe('align-left-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(true);
		expect(isActive(toolbarButton('Center'))).toBe(false);
		expect(isActive(toolbarButton('Right'))).toBe(false);

		await click(toolbarButton('Center'));

		expect(docStr()).toBe(`doc(paragraph[textAlign="center"]("Text"))`);
		expect(toolbarButton('Alignment').icon).toBe('align-center-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(false);
		expect(isActive(toolbarButton('Center'))).toBe(true);
	});

	it('should show no active alignment when the selection contains mixed alignment', async () => {
		const { toolbarButton, click, isActive, selectAll } = await setup(
			features,
			[
				{
					type: 'paragraph',
					content: [{ type: 'text', text: 'Left' }],
				},
				{
					type: 'paragraph',
					attrs: { textAlign: 'right' },
					content: [{ type: 'text', text: 'Right' }],
				},
			]
		);

		selectAll();

		expect(toolbarButton('Alignment').icon).toBe('align-left-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(false);
		expect(isActive(toolbarButton('Center'))).toBe(false);
		expect(isActive(toolbarButton('Right'))).toBe(false);
	});

	it('should disable toolbar options when not applicable because no textblocks are selected', async () => {
		const { toolbarButton, click, isActive } = await setup(
			freeformFeatures,
			[]
		);

		await click(toolbarButton('Alignment'));

		expect(toolbarButton('Alignment').icon).toBe('align-left-line');
		expect(isActive(toolbarButton('Left'))).toBe(false);
		expect(isActive(toolbarButton('Center'))).toBe(false);
		expect(isActive(toolbarButton('Right'))).toBe(false);
		expect(toolbarButton('Left').disabled).toBe(true);
		expect(toolbarButton('Center').disabled).toBe(true);
		expect(toolbarButton('Right').disabled).toBe(true);
	});

	it('should should keep alignment when inserting a new default block', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				attrs: { textAlign: 'right' },
				content: [{ type: 'text', text: 'Right' }],
			},
		]);

		placeCursor('Right|');
		keydown('Enter');

		expect(docStr()).toBe(
			`doc(paragraph[textAlign="right"]("Right"), paragraph[textAlign="right"]())`
		);

		placeCursor('|Right');
		keydown('Enter');

		expect(docStr()).toBe(
			`doc(paragraph[textAlign="right"](), paragraph[textAlign="right"]("Right"), paragraph[textAlign="right"]())`
		);
	});

	it('should should keep alignment when splitting a block', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			{
				type: 'heading',
				attrs: { level: 1, textAlign: 'right' },
				content: [{ type: 'text', text: 'Right' }],
			},
		]);

		placeCursor('Rig|ht');
		keydown('Enter');

		expect(docStr()).toBe(
			`doc(heading[level=1 textAlign="right"]("Rig"), heading[level=1 textAlign="right"]("ht"))`
		);
	});
});
