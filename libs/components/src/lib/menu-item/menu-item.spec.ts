import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import '.';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { fireEvent } from '@testing-library/dom';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import { Menu } from '../menu/menu';
import { CheckAppearance, MenuItem } from './menu-item';
import { menuItemDefinition, MenuItemRole } from './definition';

const MENU_TAG = 'vwc-menu';
const COMPONENT_TAG = 'vwc-menu-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-menu-item', () => {
	let menuElement: Menu;
	let element: MenuItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as MenuItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu-item', async () => {
			expect(menuItemDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(MenuItem);
			expect(element.text).toEqual(undefined);
			expect(element.textSecondary).toEqual(undefined);
			expect(element.role).toEqual('menuitem');
			expect(element.icon).toBeUndefined();
			expect(element.checked).toBeUndefined();
			expect(element.disabled).toBeUndefined();
			expect(element.expanded).toBeUndefined();
		});
	});

	describe('icon', function () {
		it('should set a leading icon', async () => {
			const iconName = 'file-pdf-line';
			element.icon = iconName;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon.name).toEqual(iconName);
		});
	});

	describe('role', () => {
		it('should have menuitem role by default', async () => {
			element.setAttribute('role', '');
			await elementUpdated(element);
			expect(element.getAttribute('role')).toEqual(MenuItemRole.menuitem);
		});

		it('should reflect the role property', async () => {
			const role = MenuItemRole.menuitem;
			element.role = role;
			await elementUpdated(element);
			expect(element.getAttribute('role')).toEqual(role);
		});

		it('should set trailing class if role=checkbox and icon is set', async function () {
			const iconName = 'file-pdf-line';
			element.icon = iconName;
			element.role = MenuItemRole.menuitemcheckbox;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('trailing')
			).toBeTruthy();
		});

		it('should display icon if role=checkbox and icon is set', async function () {
			const iconName = 'file-pdf-line';
			element.icon = iconName;
			element.role = MenuItemRole.menuitemcheckbox;
			element.checked = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(
				`[name="${iconName}"]`
			) as Icon;
			expect(icon).toBeInstanceOf(Icon);
		});

		it.each([
			['checkbox-checked-2-line', true, MenuItemRole.menuitemcheckbox],
			['checkbox-unchecked-2-line', false, MenuItemRole.menuitemcheckbox],
			['radio-checked-2-line', true, MenuItemRole.menuitemradio],
			['radio-unchecked-2-line', false, MenuItemRole.menuitemradio],
		])(
			'should set a %s icon when checked=%s and role is %s',
			async (expectedIcon, checked, role) => {
				element.role = role;
				element.checked = checked;
				await elementUpdated(element);

				const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
				expect(icon.name).toEqual(expectedIcon);
			}
		);

		it('should enable default of click event if role is presentation', async function () {
			const spy = jest.fn();
			element.addEventListener('click', spy);
			(element as any).role = MenuItemRole.presentation;
			await elementUpdated(element);
			element.click();
			const event = spy.mock.calls[0][0];
			expect(event?.defaultPrevented).toEqual(false);
		});

		it('should prevent default of click event if role is not presentation', async function () {
			const spy = jest.fn();
			element.addEventListener('click', spy);
			(element as any).role = MenuItemRole.menuitem;
			await elementUpdated(element);
			element.click();
			const event = spy.mock.calls[0][0];
			expect(event?.defaultPrevented).toEqual(true);
		});
	});

	describe('check-trailing', () => {
		it('should set trailing class if role=checkbox', async function () {
			element.checkTrailing = true;
			element.role = MenuItemRole.menuitemcheckbox;
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('trailing')
			).toBeTruthy();
		});
	});

	describe('check-appearance', () => {
		it.each([
			['check-line', true, MenuItemRole.menuitemcheckbox],
			['', false, MenuItemRole.menuitemcheckbox],
			['check-line', true, MenuItemRole.menuitemradio],
			['', false, MenuItemRole.menuitemradio],
		])(
			'should set a "%s" icon when checked=%s and role is %s when check-appearance is tick-only',
			async function (expectedIcon, checked, role) {
				element.checkedAppearance = CheckAppearance.TickOnly;
				element.checked = checked;
				element.role = role;
				await elementUpdated(element);

				const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
				expect(icon.name).toBe(expectedIcon);
			}
		);
	});

	describe('text', () => {
		it('should reflect attribute', function () {
			const text = 'lorem';
			element.setAttribute('text', text);
			expect(element.text).toEqual(text);
		});

		it('should set text property to node', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const primaryTextSpan =
				element.shadowRoot?.querySelector('.text-primary');
			expect(primaryTextSpan?.textContent?.trim()).toEqual(text);
		});
	});

	describe('textSecondary', () => {
		it('should reflect attribute', function () {
			const secondaryText = 'lorem';
			element.setAttribute('text-secondary', secondaryText);
			expect(element.textSecondary).toEqual(secondaryText);
		});

		it('should set secondary text property to node', async () => {
			const secondaryText = 'lorem';
			element.textSecondary = secondaryText;
			await elementUpdated(element);

			const secondaryTextSpan =
				element.shadowRoot?.querySelector('.text-secondary');
			expect(secondaryTextSpan?.textContent?.trim()).toEqual(secondaryText);
		});

		it('should add two-lines text class to base when both texts exist', async () => {
			const base = getBaseElement(element);
			element.text = 'text';
			element.textSecondary = 'textSecondary';
			await elementUpdated(element);
			expect(base.classList.contains('two-lines')).toBeTruthy();
		});
	});

	describe('disabled', () => {
		it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
			element.disabled = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-disabled')).toEqual('true');
		});

		it('should set disabled class on the base element', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('disabled')
			).toBeTruthy();
		});
	});

	describe('expanded', () => {
		beforeEach(async function () {
			menuElement = (await fixture(
				`<${MENU_TAG} open>
					<${COMPONENT_TAG} id="menuitem" text="Menu item 1">
						<${MENU_TAG} slot="submenu">
							<${COMPONENT_TAG} text="Menu item 1.1"></${COMPONENT_TAG}>
						</${MENU_TAG}>
					</${COMPONENT_TAG}>
				</${MENU_TAG}>`
			)) as Menu;

			await elementUpdated(menuElement);
		});

		it('should toggle "expanded" on mouse over and mouse out', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;

			fireEvent(menuitem, new Event('mouseover'));
			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(true);

			fireEvent(menuitem, new Event('mouseout'));
			elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);
		});

		it('should keep expanded on mouseover when submenu already open', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;
			menuitem.expanded = true;

			fireEvent(menuitem, new Event('mouseover'));
			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(true);
		});

		it('should keep closed on mouseout when submenu already closed', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;
			menuitem.expanded = false;

			fireEvent(menuitem, new Event('mouseout'));
			elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);
		});
	});

	describe('checked', () => {
		it('should set an `aria-checked` attribute with the `checked` value when provided to a menuitemcheckbox', async () => {
			element.role = MenuItemRole.menuitemcheckbox;
			element.checked = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('true');
		});
		it('should NOT set an `aria-checked` attribute when checked is provided to a menuitem', async () => {
			element.role = MenuItemRole.menuitem;
			element.checked = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual(null);
		});
		it('should toggle the aria-checked attribute of checkbox item when clicked', async () => {
			element.role = MenuItemRole.menuitemcheckbox;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual(null);
			element.click();
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('true');
			element.click();
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('false');
		});
		it('should aria-checked attribute of radio item to true when clicked', async () => {
			element.role = MenuItemRole.menuitemradio;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual(null);
			element.click();
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('true');
			element.click();
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual('true');
		});
	});

	describe('change event', () => {
		it('should fire "change" on click', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);
			await elementUpdated(element);
			element.click();
			expect(spy).toHaveBeenCalled();
		});

		it('should fire "change" event on spacebar press', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);
			const event = new KeyboardEvent('keydown', {
				key: keySpace,
			} as KeyboardEventInit);
			element.dispatchEvent(event);
			expect(spy).toHaveBeenCalled();
		});

		it('should fire "change" event when enter is pressed', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);
			const event = new KeyboardEvent('keydown', {
				key: keyEnter,
			} as KeyboardEventInit);
			element.dispatchEvent(event);
			expect(spy).toHaveBeenCalled();
		});

		it('should fire "change" event when checked is changed', async () => {
			const spy = jest.fn();
			element.addEventListener('change', spy);
			element.checked = !element.checked;
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('expanded-change event', () => {
		it('should fire "expanded-change" event when submenu exists and expanded changes', function () {
			const spy = jest.fn();
			element.addEventListener('expanded-change', spy);
			element.submenu = document.createElement('div');
			element.expanded = !element.expanded;
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('slot', () => {
		it('should render meta slot', async function () {
			const metaSlotElement = element.shadowRoot?.querySelector(
				'.base slot[name="meta"]'
			);
			await elementUpdated(element);

			expect(metaSlotElement).toBeTruthy();
		});

		it('should render trailing-meta slot', async function () {
			const trailingMetaSlotElement = element.shadowRoot?.querySelector(
				'.base slot[name="trailing-meta"]'
			);
			await elementUpdated(element);

			expect(trailingMetaSlotElement).toBeTruthy();
		});

		it('should render submenu slot', async function () {
			const submenuSlotElement = element.shadowRoot?.querySelector(
				'slot[name="submenu"]'
			);
			await elementUpdated(element);

			expect(submenuSlotElement).toBeTruthy();
		});

		it('should add class .has-meta if slot is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('has-meta')
			).toBeTruthy();
		});
	});

	describe('keydown', () => {
		beforeEach(async function () {
			menuElement = (await fixture(
				`<${MENU_TAG} open>
					<${COMPONENT_TAG} id="menuitem" text="Menu item 1">
						<${MENU_TAG} slot="submenu">
							<${COMPONENT_TAG} text="Menu item 1.1"></${COMPONENT_TAG}>
							<${COMPONENT_TAG} text="Menu item 1.2"></${COMPONENT_TAG}>
							<${COMPONENT_TAG} text="Menu item 1.3"></${COMPONENT_TAG}>
						</${MENU_TAG}>
					</${COMPONENT_TAG}>
				</${MENU_TAG}>`
			)) as Menu;

			await elementUpdated(menuElement);
		});

		it('should expand first menuitem on ArrowRight and close on ArrowLeft', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;

			menuitem.focus();
			menuitem.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(true);

			menuitem.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);
		});

		it.each(['Enter', ' '])(
			'should expand first menuitem when "%s" is pressed',
			async (key) => {
				const menuitem = menuElement.querySelector('#menuitem') as MenuItem;

				menuitem.focus();
				menuitem.dispatchEvent(new KeyboardEvent('keydown', { key }));

				await elementUpdated(menuElement);
				expect(menuitem.expanded).toEqual(true);
			}
		);

		it('should keep closed on keydown if not expanded', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;

			menuitem.expanded = false;
			menuitem.focus();
			menuitem.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft' })
			);

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);

			menuitem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);
		});

		it('should keep closed on ArrowDown and ArrowUp', async () => {
			const menuitem = menuElement.querySelector('#menuitem') as MenuItem;

			menuitem.expanded = false;
			menuitem.focus();
			menuitem.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown' })
			);

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);

			menuitem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

			await elementUpdated(menuElement);
			expect(menuitem.expanded).toEqual(false);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			const container = await fixture(
				`<div role="menu"><${COMPONENT_TAG}></${COMPONENT_TAG}></div>`
			);
			element = container.querySelector(COMPONENT_TAG) as MenuItem;
			element.text = 'Menu item';
			element.role = MenuItemRole.menuitem;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
