import { setup } from '../__tests__/test-utils';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEToolbarFeature } from './toolbar';

const features = [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEToolbarFeature(),
];

describe('RTETextBlockStructure', () => {
	it('should create a schema with paragraphs, headings and hard breaks', async () => {
		const { docStr } = await setup(features, [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', text: 'heading-1' }],
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', text: 'heading-2' }],
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'para' },
					{ type: 'hard_break' },
					{ type: 'text', text: 'graph' },
				],
			},
		]);
		expect(docStr()).toBe(
			`doc(heading[level=1]("heading-1"), heading[level=2]("heading-2"), paragraph("para", hard_break(), "graph"))`
		);
	});

	it('should deserialize blocks from HTML', async () => {
		const { rte, config, docStr } = await setup(features);
		rte.setDoc(
			config.parseHTML(
				`
					<h1>heading-1</h1>
					<h2>heading-2</h2>
					<p>paragraph<br>new line</p>
					<h3>other heading</h3>
					<div>other element</div>
				`.trim()
			)
		);
		expect(docStr()).toBe(
			'doc(heading[level=1]("heading-1"), heading[level=2]("heading-2"), paragraph("paragraph", hard_break(), "new line"), paragraph("other heading"), paragraph("other element"))'
		);
	});

	it('should insert a new paragraph when pressing Enter', async () => {
		const { keydown, docStr } = await setup(features);

		keydown('Enter');

		expect(docStr()).toBe(`doc(paragraph(), paragraph())`);
	});

	it('should insert a hard break when pressing Shift+Enter', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Hello world' }],
			},
		]);

		placeCursor('Hello |world');
		keydown('Enter', { shift: true });

		expect(docStr()).toBe(`doc(paragraph("Hello ", hard_break(), "world"))`);
	});

	it('should set paragraph block type with Mod+Alt+0', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', text: 'Title' }],
			},
		]);

		keydown('0', { ctrl: true, alt: true });

		expect(docStr()).toBe(`doc(paragraph("Title"))`);
	});

	it('should set heading level 1 with Mod+Alt+1', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toBe(`doc(heading[level=1]("Text"))`);
	});

	it('should set heading level 2 with Mod+Alt+2', async () => {
		const { keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Text' }],
			},
		]);

		keydown('2', { ctrl: true, alt: true });

		expect(docStr()).toBe(`doc(heading[level=2]("Text"))`);
	});

	it('should change block type across selection', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'First paragraph' }],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Second paragraph' }],
			},
		]);

		selectText('First [paragraph', 'Second] paragraph');
		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toBe(
			`doc(heading[level=1]("First paragraph"), heading[level=1]("Second paragraph"))`
		);
	});

	it('should render a paragraph styles dropdown in the toolbar with the current block type selected', async () => {
		const { toolbarSelect, option, docStr, selectAll } = await setup(features);
		toolbarSelect('Paragraph styles').click();

		expect(option(toolbarSelect('Paragraph styles'), 'Body').selected).toBe(
			true
		);

		selectAll(); // special selection

		expect(option(toolbarSelect('Paragraph styles'), 'Body').selected).toBe(
			true
		);

		option(toolbarSelect('Paragraph styles'), 'Title').click();

		expect(docStr()).toBe(`doc(heading[level=1]())`);
		expect(option(toolbarSelect('Paragraph styles'), 'Title').selected).toBe(
			true
		);
	});

	it('should have no selected option when cursor spans different block types', async () => {
		const { toolbarSelect, selectText, selectAll } = await setup(features, [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', text: 'Title' }],
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Body' }],
			},
		]);

		selectText('Tit[le', 'Bo]dy');

		expect(toolbarSelect('Paragraph styles').value).toBe('');

		selectAll(); // special selection

		expect(toolbarSelect('Paragraph styles').value).toBe('');
	});
});
