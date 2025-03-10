import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getBaseElement,
} from '@vivid-nx/shared';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
} from '@microsoft/fast-web-utilities';
import type { Button } from '../button/button';
import type { Popup } from '../popup/popup.ts';
import { MenuItem } from '../menu-item/menu-item.ts';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Menu } from './menu';
import '.';
import '../menu-item';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;
	let popup: Popup;
	let anchor: Button;

	function pressKey(key: string) {
		document.activeElement!.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				bubbles: true,
				cancelable: true,
			})
		);
	}

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
			expect(element).toBeInstanceOf(Menu);
			expect(element.open).toEqual(false);
			expect(element.anchor).toEqual(undefined);
			expect(element.placement).toEqual('bottom');
			expect(element.positionStrategy).toEqual('fixed');
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

		it('should not throw an error when setting open to true in unconnected state', async () => {
			const menu = document.createElement(COMPONENT_TAG) as Menu;

			expect(() => {
				menu.open = true;
			}).not.toThrow();
		});
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
		let event: KeyboardEvent;

		beforeEach(async function () {
			element.open = true;
			element.autoDismiss = true;
			event = new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				composed: true,
			});
			await elementUpdated(element);
		});

		it('should set "open" to false', async () => {
			getBaseElement(element).dispatchEvent(event);

			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		it('should allow propgation on escape key and menu is closed', async () => {
			element.open = false;
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(spy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key and menu is open', async () => {
			element.open = true;
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(spy.mock.calls.length).toBe(0);
		});

		it('should allow default if Escape was pressed', async () => {
			vi.spyOn(event, 'preventDefault');
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(0);
		});

		it('should enable default if key is not Escape', async () => {
			vi.spyOn(event, 'preventDefault');
			getBaseElement(element).dispatchEvent(event);
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(0);
		});
	});

	describe('focus', () => {
		function createMenuItem(type = 'menuitem') {
			const div = document.createElement('div');
			div.setAttribute('role', type);
			element.appendChild(div);
			return div;
		}

		it('should focus the first descendant with the autofocus attribute', async () => {
			const input = document.createElement('input');
			input.setAttribute('autofocus', '');
			element.slot = 'header';
			element.appendChild(input);

			element.focus();

			expect(document.activeElement).toEqual(input);
		});

		it('should focus the first menuitem in the menu if there is no descendant with autofocus attribute', async () => {
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

		describe('keyboard navigation', () => {
			let item1: HTMLElement;
			let item2: HTMLElement;
			let item3: HTMLElement;
			beforeEach(async () => {
				item1 = createMenuItem();
				item2 = createMenuItem();
				item3 = createMenuItem();
				await elementUpdated(element);
			});

			it('should move focus to the next menuitem when pressing arrow down', async () => {
				item1.focus();

				pressKey(keyArrowDown);

				expect(document.activeElement).toBe(item2);
			});

			it('should move focus to the previous menuitem when pressing arrow up', async () => {
				item3.focus();

				pressKey(keyArrowUp);

				expect(document.activeElement).toBe(item2);
			});

			it('should move focus to the last menuitem when pressing end', async () => {
				item1.focus();

				pressKey(keyEnd);

				expect(document.activeElement).toBe(item3);
			});

			it('should move focus to the first menuitem when pressing home', async () => {
				item3.focus();

				pressKey(keyHome);

				expect(document.activeElement).toBe(item1);
			});

			it('should not prevent default of other keydown events', () => {
				const keydownSpy = vi.fn();
				element.addEventListener('keydown', keydownSpy);
				item1.focus();

				pressKey('A');

				expect(keydownSpy).toHaveBeenCalledWith(
					expect.objectContaining({ defaultPrevented: false })
				);
			});

			it('should ignore non-focusable elements', async () => {
				element.insertBefore(document.createElement('div'), item3);
				await elementUpdated(element);
				item2.focus();

				pressKey(keyArrowDown);

				expect(document.activeElement).toBe(item3);
			});

			it('should ignore cancelled keypress events', async () => {
				item1.addEventListener('keydown', (e) => e.preventDefault());
				item1.focus();

				pressKey(keyArrowDown);

				expect(document.activeElement).toBe(item1);
			});
		});

		it('should reset tabindex to the first element on focusout event', async () => {
			function focusOnSecondItem() {
				element.focus();
				pressKey(keyArrowDown);
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

		it('should not throw when called in disconnected state', async () => {
			element.remove();

			expect(() => element.focus()).not.toThrow();
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

			it('should no longer close if anchor loses focus and auto-dismiss is set', async () => {
				element.autoDismiss = true;
				element.open = true;
				await elementUpdated(element);

				anchor.dispatchEvent(new FocusEvent('focusout'));
				await elementUpdated(element);

				expect(element.open).toBe(true);
			});
		});
	});

	describe('position-strategy', () => {
		it('should reflect position-strategy attribute to property', async function () {
			element.setAttribute('position-strategy', 'absolute');
			await elementUpdated(element);
			expect(element.positionStrategy).toEqual('absolute');
		});

		it('should reflect its value to popup class', async function () {
			element.positionStrategy = 'absolute';
			await elementUpdated(element);

			expect(popup.strategy).toBe('absolute');
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

		it('should move focus into the menu once popup is visible and positioned when set to true', async () => {
			element.anchor = anchor;
			element.innerHTML = `
				<div role="menuitem" id="id1">Menu Item 1</div>
			`;
			const menuItem = element.querySelector('#id1') as HTMLElement;
			await elementUpdated(element);
			let isPositionSet = false;
			Object.defineProperty(popup.popupEl.style, 'left', {
				set() {
					isPositionSet = true;
				},
			});
			const popupStateWhenFocusCalled = new Promise<any>((resolve) => {
				vi.spyOn(menuItem, 'focus').mockImplementation(() => {
					resolve({
						isVisible: popup.controlEl.classList.contains('open'),
						isPositionSet,
					});
					HTMLElement.prototype.focus.apply(menuItem);
				});
			});

			element.open = true;

			expect((await popupStateWhenFocusCalled).isVisible).toBe(true);
			expect((await popupStateWhenFocusCalled).isPositionSet).toBe(true);
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
			const spy = vi.fn();
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
			const spy = vi.fn();
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

	describe('a11y attributes', () => {
		it('should render the element with a role of presentation', async () => {
			expect(element.getAttribute('role')).toBe('presentation');
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => element.shadowRoot!.querySelector('[role="menu"]')!,
			['ariaLabel']
		);
	});

	describe('radio items', () => {
		it('should uncheck other unseparated radiomenuitems when one is checked', async () => {
			element.innerHTML = `
				<vwc-menu-item role='menuitemradio' id='id1' checked></vwc-menu-item>
				<div role='separator'></div>
				<vwc-menu-item role='menuitemradio' id='id2' checked></vwc-menu-item>
				<vwc-menu-item role='menuitemradio' id='id3'></vwc-menu-item>
				<vwc-menu-item role='menuitemradio' id='id4' checked></vwc-menu-item>
				<div role='separator'></div>
				<vwc-menu-item role='menuitemradio' id='id5' checked></vwc-menu-item>
			`;
			await elementUpdated(element);
			const menuItem = (id: string) =>
				element.querySelector(`#${id}`) as MenuItem;

			menuItem('id3').checked = true;

			expect(menuItem('id1').checked).toBe(true);
			expect(menuItem('id2').checked).toBe(false);
			expect(menuItem('id3').checked).toBe(true);
			expect(menuItem('id4').checked).toBe(false);
			expect(menuItem('id5').checked).toBe(true);
		});

		it('should ignore radiomenuitems outside of default slot', async () => {
			const headerItem = document.createElement('vwc-menu-item') as MenuItem;
			headerItem.role = 'menuitemradio';
			headerItem.slot = 'header';
			element.appendChild(headerItem);
			const item = document.createElement('vwc-menu-item') as MenuItem;
			item.role = 'menuitemradio';
			item.checked = true;
			element.appendChild(item);
			await elementUpdated(element);

			headerItem.checked = true;

			expect(item.checked).toBe(true);
		});

		it('should gracefully fail when a menu item is checked synchronously after connecting the menu', async () => {
			const menu = document.createElement(COMPONENT_TAG) as Menu;
			const menuItem1 = document.createElement('vwc-menu-item') as MenuItem;
			const menuItem2 = document.createElement('vwc-menu-item') as MenuItem;
			menu.appendChild(menuItem1);
			menu.appendChild(menuItem2);

			element.replaceWith(menu);

			expect(() => (menuItem1.checked = true)).not.toThrow();
		});
	});

	describe('submenu', () => {
		let item1: MenuItem;
		let item2: MenuItem;
		beforeEach(async () => {
			element.innerHTML = `
				<vwc-menu-item id="item1" text="Menu item 1">
					<vwc-menu slot="submenu">
						<vwc-menu-item text="Menu item 1.1"></vwc-menu-item>
					</vwc-menu>
				</vwc-menu-item>
				<vwc-menu-item id="item2" text="Menu item 2">
					<vwc-menu slot="submenu">
						<vwc-menu-item text="Menu item 2.1"></vwc-menu-item>
					</vwc-menu>
				</vwc-menu-item>
			`;
			item1 = element.querySelector('#item1') as MenuItem;
			item2 = element.querySelector('#item2') as MenuItem;
			await elementUpdated(element);
		});

		it('should collapse the expanded submenu when calling collapseExpandedItem()', async () => {
			item1.expanded = true;
			await elementUpdated(element);

			element.collapseExpandedItem();

			expect(item1.expanded).toBe(false);
		});

		it('should collapse other submenus when one expands', async () => {
			item1.expanded = true;
			await elementUpdated(element);

			item2.expanded = true;
			await elementUpdated(element);

			expect(item1.expanded).toBe(false);
		});
	});

	function focusOutOfBody() {
		const focusOutEvent = new FocusEvent('focusout');
		const bodyElement = element.shadowRoot?.querySelector(
			'.body'
		) as HTMLElement;
		bodyElement.dispatchEvent(focusOutEvent);
	}
});
