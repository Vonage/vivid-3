import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { Menu } from '../../menu/menu';
import { RichTextEditorTextSizes } from '../rich-text-editor';
import { MenuBar } from './menubar';
import '.';

const COMPONENT_TAG = 'vwc-menubar';

describe('menuBar', () => {
	function getSelectionMenu(menuItemName: string) {
		return element.shadowRoot?.querySelector(`#${menuItemName}`) as Menu;
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
			element.setAttribute('menu-items', 'item1 item2 textSize');
			await elementUpdated(element);

			expect(element.classList.contains('hide-menubar')).toBe(false);
		});

		describe('textSize', () => {
			let textSizeButton: HTMLButtonElement;

			beforeEach(async () => {
				element.setAttribute('menu-items', 'textSize');
				await elementUpdated(element);
				textSizeButton = element.shadowRoot?.querySelector(
					'vwc-button'
				) as HTMLButtonElement;
			});

			it('should show the text size button when adding `textSize` to the string', async () => {
				expect(textSizeButton?.getAttribute('icon')).toEqual('text-size-line');
			});

			it('should open menu when clicked', async () => {
				textSizeButton.click();
				await elementUpdated(element);

				const menu = element.shadowRoot?.querySelector('vwc-menu') as Menu;
				expect(menu?.open).toBeTruthy();
			});

			it('should close menu when clicked again', async () => {
				textSizeButton.click();
				await elementUpdated(element);
				textSizeButton.click();
				await elementUpdated(element);

				expect(getSelectionMenu('text-size').open).toBeFalsy();
			});

			it('should have textSize options in the menu', async () => {
				const textSizeOptions = Object.keys(RichTextEditorTextSizes);
				const options =
					getSelectionMenu('text-size').querySelectorAll('vwc-menu-item');

				expect(options?.length).toEqual(textSizeOptions.length);
				options?.forEach((optionElement, index) => {
					expect(optionElement.getAttribute('value')).toEqual(
						textSizeOptions[index]
					);
				});
			});

			it('should emit text-size-selected event with the selected text size when an option is clicked', async () => {
				const spy = vi.fn();
				element.addEventListener('text-size-selected', spy);
				getSelectionMenu('text-size').open = true;
				const options = getSelectionMenu('text-size').querySelectorAll(
					'vwc-menu-item'
				) as unknown as HTMLElement[];

				options.forEach((option) => option.click());
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(options.length);
				options.forEach((option, index) => {
					expect(spy.mock.calls[index][0].detail).toEqual(
						option.getAttribute('value')
					);
				});
			});

			it('should emit a non bubbling and non composed text-size-selected event', async () => {
				const spy = vi.fn();
				element.addEventListener('text-size-selected', spy);
				const option = getSelectionMenu('text-size').querySelector(
					'vwc-menu-item'
				) as HTMLElement;

				option.click();
				await elementUpdated(element);

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0].bubbles).toBe(false);
				expect(spy.mock.calls[0][0].composed).toBe(false);
			});

			it('should close the menu when option is clicked', async () => {
				getSelectionMenu('text-size').open = true;
				await elementUpdated(element);

				const option = getSelectionMenu('text-size').querySelector(
					'vwc-menu-item'
				) as HTMLElement;

				option.click();
				await elementUpdated(element);

				expect(getSelectionMenu('text-size').open).toBe(false);
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
					'italic',
					'underline',
					'strikethrough',
					'monospace',
				];
				const buttons = element.shadowRoot?.querySelectorAll('vwc-button');
				buttons?.forEach((button, index) => {
					(button as any).click();
				});

				expect(spy).toHaveBeenCalledTimes(listOfDecorations.length);
				listOfDecorations.forEach((decorationValue, index) => {
					expect(spy.mock.calls[index][0].detail).toEqual(decorationValue);
				});
			});

			it('should emit a non bubbling and non composed text-decoration-selected event', async () => {
				const spy = vi.fn();
				element.addEventListener('text-decoration-selected', spy);
				const button = element.shadowRoot?.querySelector(
					'vwc-button'
				) as HTMLButtonElement;

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
		});
	});
});
