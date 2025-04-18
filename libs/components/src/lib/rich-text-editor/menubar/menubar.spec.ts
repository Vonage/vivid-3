import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { Select } from '../../select/select';
import { RichTextEditorTextBlocks } from '../rich-text-editor';
import { Tooltip } from '../../tooltip/tooltip';
import { MenuBar } from './menubar';
import '.';

const COMPONENT_TAG = 'vwc-menubar';

describe('menuBar', () => {
	function getSelectionMenu(menuItemName: string) {
		return element.shadowRoot?.querySelector(`#${menuItemName}`) as Select;
	}
	let element: MenuBar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as unknown as MenuBar;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menubar', async () => {
			expect(element).toBeInstanceOf(MenuBar);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('menuItems', () => {
		it('should default to undefined', async () => {
			expect(element.menuItems).toBeUndefined();
		});

		it('should reflect menuItems property in the menu-items attribute', async () => {
			element.menuItems = 'item1 item2';
			await elementUpdated(element);

			expect(element.getAttribute('menu-items')).toEqual('item1 item2');
		});

		it('should reflect the menu-items attribute to the property', async () => {
			element.setAttribute('menu-items', 'item1 item2');
			await elementUpdated(element);

			expect(element.menuItems).toEqual('item1 item2');
		});

		it('should show empty component when no valid items are given', async () => {
			element.setAttribute('menu-items', 'item1 item2');
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelectorAll('vwc-button').length).toEqual(
				0
			);
		});

		it('should add class hide-menubar when no valid items exist in menuItems', async () => {
			element.setAttribute('menu-items', 'item1 item2');
			await elementUpdated(element);

			expect(element.classList.contains('hide-menubar')).toBe(true);
		});

		it('should remove class hide-menubar when valid items exist in menuItems', async () => {
			element.setAttribute('menu-items', 'item1 item2 textBlock');
			await elementUpdated(element);

			expect(element.classList.contains('hide-menubar')).toBe(false);
		});

		describe('textBlock', () => {
			const getOptions = () => {
				return getSelectionMenu('text-block').querySelectorAll('vwc-option');
			};

			beforeEach(async () => {
				element.setAttribute('menu-items', 'textBlock');
				await elementUpdated(element);
			});

			it('should have textBlock options in the menu', async () => {
				const textBlockOptions = Object.keys(RichTextEditorTextBlocks);
				const options = getOptions();

				expect(options?.length).toEqual(textBlockOptions.length);
				options?.forEach((optionElement, index) => {
					expect(optionElement.getAttribute('value')).toEqual(
						textBlockOptions[index]
					);
				});
			});

			it('should emit text-block-selected event with the selected text block when an option is clicked', async () => {
				const openMenu = () => (getSelectionMenu('text-block').open = true);
				const spy = vi.fn();
				element.addEventListener('text-block-selected', spy);
				const options = getOptions();
				getSelectionMenu('text-block').value = '';

				for (const option of options) {
					openMenu();
					await elementUpdated(element);
					option.click();
					await elementUpdated(element);
				}

				expect(spy).toHaveBeenCalledTimes(options.length);
				options.forEach((option, index) => {
					expect(spy.mock.calls[index][0].detail).toEqual(
						option.getAttribute('value')
					);
				});
			});

			async function openTextBlockMenu() {
				getSelectionMenu('text-block').open = true;
				await elementUpdated(element);
			}

			it('should emit a non bubbling and non composed text-block-selected event', async () => {
				const spy = vi.fn();
				element.addEventListener('text-block-selected', spy);
				await openTextBlockMenu();
				const option = getSelectionMenu('text-block').querySelectorAll(
					'vwc-option'
				)[1] as HTMLElement;

				option.click();
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0].bubbles).toBe(false);
				expect(spy.mock.calls[0][0].composed).toBe(false);
			});

			it('should close the menu when option is clicked', async () => {
				await openTextBlockMenu();

				const option = getSelectionMenu('text-block').querySelector(
					'vwc-option'
				) as HTMLElement;

				option.click();
				await elementUpdated(element);

				expect(getSelectionMenu('text-block').open).toBe(false);
			});

			it('should set a tooltip with the text block message', async () => {
				const menu = getSelectionMenu('text-block');
				const tooltip = menu.parentElement as Tooltip;

				expect(menu.getAttribute('slot')).toBe('anchor');
				expect(tooltip instanceof Tooltip).toBe(true);
				expect(tooltip?.getAttribute('text')).toBe('Text Block Type');
				expect(tooltip.getAttribute('placement')).toBe('top');
			});
		});

		describe('textDecoration', () => {
			beforeEach(async () => {
				element.setAttribute('menu-items', 'textDecoration');
				await elementUpdated(element);
			});

			it('should show the text decoration buttons when set', async () => {
				const textDecorationButtons =
					element.shadowRoot?.querySelectorAll('vwc-button');

				expect(textDecorationButtons?.length).toEqual(5);
			});

			it('should emit text-decoration-selected event with the selected text decoration when a button is clicked', async () => {
				const spy = vi.fn();
				element.addEventListener('text-decoration-selected', spy);
				const listOfDecorations = [
					'bold',
					'italics',
					'underline',
					'strikethrough',
					'monospace',
				];
				const buttons = element.shadowRoot!.querySelectorAll('vwc-button');
				buttons.forEach((button) => {
					button.click();
				});

				expect(spy).toHaveBeenCalledTimes(listOfDecorations.length);
				listOfDecorations.forEach((decorationValue, index) => {
					expect(spy.mock.calls[index][0].detail).toEqual(decorationValue);
				});
			});

			it('should emit a non bubbling and non composed text-decoration-selected event', async () => {
				const spy = vi.fn();
				element.addEventListener('text-decoration-selected', spy);
				const button = element.shadowRoot!.querySelector('vwc-button')!;

				button.click();
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0].bubbles).toBe(false);
				expect(spy.mock.calls[0][0].composed).toBe(false);
			});

			it('should set the correct icons for the buttons', async () => {
				const iconNames = [
					'bold-line',
					'italic-line',
					'underline-line',
					'strikethrough-line',
					'monospace-line',
				];
				const buttons = element.shadowRoot?.querySelectorAll('vwc-button');
				buttons?.forEach((button, index) => {
					expect(button.getAttribute('icon')).toEqual(iconNames[index]);
				});
			});

			it('should set a tooltip for each text decoration button', async () => {
				const buttons = element.shadowRoot!.querySelectorAll('vwc-button');
				for (let i = 0; i < buttons.length; i++) {
					expect(buttons[i].getAttribute('slot')).toBe('anchor');
					expect(buttons[i].parentElement instanceof Tooltip).toBe(true);
					expect(buttons[i].parentElement?.getAttribute('text')).toBe(
						buttons[i].getAttribute('aria-label')
					);
					expect(buttons[i].parentElement?.getAttribute('placement')).toBe(
						'top'
					);
				}
			});
		});
	});
});
