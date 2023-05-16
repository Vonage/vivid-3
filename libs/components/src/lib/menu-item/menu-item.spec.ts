import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import '.';
import { FoundationElementRegistry, MenuItemRole } from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { fireEvent } from '@testing-library/dom';
import { Icon } from '../icon/icon';
import { MenuItem } from './menu-item';
import { menuItemDefinition } from './definition';


const COMPONENT_TAG = 'vwc-menu-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-menu-item', () => {
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

			expect(getBaseElement(element).classList.contains('trailing')).toBeTruthy();
		});

		it('should display icon if role=checkbox and icon is set', async function () {
			const iconName = 'file-pdf-line';
			element.icon = iconName;
			element.role = MenuItemRole.menuitemcheckbox;
			element.checked = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(`[name="${iconName}"]`) as Icon;
			expect(icon).toBeInstanceOf(Icon);
		});

		it('should set a checkbox-checked-line icon when checked=true and role is checkbox', async () => {
			element.role = MenuItemRole.menuitemcheckbox;
			element.checked = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon.name).toEqual('checkbox-checked-line');
		});

		it('should set a checkbox-unchecked-line icon when checked=false and role is checkbox', async () => {
			element.role = MenuItemRole.menuitemcheckbox;
			element.checked = false;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon.name).toEqual('checkbox-unchecked-line');
		});

		it('should set a radio-checked-line icon when checked=true and role is radio', async () => {
			element.role = MenuItemRole.menuitemradio;
			element.checked = true;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon.name).toEqual('radio-checked-line');
		});

		it('should set a radio-unchecked-line icon when checked=false and role is radio', async () => {
			element.role = MenuItemRole.menuitemradio;
			element.checked = false;
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon.name).toEqual('radio-unchecked-line');
		});

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

			const primaryTextSpan = element.shadowRoot?.querySelector('.text-primary');
			expect(primaryTextSpan?.textContent?.trim())
				.toEqual(text);
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

			const secondaryTextSpan = element.shadowRoot?.querySelector('.text-secondary');
			expect(secondaryTextSpan?.textContent?.trim())
				.toEqual(secondaryText);
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
			expect(getBaseElement(element).classList.contains('disabled')).toBeTruthy();
		});
	});

	describe('expanded', () => {
		it('should toggle "expanded" on mouse over and mouse out', async () => {
			expect(element.expanded).toEqual(undefined);

			element.hasSubmenu = true;

			fireEvent(element, new MouseEvent('mouseover'));

			expect(element.expanded).toEqual(true);

			fireEvent(element, new MouseEvent('mouseout'));

			expect(element.expanded).toEqual(false);
		});

		it('should set an `aria-expanded` attribute with the `expanded` value when provided', async () => {
			element.expanded = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-expanded')).toEqual('true');
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

	describe('slot', ()=> {

		it('should render slot if role menuItem', async function () {
			element.role = MenuItemRole.menuitem;
			const metaSlotElement = element.shadowRoot?.querySelector('.base slot[name="meta"]');
			await elementUpdated(element);

			expect(metaSlotElement).toBeTruthy();
		});

		it.each([MenuItemRole.menuitemcheckbox, MenuItemRole.menuitemradio])
		('should remove slot if role is %s', async function (role: string) {
			element.setAttribute('role', role);
			await elementUpdated(element);
			const metaSlotElement = element.shadowRoot?.querySelector('.base slot[name="meta"]');
			console.log(element.role);
			expect(metaSlotElement).toBeNull();
		});

		it('should add class .has-meta if slot is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('has-meta')).toBeTruthy();

		});
	});
});
