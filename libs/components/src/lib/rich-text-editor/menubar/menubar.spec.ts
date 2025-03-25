import { elementUpdated, fixture } from '@vivid-nx/shared';
import { MenuBar } from './menubar';
import type { Menu } from '../../menu/menu';
import '.';

const COMPONENT_TAG = 'vwc-menubar';

describe('menuBar', () => {
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

			expect(element.shadowRoot?.querySelectorAll('vwc-button').length).toEqual(0);
		});
	});

	describe('textSize', () => {
		it('should show the text size button when adding `textSize` to the string', async () => {
			element.setAttribute('menu-items', 'textSize');
			await elementUpdated(element);

			const textSizeButton = element.shadowRoot?.querySelector('vwc-button');
			expect(textSizeButton?.getAttribute('icon')).toEqual('text-size-line');
		});

		it('should open menu when clicked', async () => {
			element.setAttribute('menu-items', 'textSize');
			await elementUpdated(element);

			const textSizeButton = element.shadowRoot?.querySelector('vwc-button');
			textSizeButton?.click();
			await elementUpdated(element);

			const menu = element.shadowRoot?.querySelector('vwc-menu') as Menu;
			expect(menu?.open).toBeTruthy();
		});
	});
});
