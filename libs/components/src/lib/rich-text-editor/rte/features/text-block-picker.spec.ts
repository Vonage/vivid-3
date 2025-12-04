import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteToolbarFeature } from './toolbar';
import {
	type RteTextBlockPickerConfig,
	RteTextBlockPickerFeature,
} from './text-block-picker';
import { RteAlignmentFeature } from './alignment';
import { RteListFeature } from './list';

const { heading1: h1, paragraph: p, bulletList, listItem } = docFactories;

const features = (config: RteTextBlockPickerConfig) => [
	new RteBase({ heading1: true }),
	new RteTextBlockPickerFeature(config),
	new RteToolbarFeature(),
];

describe('RteTextBlockPickerFeature', () => {
	it('should render a paragraph styles dropdown in the toolbar with the current block type selected', async () => {
		const { toolbarSelect, option, docStr, selectAll } = await setup(
			features({
				options: [
					{
						node: 'heading1',
						label: 'Title',
					},
					{
						node: 'paragraph',
						label: 'Body',
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

		expect(docStr()).toMatchInlineSnapshot(`"[heading1()|]"`);
		expect(option(toolbarSelect('Paragraph styles'), 'Title').selected).toBe(
			true
		);
	});

	it('should have no selected option when cursor spans different block types', async () => {
		const { toolbarSelect, selectText, selectAll } = await setup(
			features({
				options: [
					{
						node: 'heading1',
						label: 'Title',
					},
					{
						node: 'paragraph',
						label: 'Body',
					},
				],
			}),
			[h1('Title'), p('Body')]
		);

		selectText('Tit[le', 'Bo]dy');

		expect(toolbarSelect('Paragraph styles').value).toBe('');

		selectAll(); // special selection

		expect(toolbarSelect('Paragraph styles').value).toBe('');
	});

	it('should show no selection cursor is in a non-text-block node', async () => {
		const { toolbarSelect } = await setup(
			[
				new RteBase(),
				new RteTextBlockPickerFeature({
					options: [
						{
							node: 'paragraph',
							label: 'Paragraph',
						},
					],
				}),
				new RteListFeature({ bulletList: true }),
				new RteToolbarFeature(),
			],
			[bulletList(listItem('item'))]
		);

		expect(toolbarSelect('Paragraph styles').value).toBe('');
	});

	it('should should not convert non-text-blocks', async () => {
		const { keydown, docStr } = await setup(
			[
				new RteBase(),
				new RteTextBlockPickerFeature({
					options: [
						{
							node: 'paragraph',
							label: 'Paragraph',
						},
						{
							node: 'heading1',
							label: 'Heading 1',
						},
					],
				}),
				new RteListFeature({ bulletList: true }),
				new RteToolbarFeature(),
			],
			[bulletList(listItem('item'))]
		);

		keydown('1', { ctrl: true, alt: true });

		expect(docStr()).toMatchInlineSnapshot(`"bulletList(listItem('|item'))"`);
	});

	it('should render textblock attributes in the DOM', async () => {
		const { view } = await setup(
			[
				new RteBase(),
				new RteTextBlockPickerFeature({
					options: [
						{
							node: 'paragraph',
							label: 'Paragraph',
						},
					],
				}),
				new RteAlignmentFeature(),
				new RteToolbarFeature(),
			],
			[p.attrs({ textAlign: 'center' })('Centered')]
		);

		const dom = view.dom;
		const paragraph = dom.querySelector('p')!;

		expect(paragraph.style.textAlign).toBe('center');
	});
});
