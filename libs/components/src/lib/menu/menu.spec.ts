import {
	ADD_TEMPLATE_TO_FIXTURE,
	axe,
	elementUpdated,
	fixture,
	getBaseElement,
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import type { Button } from '../button/button';
import type { Popup } from '../popup/popup.ts';
import { Menu } from './menu';
import { menuDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;
	let popup: Popup;
	let anchor: Button;

	global.ResizeObserver = class {
		observe = jest.fn();
		unobserve = jest.fn();
		disconnect = jest.fn();
	};

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Menu;
		popup = element.shadowRoot?.querySelector('vwc-popup') as Popup;

		anchor = fixture(
			'<vwc-button id="anchorButton"></vwc-button>',
			ADD_TEMPLATE_TO_FIXTURE
		) as Button;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(menuDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toEqual(undefined);
			expect(element.placement).toEqual('bottom');
		});
	});

	describe('open', () => {
		it.each([true, false])(
			'should forward open=%s to popup',
			async (isOpen) => {
				element.open = isOpen;
				await elementUpdated(element);

				expect(popup.hasAttribute('open')).toBe(isOpen);
			}
		);
	});

	describe('trigger', () => {
		describe.each([
			{
				trigger: 'auto',
				openAfterClickAnchor: true,
				openAfterClickAnchorWhenOpen: false,
				openAfterSelectItem: false,
			},
			{
				trigger: 'legacy',
				openAfterClickAnchor: true,
				openAfterClickAnchorWhenOpen: true,
				openAfterSelectItem: true,
			},
			{
				trigger: 'off',
				openAfterClickAnchor: false,
				openAfterClickAnchorWhenOpen: true,
				openAfterSelectItem: true,
			},
		] as const)(
			'trigger=$trigger',
			({
				trigger,
				openAfterClickAnchor,
				openAfterClickAnchorWhenOpen,
				openAfterSelectItem,
			}) => {
				beforeEach(async () => {
					element.trigger = trigger;
					element.anchor = anchor.id;
					await elementUpdated(element);
				});

				it(`should have open=${openAfterClickAnchor} after clicking on the anchor`, async () => {
					anchor.click();
					await elementUpdated(element);

					expect(element.open).toBe(openAfterClickAnchor);
				});

				it(`should have open=${openAfterClickAnchorWhenOpen} after clicking on the anchor while open`, async () => {
					element.open = true;
					await elementUpdated(element);

					anchor.click();
					await elementUpdated(element);

					expect(element.open).toBe(openAfterClickAnchorWhenOpen);
				});

				it.each(['menuitem', 'menuitemradio'])(
					`should have open=${openAfterSelectItem} when selecting an item with role %s`,
					async (role) => {
						element.open = true;
						const menuItem = document.createElement('div');
						menuItem.role = role;
						element.appendChild(menuItem);
						await elementUpdated(element);

						menuItem.dispatchEvent(
							new CustomEvent('change', { bubbles: true })
						);
						await elementUpdated(element);

						expect(element.open).toBe(openAfterSelectItem);
					}
				);

				it('should not close when clicking on menu item with role menuitemcheckbox', async () => {
					element.open = true;

					const menuItem = document.createElement('div');
					menuItem.role = 'menuitemcheckbox';
					element.appendChild(menuItem);
					await elementUpdated(element);

					menuItem.dispatchEvent(new CustomEvent('change', { bubbles: true }));
					await elementUpdated(element);

					expect(element.open).toBe(true);
				});
			}
		);
	});

	describe('auto-dismiss', () => {
		beforeEach(() => {
			element.open = true;
		});

		it('should close on focusout if auto-dismiss is set', async () => {
			element.autoDismiss = true;

			element.dispatchEvent(new FocusEvent('focusout'));

			expect(element.open).toBe(false);
		});

		it('should remain open on focusout if auto-dismiss is not set', async () => {
			element.dispatchEvent(new FocusEvent('focusout'));

			expect(element.open).toBe(true);
		});

		it('should close on focusout on the anchor if auto-dismiss is set', async () => {
			element.anchor = anchor;
			element.autoDismiss = true;

			element.dispatchEvent(new FocusEvent('focusout'));

			expect(element.open).toBe(false);
		});

		it('should remain open on focusout on the anchor if auto-dismiss is not set', async () => {
			element.anchor = anchor;

			element.dispatchEvent(new FocusEvent('focusout'));

			expect(element.open).toBe(true);
		});
	});

	describe('esc key press', () => {
		it('should set "open" to false', async () => {
			element.open = true;
			element.autoDismiss = true;

			await elementUpdated(element);

			getBaseElement(element).dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);

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

			const menuFocusedElement = () =>
				element.querySelector('[tabindex="0"]') as HTMLElement;

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

		it('should ignore focusout when there are no menuitems', async () => {
			await elementUpdated(element);

			expect(() => focusOutOfBody()).not.toThrow();
		});

		it('should ignore anchor when setting tabindex on child focus', async () => {
			const anchor = document.createElement('button');
			anchor.slot = 'anchor';
			element.appendChild(anchor);
			const child1 = createMenuItem('menuitemcheckbox');
			const child2 = createMenuItem('menuitemcheckbox');
			await elementUpdated(element);

			child2.focus();

			expect(anchor.hasAttribute('tabindex')).toBe(false);
			expect(child1.getAttribute('tabindex')).toBe('-1');
		});
	});

	describe('anchor', () => {
		beforeEach(async () => {
			element.anchor = anchor.id;
			await elementUpdated(element);
		});

		it('should pass anchor to the popup as an element', async () => {
			expect(popup.anchor).toBe(anchor);
		});

		it('should set aria-haspopup=menu on the anchor element', async () => {
			expect(anchor.getAttribute('aria-haspopup')).toBe('menu');
		});

		it.each([
			['false', false],
			['true', true],
		])(
			'should set aria-expanded=%s on the anchor element when open is %s',
			async (expectedValue, isOpen) => {
				element.open = isOpen;
				expect(anchor.getAttribute('aria-expanded')).toBe(expectedValue);
			}
		);

		it('should open when anchor is clicked', async () => {
			anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		describe('when anchor is removed', () => {
			beforeEach(async () => {
				element.anchor = undefined;
				await elementUpdated(element);
			});

			it('should remove aria-haspopup from anchor element', async () => {
				expect(anchor.hasAttribute('aria-haspopup')).toBe(false);
			});

			it('should remove aria-expanded from anchor element', async () => {
				expect(anchor.hasAttribute('aria-expanded')).toBe(false);
			});

			it('should no longer open when anchor is clicked', async () => {
				anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
				await elementUpdated(element);
				expect(element.open).toEqual(false);
			});
		});
	});

	describe('open', () => {
		it('should remain open when clicked inside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should leave open without change when clicked outside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});
	});

	describe('menu header', () => {
		it('should have header slot ', async function () {
			const headerSlotElement = element.shadowRoot?.querySelector(
				'.header slot[name="header"]'
			);

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

	describe('menu actions', () => {
		it('should have actions slot ', async function () {
			const actionsSlotElement = element.shadowRoot?.querySelector(
				'.action-items slot[name="actions"]'
			);

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

	describe('menu items', () => {
		it('should have default slot ', async function () {
			const actionsSlotElement =
				element.shadowRoot?.querySelector('.body slot');

			expect(actionsSlotElement).toBeDefined();
		});

		it('should set hide-body class on base if no items are slotted', async function () {
			await elementUpdated(element);

			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).toContain('hide-body');
		});

		it('should remove hide-body class from base if items is slotted', async function () {
			const slottedElement = document.createElement('div');
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).not.toContain('hide-body');
		});
	});

	describe('open event', () => {
		it('should dispatch a non-bubbling open event when the menu is opened', async () => {
			const spy = jest.fn();
			element.addEventListener('open', spy);

			element.open = true;
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('close event', () => {
		it('should dispatch a non-bubbling close event when the menu is close', async () => {
			const spy = jest.fn();
			element.addEventListener('close', spy);
			element.open = true;
			await elementUpdated(element);

			element.open = false;
			await elementUpdated(element);

			expect(spy).toHaveBeenCalledWith(
				expect.objectContaining({ bubbles: false })
			);
		});
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.open = true;
			element.ariaLabel = 'A11y label';
			element.innerHTML = `
				<div role="menuitem" id="id1">Menu Item 1</div>
				<div role="menuitem" id="id2">Menu Item 2</div>
			`;
			await elementUpdated(element);
		});

		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});

		it('should render the aria-label on the menu element', async () => {
			const menu = element.shadowRoot?.querySelector('[role="menu"]');
			expect(menu?.getAttribute('aria-label')).toBe('A11y label');
		});

		it('should render the element with a role of presentation', async () => {
			expect(element.getAttribute('role')).toBe('presentation');
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

	function focusOutOfBody() {
		const focusOutEvent = new FocusEvent('focusout');
		const bodyElement = element.shadowRoot?.querySelector(
			'.body'
		) as HTMLElement;
		bodyElement.dispatchEvent(focusOutEvent);
	}
});
