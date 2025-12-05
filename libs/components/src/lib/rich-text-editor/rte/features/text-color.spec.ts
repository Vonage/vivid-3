import { docFactories } from '../__tests__/doc-factories';
import { setup as standardSetup } from '../__tests__/test-utils';
import { RTEFeature } from '../feature';
import {
	basicTextBlockFactories,
	basicTextBlocks,
} from '../__tests__/text-blocks';
import { RTECore } from './core';
import { RTETextBlockStructure } from './text-block';
import { RTEToolbarFeature } from './toolbar';
import { RTETextColorFeature } from './text-color';

const { text, textColor: color } = docFactories;
const { h1, p } = basicTextBlockFactories;

const features = [
	new RTECore(),
	new RTETextBlockStructure({ blocks: basicTextBlocks }),
	new RTEToolbarFeature(),
	new RTETextColorFeature({ defaultColor: '#000000' }),
];

export async function setup(features: RTEFeature[], initialDoc?: Array<any>) {
	const rte = await standardSetup(features, initialDoc);

	// Use an input element to act as a color picker
	const colorPicker = document.createElement('input');
	colorPicker.slot = 'text-color-picker';
	rte.element.appendChild(colorPicker);

	return {
		...rte,
		pickerAnchor: () => (colorPicker as any)['anchor'],
		pickerColor: () => colorPicker.value,
		pickColor: (color: string) => {
			colorPicker.value = color;
			colorPicker.dispatchEvent(
				new InputEvent('change', {
					bubbles: true,
					composed: true,
				})
			);
		},
	};
}

describe('RTETextColorFeature', () => {
	it('should add textColor mark to schema', async () => {
		const rte = await setup(features, [
			p(text.marks(color({ color: '#ff0000' }))('Hello')),
		]);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<textColor[color="#ff0000"]>'|Hello')"`
		);
	});

	it('should deserialize textColor from HTML', async () => {
		const rte = await setup(features);
		rte.setHtml('<p><span data-text-color="#123456">Colored</span> Plain</p>');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`"paragraph(<textColor[color="#123456"]>'|Colored', ' Plain')"`
		);
	});

	it('should serialize textColor to HTML', async () => {
		const rte = await setup(features, [
			p(text.marks(color({ color: '#123456' }))('Colored'), ' Plain'),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p data-block-type="paragraph"><span style="color: rgb(18, 52, 86);" data-text-color="#123456">Colored</span> Plain</p>"`
		);
	});

	describe('picker color', () => {
		it('should be the default color when cursor has no mark', async () => {
			const rte = await setup(features, [p('Hello')]);
			expect(rte.pickerColor()).toBe('#000000');
		});

		it('should be the mark color when cursor is inside colored text', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Hello')),
			]);
			expect(rte.pickerColor()).toBe('#ff0000');
		});

		it('should be the mark color when selected range inside colored text', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Hello')),
			]);
			rte.selectText('H[ell]o');
			expect(rte.pickerColor()).toBe('#ff0000');
		});

		it('should be empty when selected range is mixed color', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Red')),
				p(text.marks(color({ color: '#00ff00' }))('Green')),
				p(text.marks(color({ color: '#0000ff' }))('Blue')),
			]);
			rte.selectText('R[ed', 'Blu]e');
			expect(rte.pickerColor()).toBe('');
		});

		it('should be the default color when selection in node that do not support color', async () => {
			const rte = await setup(features, [h1('Title')]);
			expect(rte.pickerColor()).toBe('#000000');
		});

		it('should be the color of a stored mark', async () => {
			const rte = await setup(features, [p('Hello')]);

			rte.pickColor('#ff0000');

			expect(rte.pickerColor()).toBe('#ff0000');
		});

		it('should be the default color when there is an empty stored mark set', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Hello')),
			]);

			rte.pickColor('#000000');

			expect(rte.pickerColor()).toBe('#000000');
		});
	});

	describe('picking color', () => {
		it('should store the mark when selection is a cursor', async () => {
			const rte = await setup(features, [p('Hello World')]);
			rte.placeCursor('Hello |World');

			rte.pickColor('#ff0000');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph('Hello |<textColor[color=\\"#ff0000\\"]>|World')"`
			);

			await rte.typeTextAtCursor('beautiful ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph('Hello ', <textColor[color="#ff0000"]>'beautiful |', 'World')
				"
			`);
		});

		it('should apply the mark to a range selection', async () => {
			const rte = await setup(features, [p('Hello'), p('World')]);
			rte.selectText('H[ello', 'Worl]d');

			rte.pickColor('#ff0000');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				paragraph('H', <textColor[color="#ff0000"]>'[ello'),
				paragraph(<textColor[color="#ff0000"]>'Worl|]', 'd')
				"
			`
			);
		});

		it('should apply the mark to an all selection', async () => {
			const rte = await setup(features, [p('Hello'), p('World')]);
			rte.selectAll();

			rte.pickColor('#ff0000');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"[
				paragraph(<textColor[color="#ff0000"]>'Hello'),
				paragraph(<textColor[color="#ff0000"]>'World')
				|]"
			`
			);
		});

		it('should remove the mark when picking default color', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Hello World')),
			]);
			rte.selectText('He[llo Wor]ld');

			rte.pickColor('#000000');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`
				"
				paragraph(
					<textColor[color="#ff0000"]>'He',
					'[llo Wor|]',
					<textColor[color="#ff0000"]>'ld'
				)
				"
			`
			);
		});

		it('should store an empty mark set when picking default color with a cursor selection', async () => {
			const rte = await setup(features, [
				p(text.marks(color({ color: '#ff0000' }))('Hello World')),
			]);
			rte.placeCursor('Hello |World');

			rte.pickColor('#000000');

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph(<textColor[color="#ff0000"]>'Hello |<>|World')"`
			);

			await rte.typeTextAtCursor('beautiful ');

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					<textColor[color="#ff0000"]>'Hello ',
					'beautiful |',
					<textColor[color="#ff0000"]>'World'
				)
				"
			`);
		});
	});

	describe('toolbar button', () => {
		it('should add a button and color picker slot to the toolbar and set button as the anchor of a slotted color picker', async () => {
			const rte = await setup(features);
			expect(rte.pickerAnchor()).toBe(rte.toolbarButton('Text color'));
		});

		it('should enable the button when mark can be applied to selection', async () => {
			const rte = await setup(features, [h1('Title'), p('Paragraph')]);
			rte.selectText('Tit[le', 'Para]graph');
			expect(rte.toolbarButton('Text color').disabled).toBe(false);
		});

		it('should disable the button when mark cannot be applied to selection', async () => {
			const rte = await setup(features, [h1('Title 1'), h1('Title 2')]);
			rte.selectText('Tit[le 1', 'Tit]le 2');
			expect(rte.toolbarButton('Text color').disabled).toBe(true);
		});
	});
});
