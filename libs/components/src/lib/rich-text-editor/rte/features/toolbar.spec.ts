import { setup } from '../__tests__/test-utils';
import { Divider } from '../../../divider/divider';
import type { Tooltip } from '../../../tooltip/tooltip';
import type { Menu } from '../../../menu/menu';
import { basicFontSizeOptions } from '../__tests__/font-sizes';
import { RteBase } from './base';
import { type RteToolbarConfig, RteToolbarFeature } from './toolbar';
import { RteFontSizePickerFeature } from './font-size-picker';
import { RteToolbarButtonFeature } from './toolbar-button';
import { RteTextBlockPickerFeature } from './text-block-picker';
import { RteTextColorPickerFeature } from './text-color-picker';
import { elementUpdated } from '@repo/shared/test-utils/fixture';

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

	it('should set offset=8 for menus to align with toolbar', async () => {
		const rte = await setup(features());

		const fontSizeMenu = rte.element.shadowRoot!.querySelector<Menu>(
			'[data-vvd-component="menu"][data-vvd-aria-label="Text size"]'
		)!;

		expect(fontSizeMenu.offset).toBe(8);
	});

	describe('focus management', () => {
		const focusFeatures = () => [
			new RteBase(),
			new RteToolbarFeature(),
			new RteToolbarButtonFeature('test', {
				label: 'Test Action',
				icon: 'at-line',
				action: { type: 'insert-text', text: 'x' },
			}),
		];

		afterEach(() => {
			vi.restoreAllMocks();
			vi.useRealTimers();
		});

		const mousedownOnToolbar = (toolbar: Element) =>
			toolbar.dispatchEvent(
				new MouseEvent('mousedown', { bubbles: true, composed: true })
			);

		const focusinOnToolbar = (toolbar: Element) =>
			toolbar.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

		/** Set up the flag as if the editor was focused when the user clicked the toolbar. */
		const simulateMouseClickFromEditor = (
			rte: Awaited<ReturnType<typeof setup>>
		) => {
			vi.spyOn(rte.view, 'hasFocus').mockReturnValueOnce(true);
			mousedownOnToolbar(rte.toolbar);
			focusinOnToolbar(rte.toolbar);
		};

		it('should return focus to editor after a mouse-click transfer of focus from the editor', async () => {
			const rte = await setup(focusFeatures());

			simulateMouseClickFromEditor(rte);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).toHaveBeenCalled();
		});

		it('should not return focus to editor when the toolbar received focus via keyboard', async () => {
			const rte = await setup(focusFeatures());

			// focusin with no preceding mousedown (keyboard navigation)
			focusinOnToolbar(rte.toolbar);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).not.toHaveBeenCalled();
		});

		it('should not return focus when focusin arrives more than 250ms after mousedown', async () => {
			const rte = await setup(focusFeatures());

			vi.useFakeTimers();
			vi.spyOn(rte.view, 'hasFocus').mockReturnValueOnce(true);
			mousedownOnToolbar(rte.toolbar);

			vi.advanceTimersByTime(251);
			focusinOnToolbar(rte.toolbar); // 251ms elapsed → flag cleared

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).not.toHaveBeenCalled();
		});

		it('should clear the flag on focusout to an element outside the toolbar', async () => {
			const rte = await setup(focusFeatures());

			simulateMouseClickFromEditor(rte);

			rte.toolbar.dispatchEvent(
				new FocusEvent('focusout', {
					bubbles: true,
					relatedTarget: document.body,
				})
			);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).not.toHaveBeenCalled();
		});

		it('should not set the flag when mousedown occurs while editor is not focused', async () => {
			const rte = await setup(focusFeatures());

			mousedownOnToolbar(rte.toolbar);
			focusinOnToolbar(rte.toolbar);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).not.toHaveBeenCalled();
		});

		it('should return focus to editor after selecting a menu item', async () => {
			vi.useFakeTimers();
			const rte = await setup([
				new RteBase(),
				new RteToolbarFeature(),
				new RteFontSizePickerFeature(basicFontSizeOptions),
			]);

			simulateMouseClickFromEditor(rte);
			await rte.click(rte.toolbarButton('Text size'));

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.menuItem(rte.openMenu(), 'Large'));

			expect(focusSpy).toHaveBeenCalled();
		});

		it('should return focus to editor after changing a select', async () => {
			const rte = await setup([
				new RteBase({ heading1: true }),
				new RteToolbarFeature(),
				new RteTextBlockPickerFeature({
					options: [
						{ node: 'paragraph', label: 'Body' },
						{ node: 'heading1', label: 'Title' },
					],
				}),
			]);

			simulateMouseClickFromEditor(rte);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			rte
				.toolbarSelect('Paragraph styles')
				.dispatchEvent(new Event('change', { bubbles: true }));

			expect(focusSpy).toHaveBeenCalled();
		});

		it('should return focus to editor after interacting with a slotted element', async () => {
			const rte = await setup([
				new RteBase(),
				new RteToolbarFeature(),
				new RteTextColorPickerFeature(),
			]);

			const colorPicker = document.createElement('input');
			colorPicker.slot = 'text-color-picker';
			rte.element.appendChild(colorPicker);
			await elementUpdated(rte.element);

			simulateMouseClickFromEditor(rte);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			colorPicker.value = '#ff0000';
			colorPicker.dispatchEvent(
				new InputEvent('change', { bubbles: true, composed: true })
			);

			expect(focusSpy).toHaveBeenCalled();
		});

		it('should keep the flag on focusout to an element within the toolbar', async () => {
			const rte = await setup(focusFeatures());

			simulateMouseClickFromEditor(rte);

			rte.toolbar.dispatchEvent(
				new FocusEvent('focusout', {
					bubbles: true,
					relatedTarget: rte.toolbarButton('Test Action'),
				})
			);

			const focusSpy = vi.spyOn(rte.view, 'focus');
			await rte.click(rte.toolbarButton('Test Action'));

			expect(focusSpy).toHaveBeenCalled();
		});
	});

	describe('hidden', () => {
		it('should be false by default', async () => {
			const rte = await setup(features());
			const toolbarFeature = rte.instance.feature(RteToolbarFeature);

			expect(toolbarFeature.hidden).toBe(false);
			expect(rte.toolbar.classList.contains('toolbar--hidden')).toBe(false);
		});

		it('should toggle toolbar visibility', async () => {
			const rte = await setup(features());
			const toolbarFeature = rte.instance.feature(RteToolbarFeature);

			toolbarFeature.hidden = true;

			expect(toolbarFeature.hidden).toBe(true);
			expect(rte.toolbar.classList.contains('toolbar--hidden')).toBe(true);

			toolbarFeature.hidden = false;

			expect(toolbarFeature.hidden).toBe(false);
			expect(rte.toolbar.classList.contains('toolbar--hidden')).toBe(false);
		});
	});
});
