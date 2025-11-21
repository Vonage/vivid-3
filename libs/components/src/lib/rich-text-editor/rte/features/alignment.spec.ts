import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEAlignmentFeature } from './alignment';
import { RTEToolbarFeature } from './toolbar';

const { paragraph: p } = docFactories;
const h1 = docFactories.heading.attrs({ level: 1 });

const features = [
	new RTECore(),
	new RTETextBlockStructure(),
	new RTEAlignmentFeature(),
	new RTEToolbarFeature(),
];

describe('RTEAlignmentFeature', () => {
	it('should add a textAlign attribute to text block nodes that defaults to left', async () => {
		const { docStr } = await setup(features, [
			h1.attrs({ textAlign: 'right' })('Right'),
			p.attrs({ textAlign: 'center' })('Centered'),
			p('Default'),
		]);

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			heading[level=1 textAlign="right"]('|Right'),
			paragraph[textAlign="center"]('Centered'),
			paragraph[textAlign="left"]('Default')
			"
		`
		);
	});

	it('should deserialize the attribute from HTML', async () => {
		const { instance, config, docStr } = await setup(features);
		instance.replaceDocument(
			config.parseHTML(
				`
					<h1 style="text-align: center">center</h1>
					<h2 style="text-align: right">right</h2>
					<p style="text-align: left">left</p>
					<p>default</p>
				`.trim()
			)
		);

		expect(docStr()).toMatchInlineSnapshot(`
			"
			heading[level=1 textAlign="center"]('|center'),
			heading[level=2 textAlign="right"]('right'),
			paragraph[textAlign="left"]('left'),
			paragraph[textAlign="left"]('default')
			"
		`);
	});

	it('should set left alignment with Mod+Shift+L', async () => {
		const { keydown, docStr } = await setup(features, [
			p.attrs({ textAlign: 'center' })('Text'),
		]);

		keydown('L', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="left"]('|Text')"`
		);
	});

	it('should set center alignment with Mod+Shift+E', async () => {
		const { keydown, docStr } = await setup(features, [p('Text')]);

		keydown('E', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="center"]('|Text')"`
		);
	});

	it('should set right alignment with Mod+Shift+R', async () => {
		const { keydown, docStr } = await setup(features, [p('Text')]);

		keydown('R', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="right"]('|Text')"`
		);
	});

	it('should apply alignment to multiple paragraphs in selection', async () => {
		const { selectText, keydown, docStr } = await setup(features, [
			p('First'),
			p('Second'),
		]);

		selectText('[First', 'Second]');
		keydown('E', { ctrl: true });

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph[textAlign="center"]('[First'),
			paragraph[textAlign="center"]('Second|]')
			"
		`
		);
	});

	it('should add toolbar menu to toggle alignment', async () => {
		const { toolbarButton, click, docStr, isActive } = await setup(features, [
			p('Text'),
		]);

		expect(toolbarButton('Alignment').icon).toBe('align-left-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(true);
		expect(isActive(toolbarButton('Center'))).toBe(false);
		expect(isActive(toolbarButton('Right'))).toBe(false);

		await click(toolbarButton('Center'));

		expect(docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="center"]('|Text')"`
		);
		expect(toolbarButton('Alignment').icon).toBe('align-center-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(false);
		expect(isActive(toolbarButton('Center'))).toBe(true);
	});

	it('should show no active alignment when the selection contains mixed alignment', async () => {
		const { toolbarButton, click, isActive, selectAll } = await setup(
			features,
			[p('Left'), p.attrs({ textAlign: 'right' })('Right')]
		);

		selectAll();

		expect(toolbarButton('Alignment').icon).toBe('align-left-line');

		await click(toolbarButton('Alignment'));

		expect(isActive(toolbarButton('Left'))).toBe(false);
		expect(isActive(toolbarButton('Center'))).toBe(false);
		expect(isActive(toolbarButton('Right'))).toBe(false);
	});

	it('should should keep alignment when inserting a new default block', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			p.attrs({ textAlign: 'right' })('Right'),
		]);

		placeCursor('Right|');
		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph[textAlign="right"]('Right'),
			paragraph[textAlign="right"](|)
			"
		`
		);

		placeCursor('|Right');
		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph[textAlign="right"](),
			paragraph[textAlign="right"]('|Right'),
			paragraph[textAlign="right"]()
			"
		`
		);
	});

	it('should should keep alignment when splitting a block', async () => {
		const { placeCursor, keydown, docStr } = await setup(features, [
			h1.attrs({ textAlign: 'right' })('Right'),
		]);

		placeCursor('Rig|ht');
		keydown('Enter');

		expect(docStr()).toMatchInlineSnapshot(
			`
			"
			heading[level=1 textAlign="right"]('Rig'),
			heading[level=1 textAlign="right"]('|ht')
			"
		`
		);
	});
});
