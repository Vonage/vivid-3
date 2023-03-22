import { elementUpdated, fixture } from '@vivid-nx/shared';
import '.';
import { FoundationElementRegistry, MenuItemRole } from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { fireEvent } from '@testing-library/dom';
import type { Icon } from '../icon/icon';
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

	it('should set text property to node', async () => {
		const text = 'lorem';
		element.text = text;
		await elementUpdated(element);

		const control = element.shadowRoot?.querySelector('.base');
		expect(control?.textContent?.trim())
			.toEqual(text);
	});

	it('should set secondary text property to node', async () => {
		const secondaryText = 'lorem';
		element.textSecondary = secondaryText;
		await elementUpdated(element);

		const control = element.shadowRoot?.querySelector('.base');
		expect(control?.textContent?.trim())
			.toEqual(secondaryText);
	});

	it('should set both text and secondary text properties to node', async () => {
		const text = 'lorem';
		const secondaryText = 'ipsum';

		element.text = text;
		element.textSecondary = secondaryText;

		await elementUpdated(element);

		const control = element.shadowRoot?.querySelector('.base');

		expect(control?.textContent?.trim().includes(text)).toEqual(true);
		expect(control?.textContent?.trim().includes(secondaryText)).toEqual(true);
	});

	it('should set a leading icon', async () => {
		const iconName = 'file-pdf-line';
		element.icon = iconName;
		await elementUpdated(element);

		const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
		expect(icon).toBeInstanceOf(HTMLElement);
		expect(icon.name).toEqual(iconName);
	});

	it('should toggle "expanded" on mouse over and mouse out', async () => {
		expect(element.expanded).toEqual(undefined);

		element.hasSubmenu = true;

		fireEvent(element, new MouseEvent('mouseover'));

		expect(element.expanded).toEqual(true);

		fireEvent(element, new MouseEvent('mouseout'));

		expect(element.expanded).toEqual(false);
	});

	it('should include a role of menuitem when `menuitem` role is provided', async () => {
		const role = MenuItemRole.menuitem;
		element.role = role;
		await elementUpdated(element);
		expect(element.getAttribute('role')).toEqual(role);
	});

	it('should include a role of `menuitemcheckbox` when `menuitemcheckbox` role is provided', async () => {
		const role = MenuItemRole.menuitemcheckbox;
		element.role = role;
		await elementUpdated(element);
		expect(element.getAttribute('role')).toEqual(role);
	});

	it('should include a role of `menuitemradio` when `menuitemradio` role is provided', async () => {
		const role = MenuItemRole.menuitemradio;
		element.role = role;
		await elementUpdated(element);
		expect(element.getAttribute('role')).toEqual(role);
	});

	it('should include a role of `menuitem` by default when no role is provided', async () => {
		await elementUpdated(element);
		expect(element.getAttribute('role')).toEqual(MenuItemRole.menuitem);
	});

	it('should set the `aria-disabled` attribute with the `disabled` value when provided', async () => {
		element.disabled = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-disabled')).toEqual('true');
	});

	it('should set an `aria-expanded` attribute with the `expanded` value when provided', async () => {
		element.expanded = true;
		await elementUpdated(element);
		expect(element.getAttribute('aria-expanded')).toEqual('true');
	});

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

	describe('events', () => {
		it('should fire an event on click', async () => {
			let wasClicked: boolean = false;
			element.addEventListener('change', e => {
				e.preventDefault();
				wasClicked = true;
			});
			await elementUpdated(element);
			element.click();
			expect(wasClicked).toEqual(true);
		});

		it('should fire an event when spacebar is invoked', async () => {
			let wasInvoked: boolean = false;
			const event = new KeyboardEvent('keydown', {
				key: keySpace,
			} as KeyboardEventInit);
			element.addEventListener('keydown', e => {
				e.preventDefault();
				wasInvoked = true;
			});
			await elementUpdated(element);
			element.dispatchEvent(event);
			expect(wasInvoked).toEqual(true);
		});

		it('should fire an event when enter is invoked', async () => {
			let wasInvoked: boolean = false;
			const event = new KeyboardEvent('keydown', {
				key: keyEnter,
			} as KeyboardEventInit);
			element.addEventListener('keydown', e => {
				e.preventDefault();
				wasInvoked = true;
			});
			await elementUpdated(element);
			element.dispatchEvent(event);
			expect(wasInvoked).toEqual(true);
		});
	});
});
