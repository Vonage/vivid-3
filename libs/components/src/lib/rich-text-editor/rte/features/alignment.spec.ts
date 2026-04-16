import { setup } from '../__tests__/test-utils';
import { docFactories } from '../__tests__/doc-factories';
import { RteBase } from './base';
import { RteAlignmentFeature } from './alignment';
import { RteToolbarFeature } from './toolbar';
import { RteListFeature } from './list';

const {
	bulletList: ul,
	listItem: li,
	paragraph: p,
	heading1: h1,
	heading2: h2,
} = docFactories;

const features = [
	new RteBase({
		heading1: true,
		heading2: true,
	}),
	new RteListFeature({
		bulletList: true,
		numberedList: true,
	}),
	new RteAlignmentFeature(),
	new RteToolbarFeature(),
];

describe('RteAlignmentFeature', () => {
	it('should add a textAlign attribute to text block nodes that defaults to left', async () => {
		const rte = await setup(features, [
			h1.attrs({ textAlign: 'right' })('Right'),
			p.attrs({ textAlign: 'center' })('Centered'),
			p('Default'),
			ul(li.attrs({ textAlign: 'center' })('List item')),
		]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			heading1[textAlign="right"]('|Right'),
			paragraph[textAlign="center"]('Centered'),
			paragraph[textAlign="left"]('Default'),
			bulletList(listItem[textAlign="center"]('List item'))
			"
		`
		);
	});

	it('should deserialize the attribute from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml(
			`
				<h1 style="text-align: center">center</h1>
				<h2 style="text-align: right">right</h2>
				<p style="text-align: left">left</p>
				<p>default</p>
				<ul><li style="text-align: center;">List item</li></ul>
				<p style="text-align: justify">unsupported</p>
			`.trim()
		);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			heading1[textAlign="center"]('|center'),
			heading2[textAlign="right"]('right'),
			paragraph[textAlign="left"]('left'),
			paragraph[textAlign="left"]('default'),
			bulletList(listItem[textAlign="center"]('List item')),
			paragraph[textAlign="left"]('unsupported')
			"
		`);
	});

	it('should serialize the attribute to HTML', async () => {
		const rte = await setup(features, [
			h1.attrs({ textAlign: 'center' })('center'),
			h2.attrs({ textAlign: 'right' })('right'),
			p.attrs({ textAlign: 'left' })('left'),
			ul(li.attrs({ textAlign: 'center' })('List item')),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<h1 style="text-align: center;">center</h1><h2 style="text-align: right;">right</h2><p style="text-align: left;">left</p><ul><li style="text-align: center;">List item</li></ul>"`
		);
	});

	it('should sanitize invalid textAlign values', async () => {
		const rte = await setup(features, [
			p.attrs({ textAlign: 'left; background: red' })('injected style'),
		]);

		expect(rte.view.dom.querySelector('p')!.style.cssText).toBe(
			'text-align: left;'
		);
		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p style="text-align: left;">injected style</p>"`
		);
	});

	it('should set left alignment with Mod+Shift+L', async () => {
		const rte = await setup(features, [
			p.attrs({ textAlign: 'center' })('Text'),
		]);

		rte.keydown('L', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="left"]('|Text')"`
		);
	});

	it('should set center alignment with Mod+Shift+E', async () => {
		const rte = await setup(features, [p('Text')]);

		rte.keydown('E', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="center"]('|Text')"`
		);
	});

	it('should set right alignment with Mod+Shift+R', async () => {
		const rte = await setup(features, [p('Text')]);

		rte.keydown('R', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="right"]('|Text')"`
		);
	});

	it('should apply alignment to multiple paragraphs in selection', async () => {
		const rte = await setup(features, [p('First'), p('Second')]);

		rte.selectText('[First', 'Second]');
		rte.keydown('E', { ctrl: true });

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph[textAlign="center"]('[First'),
			paragraph[textAlign="center"]('Second|]')
			"
		`
		);
	});

	it('should add toolbar menu to toggle alignment', async () => {
		const rte = await setup(features, [p('Text')]);

		expect(rte.toolbarButton('Alignment').icon).toBe('align-left-line');

		await rte.click(rte.toolbarButton('Alignment'));

		expect(rte.isActive(rte.toolbarButton('Left'))).toBe(true);
		expect(rte.isActive(rte.toolbarButton('Center'))).toBe(false);
		expect(rte.isActive(rte.toolbarButton('Right'))).toBe(false);

		await rte.click(rte.toolbarButton('Center'));

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph[textAlign="center"]('|Text')"`
		);
		expect(rte.toolbarButton('Alignment').icon).toBe('align-center-line');

		await rte.click(rte.toolbarButton('Alignment'));

		expect(rte.isActive(rte.toolbarButton('Left'))).toBe(false);
		expect(rte.isActive(rte.toolbarButton('Center'))).toBe(true);
	});

	it('should show no active alignment when the selection contains mixed alignment', async () => {
		const rte = await setup(features, [
			p('Left'),
			p.attrs({ textAlign: 'right' })('Right'),
		]);

		rte.selectAll();

		expect(rte.toolbarButton('Alignment').icon).toBe('align-left-line');

		await rte.click(rte.toolbarButton('Alignment'));

		expect(rte.isActive(rte.toolbarButton('Left'))).toBe(false);
		expect(rte.isActive(rte.toolbarButton('Center'))).toBe(false);
		expect(rte.isActive(rte.toolbarButton('Right'))).toBe(false);
	});

	it('should should keep alignment when inserting a new default block', async () => {
		const rte = await setup(features, [
			p.attrs({ textAlign: 'right' })('Right'),
		]);

		rte.placeCursor('Right|');
		rte.keydown('Enter');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph[textAlign="right"]('Right'),
			paragraph[textAlign="right"](|)
			"
		`
		);

		rte.placeCursor('|Right');
		rte.keydown('Enter');

		expect(rte.docStr()).toMatchInlineSnapshot(
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
		const rte = await setup(features, [
			h1.attrs({ textAlign: 'right' })('Right'),
		]);

		rte.placeCursor('Rig|ht');
		rte.keydown('Enter');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			heading1[textAlign="right"]('Rig'),
			heading1[textAlign="right"]('|ht')
			"
		`
		);
	});
});
