import { setup } from '../__tests__/test-utils';
import { Divider } from '../../../divider/divider';
import type { Tooltip } from '../../../tooltip/tooltip';
import type { Menu } from '../../../menu/menu';
import { basicFontSizeOptions } from '../__tests__/font-sizes';
import { RteBase } from './base';
import { type RteToolbarConfig, RteToolbarFeature } from './toolbar';
import { RteFontSizePickerFeature } from './font-size-picker';

const features = (config?: RteToolbarConfig) => [
	new RteBase(),
	new RteFontSizePickerFeature(basicFontSizeOptions),
	new RteToolbarFeature(config),
];

describe('RteToolbarFeature', () => {
	it('should render toolbar items in order and separated by dividers', async () => {
		const rte = await setup(features());

		const toolbar = rte.element.shadowRoot!.querySelector('.toolbar')!;

		expect(toolbar.children[0].contains(rte.toolbarButton('Undo'))).toBe(true);
		expect(toolbar.children[1].contains(rte.toolbarButton('Redo'))).toBe(true);
		expect(toolbar.children[2]).toBeInstanceOf(Divider);
		expect(toolbar.children[3].contains(rte.toolbarButton('Text size'))).toBe(
			true
		);
		expect(
			toolbar.querySelectorAll('[data-vvd-component="divider"]').length
		).toBe(1);
	});

	it('should use placement=top for tooltips and menus by default', async () => {
		const rte = await setup(features());

		const undoTooltip = rte.element.shadowRoot!.querySelector<Tooltip>(
			'[data-vvd-component="tooltip"][text="Undo"]'
		)!;

		expect(undoTooltip.placement).toBe('top');

		const fontSizeMenu = rte.element.shadowRoot!.querySelector<Menu>(
			'[data-vvd-component="menu"][data-vvd-aria-label="Text size"]'
		)!;

		expect(fontSizeMenu.placement).toBe('top');
	});

	it('should use placement=bottom for tooltips and menus when popupDirection=outward', async () => {
		const rte = await setup(
			features({
				popupDirection: 'outward',
			})
		);

		const undoTooltip = rte.element.shadowRoot!.querySelector<Tooltip>(
			'[data-vvd-component="tooltip"][text="Undo"]'
		)!;

		expect(undoTooltip.placement).toBe('bottom');

		const fontSizeMenu = rte.element.shadowRoot!.querySelector<Menu>(
			'[data-vvd-component="menu"][data-vvd-aria-label="Text size"]'
		)!;

		expect(fontSizeMenu.placement).toBe('bottom');
	});
});
