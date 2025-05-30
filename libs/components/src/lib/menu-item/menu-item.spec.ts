import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import '.';
import '../menu';
import { fireEvent } from '@testing-library/dom';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import { Connotation } from '@vonage/vivid';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import type { Mock } from 'vitest';
import type { Menu } from '../menu/menu';
import { MenuItem } from './menu-item';

const MENU_TAG = 'vwc-menu';
const COMPONENT_TAG = 'vwc-menu-item';
describe('vwc-menu-item', () => {
	let element: MenuItem;

	function pressKey(key: string) {
		element.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				cancelable: true,
			} as KeyboardEventInit)
		);
	}

	function addSubmenu() {
		element.innerHTML = `<${MENU_TAG} slot="submenu">
			<${COMPONENT_TAG} text="Menu item 1.1"></${COMPONENT_TAG}>
			<${COMPONENT_TAG} text="Menu item 1.2"></${COMPONENT_TAG}>
			<${COMPONENT_TAG} text="Menu item 1.3"></${COMPONENT_TAG}>
		</${MENU_TAG}>`;
	}

	beforeEach(async () => {
		const menu = fixture(
			`<${MENU_TAG}>
					<${COMPONENT_TAG}></${COMPONENT_TAG}>
			</${MENU_TAG}>`
		) as Menu;
		await elementUpdated(menu);
		element = menu.querySelector(COMPONENT_TAG) as MenuItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu-item', async () => {
			expect(element).toBeInstanceOf(MenuItem);
			expect(element.text).toEqual(undefined);
			expect(element.textSecondary).toEqual(undefined);
			expect(element.role).toEqual('menuitem');
			expect(element.controlType).toBe(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.checked).toBe(false);
			expect(element.disabled).toBeUndefined();
			expect(element.expanded).toBeUndefined();
			expect(element.connotation).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('icon', function () {
		it('should set a leading icon', async () => {
			const iconName = 'file-pdf-line';
			element.icon = iconName;
			await elementUpdated(element);

			const icon = element.shadowRoot!.querySelector('vwc-icon')!;
			expect(icon.name).toEqual(iconName);
		});
	});

	describe('role', () => {
		it('should set role to presentation when the menu item is not a direct descendant of a menu and role is menuitem', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as MenuItem;
			await elementUpdated(element);

			expect(element.role).toBe('presentation');
		});

		it('should retain role when the menu item is not a direct descendant of a menu and role is not menuitem', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} role="menuitemcheckbox"></${COMPONENT_TAG}>`
			)) as MenuItem;
			await elementUpdated(element);

			expect(element.role).toBe('menuitemcheckbox');
		});

		it('should set role to menuitem when the menu item is a direct descendant of a menu and role is presentation', async () => {
			const element = document.createElement('vwc-menu-item');
			element.role = 'presentation';
			const menu = fixture(`<${MENU_TAG}></${MENU_TAG}>`) as Menu;
			menu.appendChild(element);
			await elementUpdated(element);

			expect(element.role).toBe('menuitem');
		});

		it('should not prevent default of click events when the menu item is not a direct descendant of a menu', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as MenuItem;
			await elementUpdated(element);

			const spy = vi.fn();
			element.addEventListener('click', spy);
			element.click();
			const event = spy.mock.calls[0][0];
			expect(event.defaultPrevented).toBe(false);
		});

		it('should prevent default of click event if role is not presentation', async function () {
			const spy = vi.fn();
			element.addEventListener('click', spy);
			element.click();
			const event = spy.mock.calls[0][0];
			expect(event.defaultPrevented).toBe(true);
		});

		it('should set controlType to checkbox when role is menuitemcheckbox', async () => {
			element.role = 'menuitemcheckbox';

			expect(element.controlType).toBe('checkbox');
		});

		it('should set controlType to checkbox when role is checkbox', async () => {
			element.role = 'checkbox';

			expect(element.controlType).toBe('checkbox');
		});

		it('should set controlType to radio when role is menuitemradio', async () => {
			element.role = 'menuitemradio';

			expect(element.controlType).toBe('radio');
		});

		it('should set controlType to radio when role is radio', async () => {
			element.role = 'radio';

			expect(element.controlType).toBe('radio');
		});

		it('should unset controlType to radio when role is set to menuitem', async () => {
			element.role = 'menuitemcheckbox';
			element.role = 'menuitem';

			expect(element.controlType).toBe(undefined);
		});
	});

	describe('controlType', () => {
		it('should set trailing class if controlType=checkbox and icon is set', async function () {
			element.icon = 'file-pdf-line';
			element.controlType = 'checkbox';
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('trailing')).toBe(true);
		});

		it.each([
			['checkbox-checked-2-line', true, 'checkbox'],
			['checkbox-unchecked-2-line', false, 'checkbox'],
			['radio-checked-2-line', true, 'radio'],
			['radio-unchecked-2-line', false, 'radio'],
		] as const)(
			'should set a %s icon when checked=%s and controlType is %s',
			async (expectedIcon, checked, controlType) => {
				element.controlType = controlType;
				element.checked = checked;
				await elementUpdated(element);

				const icon = element.shadowRoot!.querySelector('vwc-icon')!;
				expect(icon.name).toEqual(expectedIcon);
			}
		);

		it('should set role to menuitemcheckbox when controlType is checkbox', async () => {
			element.controlType = 'checkbox';

			expect(element.role).toBe('menuitemcheckbox');
		});

		it('should set role to menuitemradio when controlType is radio', async () => {
			element.controlType = 'radio';

			expect(element.role).toBe('menuitemradio');
		});

		it('should set role to menuitem when controltype is unset', async () => {
			element.controlType = 'checkbox';
			element.controlType = undefined;

			expect(element.role).toBe('menuitem');
		});
	});

	describe('check-trailing', () => {
		it('should set trailing class if controlType=checkbox', async function () {
			element.checkTrailing = true;
			element.controlType = 'checkbox';
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('trailing')
			).toBeTruthy();
		});
	});

	describe('check-appearance', () => {
		it.each([
			['check-line', true, 'checkbox'],
			['', false, 'checkbox'],
			['check-line', true, 'radio'],
			['', false, 'radio'],
		] as const)(
			'should set a "%s" icon when checked=%s and controlType is %s when check-appearance is tick-only',
			async function (expectedIcon, checked, controlType) {
				element.checkedAppearance = 'tick-only';
				element.checked = checked;
				element.controlType = controlType;
				await elementUpdated(element);

				const icon = element.shadowRoot!.querySelector('vwc-icon')!;
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
			addSubmenu();
			await elementUpdated(element);
		});

		it('should toggle "expanded" on mouse over and mouse out', async () => {
			fireEvent(element, new Event('mouseover'));
			expect(element.expanded).toEqual(true);

			fireEvent(element, new Event('mouseout'));
			expect(element.expanded).toEqual(false);
		});

		it('should keep expanded on mouseover when submenu already open', async () => {
			element.expanded = true;

			fireEvent(element, new Event('mouseover'));
			expect(element.expanded).toEqual(true);
		});

		it('should keep closed on mouseout when submenu already closed', async () => {
			element.expanded = false;

			fireEvent(element, new Event('mouseout'));
			expect(element.expanded).toEqual(false);
		});

		it.each(['Enter', ' ', 'ArrowRight'])(
			'should expand on "%s"',
			async (key) => {
				pressKey(key);

				expect(element.expanded).toEqual(true);
			}
		);

		it('should collapse on ArrowLeft', async () => {
			element.expanded = true;

			pressKey(keyArrowLeft);

			expect(element.expanded).toEqual(false);
		});

		it.each(['ArrowLeft', 'ArrowDown', 'ArrowUp', 'Escape'])(
			'should remain closed on "%s"',
			async (key) => {
				pressKey(key);

				expect(element.expanded).toEqual(undefined);
			}
		);
	});

	describe('checked', () => {
		describe.each(['checkbox', 'radio'] as const)(
			"when controlType is '%s'",
			(controlType) => {
				beforeEach(async () => {
					element.controlType = controlType;
					await elementUpdated(element);
				});

				it('should set `aria-checked` to "false" when checked is false', async () => {
					element.checked = false;
					await elementUpdated(element);
					expect(element.getAttribute('aria-checked')).toEqual('false');
				});

				it('should set `aria-checked` to "true" when checked is true', async () => {
					element.checked = true;
					await elementUpdated(element);
					expect(element.getAttribute('aria-checked')).toEqual('true');
				});
			}
		);

		it('should NOT set `aria-checked` attribute when controlType is not set', async () => {
			element.checked = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-checked')).toEqual(null);
		});

		it('should toggle the checked value on click when controlType is checkbox', async () => {
			element.controlType = 'checkbox';
			element.click();
			expect(element.checked).toBe(true);

			element.click();
			expect(element.checked).toBe(false);
		});

		it('should set the checked value to true on click when controlType is radio', async () => {
			element.controlType = 'radio';
			element.click();
			expect(element.checked).toBe(true);

			element.click();
			expect(element.checked).toBe(true);
		});
	});

	describe('change event', () => {
		let changeSpy: Mock;
		beforeEach(async () => {
			changeSpy = vi.fn();
			element.addEventListener('change', changeSpy);
		});

		it('should fire "change" on click', async () => {
			element.click();

			expect(changeSpy).toHaveBeenCalled();
		});

		it('should not fire "change" event on click when disabled', async () => {
			element.disabled = true;

			element.click();

			expect(changeSpy).not.toHaveBeenCalled();
		});

		it('should fire "change" event on spacebar press', async () => {
			pressKey(keySpace);

			expect(changeSpy).toHaveBeenCalled();
		});

		it('should fire "change" event when enter is pressed', async () => {
			pressKey(keyEnter);

			expect(changeSpy).toHaveBeenCalled();
		});

		it('should fire "change" event when checked is changed', async () => {
			element.checked = !element.checked;

			expect(changeSpy).toHaveBeenCalled();
		});
	});

	describe('click event', () => {
		let clickSpy: Mock;
		beforeEach(async () => {
			clickSpy = vi.fn();
			element.addEventListener('click', clickSpy);
		});

		it('should emit a "click" event if space is pressed', async () => {
			pressKey(keySpace);

			expect(clickSpy).toHaveBeenCalled();
		});

		it('should not emit a "click" event on keydown if default is prevented', async () => {
			element.addEventListener('keydown', (e) => e.preventDefault(), {
				capture: true,
			});

			pressKey(keySpace);

			expect(clickSpy).not.toHaveBeenCalled();
		});

		it('should not emit a "click" event if space is pressed when disabled', async () => {
			element.disabled = true;

			pressKey(keySpace);

			expect(clickSpy).not.toHaveBeenCalled();
		});

		it('should emit a "click" event if arrow left is pressed while expanded', async () => {
			element.expanded = true;

			pressKey(keyArrowLeft);

			expect(clickSpy).toHaveBeenCalled();
		});

		it('should emit a "click" event if arrow right is pressed on submenu', async () => {
			addSubmenu();
			await elementUpdated(element);

			pressKey(keyArrowRight);

			expect(clickSpy).toHaveBeenCalled();
		});

		it('should not emit multiple "click" events when clicked on', async () => {
			element.click();

			expect(clickSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('expanded-change event', () => {
		it('should fire "expanded-change" event when submenu exists and expanded changes', async function () {
			const spy = vi.fn();
			element.addEventListener('expanded-change', spy);
			addSubmenu();
			await elementUpdated(element);

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

	describe('menu-item connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			const connotationClassExistsBeforeTheChange = getBaseElement(
				element
			)?.classList.contains(`connotation-${connotation}`);

			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = getBaseElement(
				element
			)?.classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeTheChange).toEqual(false);
			expect(connotationClassExistsAfterChange).toEqual(true);
		});
	});
});
