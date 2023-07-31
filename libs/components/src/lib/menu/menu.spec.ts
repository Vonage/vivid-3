import {ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { Button, FoundationElementRegistry } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { fireEvent } from '@testing-library/dom';
import { Menu } from './menu';
import { menuDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;
	let anchor: Button;

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
		anchor = await fixture('<vwc-button id="anchorButton"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Menu;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(menuDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toEqual('');
			expect(element.placement).toEqual('bottom');
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

		it('should remain open when clicked inside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			element.autoDismiss = true;
			await elementUpdated(element);

			element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should set open to false when clicked outside', async () => {
			element.anchor = 'anchorButton';
			element.autoDismiss = true;
			element.open = true;
			await elementUpdated(element);

			fireEvent(document.body, new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
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

			function focusOutOfBody() {
				const focusOutEvent = new FocusEvent('focusout');
				const bodyElement = element.shadowRoot?.querySelector('.body') as HTMLElement;
				bodyElement.dispatchEvent(focusOutEvent);
			}

			const menuFocusedElement = () => element.querySelector('[tabindex="0"]') as HTMLElement;

			element.innerHTML = `
				<div role="menuitem" id="id1" text="Menu Item 1"></div>
				<div role="menuitem" id="id2" text="Menu Item 2"></div>
			`;
			await elementUpdated(element);

			focusOnSecondItem();
			const focusableElementAfterMouseDown = menuFocusedElement();

			focusOutOfBody();
			const focusableElementAfterFocusOut = menuFocusedElement();

			expect(focusableElementAfterMouseDown.id).toEqual('id2');
			expect(focusableElementAfterFocusOut.id).toEqual('id1');
		});
	});

	describe('anchorButton', () => {

		describe('observer cleanup', function () {
			let disconnectionFunc: any;
			let mutationObserverSpy: any;
			beforeEach(function () {
				const mockMutationObserver = jest.fn(function(this: any, callback) {
					this.observe = jest.fn();
					disconnectionFunc = this.disconnect = jest.fn();
					callback();
				});
				mutationObserverSpy = jest.spyOn(window, 'MutationObserver')
					.mockImplementation(mockMutationObserver as any);
			});

			afterEach(function () {
				mutationObserverSpy.mockRestore();
			});

			it('should remove observer when element is removed from the DOM', async function () {
				element.anchor = 'nonExistentAnchor';
				element.remove();
				expect(disconnectionFunc).toHaveBeenCalled();
			});

			it('should remove observer when anchor changes', async function () {
				element.anchor = 'nonExistentAnchor';
				const cachedDisconnectionFunc = disconnectionFunc;
				element.anchor = 'anotherNonExistentAnchor';
				expect(cachedDisconnectionFunc).toHaveBeenCalled();
			});
		});

		it('should accept an anchor before anchor element is added to the DOM', async () => {
			const newAnchor = document.createElement('vwc-button');
			newAnchor.id = 'anchor2';
			element.anchor = 'anchor2';

			element.parentElement?.appendChild(newAnchor);

			await elementUpdated(element);

			fireEvent(newAnchor, new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
			newAnchor.remove();
		});

		it('should accept an HTMLElement as anchor', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		}); 

		it('should remove the previous anchor\'s listener when anchor is changed', async () => {
			fixture(
				'<vwc-button id="anchor2"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
			) as Button;

			element.anchor = 'anchorButton';
			await elementUpdated(element);

			element.anchor = 'anchor2';
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should set the new anchor\'s listener when anchor is changed', async () => {
			const anchor2 = fixture(
				'<vwc-button id="anchor2"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
			) as Button;

			element.anchor = 'anchorButton';
			await elementUpdated(element);

			element.anchor = 'anchor2';
			await elementUpdated(element);

			anchor2.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});
	});

	describe('open', () => {
		it('should open when its anchor is clicked', async () => {
			element.anchor = 'anchorButton';
			await elementUpdated(element);

			expect(element.open).toBe(false);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remain open when clicked inside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should leave open without change when clicked outside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});
	});

	describe('aria-hasspopup', () => {
		it('should set and remove the aria-haspopup attribute on its anchor when it changes', async () => {
			element.anchor = 'anchorButton';
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

	describe( 'menu actions', () => {
		it('should have actions slot ', async function () {
			const actionsSlotElement = element.shadowRoot?.
				querySelector('.action-items slot[name="actions"]');

			expect(actionsSlotElement).toBeDefined();
		});

		it('should remove hide-actions class from .base if actions is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'action-items';
			slottedElement.id = 'actions';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).not.toContain('hide-actions');
		});
	});

	const arrowUpEvent = new KeyboardEvent('keydown', {
		key: keyArrowUp,
		bubbles: true,
	} as KeyboardEventInit);

	const arrowDownEvent = new KeyboardEvent('keydown', {
		key: keyArrowDown,
		bubbles: true,
	} as KeyboardEventInit);
});
