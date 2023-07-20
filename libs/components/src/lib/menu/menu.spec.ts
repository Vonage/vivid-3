import {ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { Button, FoundationElementRegistry } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { Menu } from './menu';
import { menuDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Menu;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(menuDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBeUndefined();
			expect(element._popup).toBeInstanceOf(Popup);
		});
	});

	describe('auto-dismiss', () => {
		it('should set "open" to false when clicked outside', async () => {
			element.open = true;
			element.autoDismiss = true;

			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));

			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});

		it('should remove the listener on attribute change', async function () {
			let spy1, spy2;
			jest.spyOn(document, 'addEventListener').mockImplementation(function (_: string, cb: any) {
				spy1 = cb;
			});
			jest.spyOn(document, 'removeEventListener').mockImplementation(function (_: string, cb: any) {
				spy2 = cb;
			});
			element.open = true;
			element.autoDismiss = true;
			await elementUpdated(element);
			element.autoDismiss = false;
			await elementUpdated(element);

			expect(spy1).toBe(spy2);
		});

		it('should remove the listener on destruction', async function () {
			let spy1, spy2;
			jest.spyOn(document, 'addEventListener').mockImplementation(function (_: string, cb: any) {
				spy1 = cb;
			});
			jest.spyOn(document, 'removeEventListener').mockImplementation(function (_: string, cb: any) {
				spy2 = cb;
			});
			element.open = true;
			element.autoDismiss = true;
			await elementUpdated(element);
			element.remove();
			await elementUpdated(element);

			expect(spy1).toBe(spy2);
		});

		it('should leave "open" true when clicked outside and auto-dismiss false', async () => {
			element.open = true;
			element.autoDismiss = false;

			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));

			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});
	});

	describe('focus', () => {
		function createMenuItem(type = 'menuitem') {
			const div = document.createElement('div');
			div.setAttribute('role', type);
			element.appendChild(div);
			return div;
		}
		it('should focus the first menuitem in the menu', async () => {
			const div = createMenuItem();

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should set menu item tabindex to 0', async () => {
			const menuItem = createMenuItem();

			await elementUpdated(element);

			element.focus();

			expect(menuItem.tabIndex).toEqual(0);
		});

		it('should focus the first menuitemcheckbox in the menu', async () => {
			const div = createMenuItem('menuitemcheckbox');

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should focus the first menuitemradio in the menu', async () => {
			const div = createMenuItem('menuitemradio');

			await elementUpdated(element);

			element.focus();

			expect(document.activeElement).toEqual(div);
		});

		it('should handle menu key down events', async () => {

			function keyMoveAndGetActiveId(arrowEvent: Event) {
				document.activeElement?.dispatchEvent(arrowEvent);
				return document.activeElement?.id;
			}
			element.innerHTML = `
				<div role="menuitem" id="id1" text="Menu Item 1"></div>
				<div role="menuitem" id="id2" text="Menu Item 2"></div>
				<div role="menuitem" id="id3" text="Menu Item 3"></div>
			`;

			await elementUpdated(element);

			element.focus();

			const activeIdAfterKeyDown1 = keyMoveAndGetActiveId(arrowDownEvent);
			const activeIdAfterKeyDown2 = keyMoveAndGetActiveId(arrowDownEvent);
			const activeIdAfterKeyUp1 = keyMoveAndGetActiveId(arrowUpEvent);
			const activeIdAfterKeyUp2 = keyMoveAndGetActiveId(arrowUpEvent);

			expect(activeIdAfterKeyDown1).toEqual('id2');
			expect(activeIdAfterKeyDown2).toEqual('id3');
			expect(activeIdAfterKeyUp1).toEqual('id2');
			expect(activeIdAfterKeyUp2).toEqual('id1');

		});

		it('should reset tabindex to the first element on focusout event', async () => {
			function focusOnSecondItem() {
				element.focus();
				document.activeElement?.dispatchEvent(arrowDownEvent);
			}

			function focusOutOfBase() {
				const focusOutEvent = new FocusEvent('focusout');
				getBaseElement(element).dispatchEvent(focusOutEvent);
			}

			const menuFocusedElement = () => element.querySelector('[tabindex="0"]') as HTMLElement;

			element.innerHTML = `
				<div role="menuitem" id="id1" text="Menu Item 1"></div>
				<div role="menuitem" id="id2" text="Menu Item 2"></div>
			`;
			await elementUpdated(element);

			focusOnSecondItem();
			const focusableElementAfterMouseDown = menuFocusedElement();

			focusOutOfBase();
			const focusableElementAfterFocusOut = menuFocusedElement();

			expect(focusableElementAfterMouseDown.id).toEqual('id2');
			expect(focusableElementAfterFocusOut.id).toEqual('id1');
		});
	});

	describe('aria-hasspopup', () => {
		it('should set and remove the aria-haspopup attribute on its anchor when it changes', async () => {
			await setAnchor();

			element.anchor = 'anchor';
			await elementUpdated(element);
			const button = document.getElementById(element.anchor);
			const buttonHasPopupWhenSetAsAnchor = button?.getAttribute('aria-haspopup');


			element.anchor = '';
			await elementUpdated(element);
			const buttonHasPopupWhenRemovedAsAnchor = button?.getAttribute('aria-haspopup');

			expect(buttonHasPopupWhenSetAsAnchor).toBe('menu');
			expect(buttonHasPopupWhenRemovedAsAnchor).toBeUndefined;
		});
	});

	describe( 'menu header', () => {
		it('should have header slot ', async function () {
			const headerSlotElement = element.shadowRoot?.
				querySelector('.header slot[name="header"]');

			expect(headerSlotElement).toBeDefined();
		});

		it('should remove hide-header class from .base if header is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'header';
			slottedElement.id = 'header';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).not.toContain('hide-header');
		});
	});

	describe('menu footer', () => {
		it.each(['footer', 'action-items'])(
			'should have a %s slot ',
			(slotName) => {
				const slotElement = element.shadowRoot?.querySelector(
					`.footer slot[name="${slotName}"]`
				);

				expect(slotElement).toBeDefined();
			}
		);

		it.each(['footer', 'action-items'])(
			'should remove hide-footer class from .base if %s is slotted',
			async (slotName) => {
				const slottedElement = document.createElement('div');
				slottedElement.slot = slotName;
				element.appendChild(slottedElement);
				await elementUpdated(element);

				const baseElementClasses = getBaseElement(element)?.classList;

				expect(baseElementClasses).not.toContain('hide-footer');
			}
		);
	});

	const arrowUpEvent = new KeyboardEvent('keydown', {
		key: keyArrowUp,
		bubbles: true,
	} as KeyboardEventInit);

	const arrowDownEvent = new KeyboardEvent('keydown', {
		key: keyArrowDown,
		bubbles: true,
	} as KeyboardEventInit);

	async function setAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
