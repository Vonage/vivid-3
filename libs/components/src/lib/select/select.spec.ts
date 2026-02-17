import 'element-internals-polyfill';

import { elementUpdated, fixture, getControlElement } from '@repo/shared';
import {
	keyEnd,
	keyEscape,
	keyHome,
	keyTab,
} from '@microsoft/fast-web-utilities';
import { Size } from '../enums';
import { ListboxOption } from '../option/option';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-select', () => {
	let originalScrollIntoView: any;

	/**
	 * Get the "checked options", which are visually highlighted options in multi-select mode
	 */
	const getCheckedOptions = () =>
		Array.from(
			element.querySelectorAll('vwc-option[checked="true"]')
		) as ListboxOption[];

	/**
	 * Active option is the last checked option in multi-select mode
	 */
	const getActiveOption = () => {
		const checkedOptions = getCheckedOptions();
		if (checkedOptions.length === 0) {
			return null;
		} else if (checkedOptions.length === 1) {
			return checkedOptions[0];
		} else {
			// We do not know which one was last checked
			throw new Error('Unable to determine active option');
		}
	};

	const getOption = (value: string) =>
		element.querySelector(`vwc-option[value="${value}"]`) as ListboxOption;

	const getListbox = () => element.shadowRoot!.querySelector('.listbox')!;

	const getPlaceholder = () => {
		if (getControlElement(element).classList.contains('shows-placeholder')) {
			return (
				getControlElement(element)
					.querySelector('.selected-value')
					?.textContent?.trim() ?? null
			);
		}
		return null;
	};

	let element: Select;

	beforeAll(() => {
		originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
		HTMLElement.prototype.scrollIntoView = vi.fn();
	});

	afterAll(() => {
		HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Select;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-select', async () => {
			expect(element).toBeInstanceOf(Select);
			expect(element.open).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.shape).toEqual(undefined);
			expect(element.appearance).toEqual(undefined);
			expect(element.label).toEqual(undefined);
			expect(element.placeholder).toEqual(undefined);
			expect(element.multiple).toEqual(undefined);
			expect(element.selectedIndex).toEqual(-1);
			expect(element.icon).toEqual(undefined);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('scale', () => {
		function hasSizeClass(baseElement: HTMLElement) {
			return Array.from(baseElement.classList).some((className) => {
				return className.includes('size-');
			});
		}

		it('should reflect the property as an attribute', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(element.getAttribute('scale')).toBe(Size.Condensed);
		});

		it('should reflect the attribute as a property', async () => {
			element.setAttribute('scale', Size.Condensed);
			await elementUpdated(element);
			expect(element.scale).toBe(Size.Condensed);
		});

		it('should init without a size class on base element', async () => {
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});
		it('should set size class on base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains('size-condensed')
			).toBe(true);
		});

		it('should remove size class from base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			element.scale = undefined;
			await elementUpdated(element);
			expect(hasSizeClass(getControlElement(element))).toBe(false);
		});

		it('should reflect scale on slotted options', async () => {
			element.scale = Size.Condensed;
			element.innerHTML = `
				<vwc-option value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				`;
			await elementUpdated(element);
			const options = element.querySelectorAll('vwc-option');
			options.forEach((option) => {
				expect(option.getAttribute('scale')).toBe('condensed');
			});
		});
	});

	describe('option label', function () {
		it("should show the options's label instead of the text", async function () {
			const label = 'label';
			element.innerHTML = `
				<vwc-option label="${label}" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				`;
			await elementUpdated(element);

			expect(
				getControlElement(element)
					.querySelector('.selected-value')
					?.textContent?.trim()
			).toEqual(label);
		});
	});

	describe('selectedIndex', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<vwc-option value="0" text="0"></vwc-option>
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
				`;
			await elementUpdated(element);
		});

		it('should set selectedIndex to 0 when first option is selected', async () => {
			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(0);
		});

		it('should change selection when changed', async () => {
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.selectedOptions).toEqual([getOption('2')]);
		});

		it('should update value when selectedIndex is set', async () => {
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.value).toEqual('2');
		});

		it('should allow selecting a disabled option through selectedIndex', async () => {
			getOption('1').disabled = true;
			element.selectedIndex = 1;
			expect(element.selectedIndex).toEqual(1);
		});

		it('should set selectedIndex to -1 when selectedIndex is set to value out of range', async () => {
			element.selectedIndex = 100;
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should set selectedIndex to -1 when selectedIndex is set to a negative value', async () => {
			element.selectedIndex = -100;
			expect(element.selectedIndex).toEqual(-1);
		});
	});

	describe('label', function () {
		it('should set a select label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
		});

		it('should not set for attribute on label element when it is multiple version', async function () {
			element.multiple = true;
			element.label = 'label';
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.getAttribute('for')).toBeNull();
		});
	});

	describe('icon', () => {
		it('should have a icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async function () {
			const icon = 'info';
			element.icon = icon;
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector(ICON_SELECTOR)?.getAttribute('name')
			).toEqual(icon);
		});
	});

	describe('success text', () => {
		it('should add success class to base when successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains('success')
			).toBeTruthy();
		});
	});

	describe('error text', () => {
		it('should add error class to base when errorText is set', async function () {
			element.errorText = 'error';
			await elementUpdated(element);
			expect(
				getControlElement(element).classList.contains('error')
			).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class for select when disabled is true', async () => {
			const disableClassExistsWithDisabledFalse = Boolean(
				element.shadowRoot?.querySelector('.control.disabled')
			);

			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			expect(disableClassExistsWithDisabledFalse).toBeFalsy();
			expect(
				element.shadowRoot?.querySelector('.control.disabled')
			).toBeTruthy();
		});
	});

	describe('multiple', () => {
		it('should leave popup open when set', async function () {
			const popup = element.shadowRoot?.querySelector('.popup');

			element.multiple = true;
			element.open = true;
			await elementUpdated(element);
			expect(popup?.hasAttribute('open')).toBeTruthy();
		});

		it('should render options only', async () => {
			element.multiple = true;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.control')).toBeFalsy();
			expect(element.shadowRoot?.querySelector('.popup')).toBeTruthy();
		});

		it('should set aria-haspopup to false', async () => {
			element.multiple = true;
			await elementUpdated(element);
			expect(element.getAttribute('aria-haspopup')).toBe('false');
		});

		it('should reflect as aria-multiselectable on the listbox', async () => {
			element.multiple = true;
			await elementUpdated(element);
			expect(getListbox().getAttribute('aria-multiselectable')).toBe('true');
		});
	});

	describe('open', function () {
		it('should toggle open when clicked', async () => {
			const openStateBeforeClick = element.open;

			element.click();
			await elementUpdated(element);

			expect(openStateBeforeClick).toEqual(false);
			expect(element.open).toEqual(true);
		});

		it('should not toggle open when clicked while disabled', async () => {
			element.disabled = true;

			element.click();

			expect(element.open).toBe(false);
		});

		it('should not toggle open when clicking on a disabled option', async () => {
			element.innerHTML = `
				<vwc-option value="1" text="Option 1" disabled></vwc-option>
			`;
			element.open = true;
			await elementUpdated(element);

			element.querySelector('vwc-option')!.click();

			expect(element.open).toBe(true);
		});

		it('should reflect as aria-expanded', async () => {
			element.open = true;
			await elementUpdated(element);

			expect(element.getAttribute('aria-expanded')).toEqual('true');
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'fieldset';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(
				control?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(control?.classList.contains(`shape-${shape}`)).toBeTruthy();
		});
	});

	describe('validation', function () {
		function setValidityToError() {
			element.required = true;
			element.value = '';
		}

		const visibleErrorMessage = () =>
			element.querySelector('vwc-feedback-message')!.textContent!.trim();

		it('should hide error message when pristine', async function () {
			setValidityToError();
			await elementUpdated(element);

			expect(visibleErrorMessage()).toBe('');
		});

		it('should show error message after validity is checked', async function () {
			setValidityToError();

			element.checkValidity();
			await elementUpdated(element);

			expect(visibleErrorMessage()).toBe('Constraints not satisfied');
		});

		it('should initialize as valid if required constraint is met by defaulting to first value', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			expect(element.validity.valid).toBe(true);
		});
	});

	describe('focusout', function () {
		it('should leave popup closed if closed', async () => {
			element.open = false;
			element.dispatchEvent(new Event('focusout'));
			expect(element.open).toBeFalsy();
		});

		it('should close popup if open', async () => {
			element.open = true;
			element.dispatchEvent(new Event('focusout'));
			expect(element.open).toBeFalsy();
		});

		it('should emit input event when value changes', async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			`;
			const spy = vi.fn();
			element.addEventListener('input', spy);
			element.open = true;
			await elementUpdated(element);
			element.selectedIndex = 2;
			element.dispatchEvent(new Event('focusout'));
			expect(spy).toHaveBeenCalled();
		});

		it('should leave popup open if relatedTarget is same as element', async () => {
			element.open = true;
			element.dispatchEvent(
				new FocusEvent('focusout', { relatedTarget: element })
			);
			expect(element.open).toBeTruthy();
		});
	});

	describe('keydown', function () {
		it('should toggle selection if spacebar pressed in single selection mode', async () => {
			element.open = true;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
			const elementStatusAfterSpacebar = element.open;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

			expect(elementStatusAfterSpacebar).toBeFalsy();
			expect(element.open).toBeTruthy();
		});

		it('should toggle selection if spacebar pressed in single selection mode', async () => {
			element.open = true;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			const elementStatusAfterSpacebar = element.open;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

			expect(elementStatusAfterSpacebar).toBeFalsy();
			expect(element.open).toBeTruthy();
		});

		it('should close selection if escape key pressed', async () => {
			element.open = true;
			await elementUpdated(element);
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			expect(element.open).toBeFalsy();
		});

		it('should allow propgation on escape key if not open', async () => {
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);

			expect(spy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key if open', async () => {
			element.open = true;
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);

			element.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);

			expect(spy.mock.calls.length).toBe(0);
		});

		it('should close selection if tab key pressed', async () => {
			element.open = true;
			await elementUpdated(element);
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
			expect(element.open).toBeFalsy();
		});

		it('should emit input and change events if value changed', async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			`;
			const inputSpy = vi.fn();
			const changeSpy = vi.fn();
			element.addEventListener('input', inputSpy);
			element.addEventListener('change', changeSpy);
			element.open = true;
			await elementUpdated(element);

			element.selectedIndex = 2;
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

			expect(inputSpy).toHaveBeenCalled();
			expect(changeSpy).toHaveBeenCalled();
		});
	});

	describe('click', function () {
		it('should prevent focusin from firing before click event', async () => {
			element.innerHTML = `
				<option value="1" id="id1">1</option>
				<option value="2" id="id2">2</option>
				<option value="3">3</option>
			`;
			await elementUpdated(element);
			Object.defineProperty(MouseEvent.prototype, 'offsetX', {
				get() {
					return 0;
				},
			});

			element.dispatchEvent(new MouseEvent('mousedown'));
			const shouldSkipFocusAfterOneMouseDown = (element as any).shouldSkipFocus;
			element.dispatchEvent(new Event('focusin'));
			const shouldSkipFocusAfterFocusIn = (element as any).shouldSkipFocus;

			expect(shouldSkipFocusAfterOneMouseDown).toBeTruthy();
			expect(shouldSkipFocusAfterFocusIn).toBeFalsy();
		});
	});

	describe('slot', () => {
		it('should have a meta slot', async function () {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="meta"]'))
			).toEqual(true);
		});

		it('should add class .has-meta if the meta slot is occupied', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains('has-meta')
			).toBeTruthy();
		});
	});

	describe('fixed-dropdown', () => {
		function setBoundingClientRect(width: number) {
			element.getBoundingClientRect = vi.fn().mockReturnValue({ width });
		}

		async function toggleOpenState(open = true) {
			element.open = open;
			await elementUpdated(element);
		}

		it('should reflect fixed-dropdown attribute to property', async function () {
			element.toggleAttribute('fixed-dropdown', true);
			await elementUpdated(element);
			expect(element.fixedDropdown).toBe(true);
		});

		it('should remove strategy attribute from popup', async function () {
			element.fixedDropdown = true;
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.popup')?.hasAttribute('strategy')
			).toBeFalsy();
		});

		it('should add strategy="absolute" when fixedDropdown is false', function () {
			expect(
				element.shadowRoot?.querySelector('.popup')?.getAttribute('strategy')
			).toEqual('absolute');
		});

		it('should set --_select-fixed-width to the width of the select on open', async function () {
			const width = 50;
			element.fixedDropdown = true;
			setBoundingClientRect(width);

			await toggleOpenState(true);

			const popup = element.shadowRoot?.querySelector('.popup') as HTMLElement;
			const variableValue = window
				.getComputedStyle(popup)
				.getPropertyValue('--_select-fixed-width');
			expect(variableValue).toEqual(`${width}px`);
		});

		it('should round the width set to --_select-fixed-width', async function () {
			const width = 50.5;
			const expectedWidth = Math.round(width);
			element.fixedDropdown = true;
			setBoundingClientRect(width);
			await toggleOpenState(true);
			const popup = element.shadowRoot?.querySelector('.popup') as HTMLElement;
			const variableValue = window
				.getComputedStyle(popup)
				.getPropertyValue('--_select-fixed-width');
			expect(variableValue).toEqual(`${expectedWidth}px`);
		});

		it('should update the width on each opening', async function () {
			const width = 50;
			element.fixedDropdown = true;

			setBoundingClientRect(30);
			await toggleOpenState(true);

			setBoundingClientRect(width);
			await toggleOpenState(false);
			await toggleOpenState(true);

			const popup = element.shadowRoot?.querySelector('.popup') as HTMLElement;
			const variableValue = window
				.getComputedStyle(popup)
				.getPropertyValue('--_select-fixed-width');
			expect(variableValue).toEqual(`${width}px`);
		});
	});

	describe('options', () => {
		it('should return the option elements', async () => {
			element.innerHTML = `
			<option id="option"></option>
			<vwc-option id="listbox-option"></vwc-option>
			<div id="role" role="option"></div>
			<span id="other"></span>
			`;
			await elementUpdated(element);

			expect(element.options).toEqual([
				element.querySelector('#option'),
				element.querySelector('#listbox-option'),
				element.querySelector('#role'),
			]);
		});
	});

	describe('selectedOptions', () => {
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of selectedOptions', async () => {
			await elementUpdated(element);
			expect(element.selectedOptions[0]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
		});
	});

	describe('placeholder', function () {
		it('should set selectedindex -1 when placeholder is set', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			await elementUpdated(element);
			expect(element.selectedIndex).toEqual(-1);
		});

		it('should change selectedindex -1 when option selected', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			await elementUpdated(element);

			expect(element.selectedIndex).toEqual(1);
		});

		it('should display the placeholder when no option selected', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			await elementUpdated(element);
			expect(getPlaceholder()).toBe('placeholder');
		});

		it('should display a selected option instead of the placeholder', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			await elementUpdated(element);
			expect(
				getControlElement(element)
					.querySelector('.selected-value')
					?.textContent?.trim()
			).toEqual('2');
			expect(getControlElement(element).classList).not.toContain(
				'shows-placeholder'
			);
		});

		it('should display the placeholder when the value is changed to a non-option and no valid options are available', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
				</${COMPONENT_TAG}>`
			)) as Select;
			element.value = '1';
			await elementUpdated(element);

			element.querySelector('option')!.disabled = true;
			element.value = '';
			await elementUpdated(element);

			expect(getPlaceholder()).toBe('placeholder');
		});

		it('should be invalid if required and no value selected', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} required placeholder="placeholder">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			expect(element.validity.valid).toBe(false);
		});

		it('should display placeholder if form resets and placeholder exists', async () => {
			const form = (await fixture(
				`<form><${COMPONENT_TAG} name="select" required placeholder="placeholder">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}></form>`
			)) as HTMLFormElement;
			element = form.children[0] as Select;
			element.selectedIndex = 1;
			await elementUpdated(element);

			form.reset();
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(-1);
			expect(getPlaceholder()).toBe('placeholder');
		});
	});

	describe('value', function () {
		it("should change when the selected option's value changes", async () => {
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
			`;
			await elementUpdated(element);

			getOption('1').value = 'changed';

			expect(element.value).toBe('changed');
		});

		it('should select an option when selected is set on it', async () => {
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
			`;
			await elementUpdated(element);

			getOption('2').selected = true;

			expect(element.value).toBe('2');
		});

		it('should reject invalid values', async () => {
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
			`;
			await elementUpdated(element);

			element.value = '3';

			expect(element.value).toBe('');
		});
	});

	describe('default value', () => {
		it('should use the first defaultSelected option as initial value', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			expect(element.value).toBe('2');
		});

		it('should use the first non-disabled option as initial value when no option is defaultSelected', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<option value="1" disabled>1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			expect(element.value).toBe('2');
		});

		it('should have an empty value when there are no non-disabled options', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<option value="1" disabled>1</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			expect(element.value).toBe('');
		});

		it('should set update value when new defaultSelected option is added', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<option value="1">1</option>
				</${COMPONENT_TAG}>`
			)) as Select;
			await elementUpdated(element);

			const option = document.createElement('option');
			option.value = '2';
			option.textContent = '2';
			option.setAttribute('selected', '');
			element.appendChild(option);
			await elementUpdated(element);

			expect(element.value).toBe('2');
		});

		it('should not update its value when a new non-defaultSelected option is added', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<option value="1">1</option>
					<option value="2">2</option>
				</${COMPONENT_TAG}>`
			)) as Select;
			element.value = '2';
			await elementUpdated(element);

			const option = document.createElement('option');
			option.value = '3';
			option.textContent = '3';
			element.appendChild(option);
			await elementUpdated(element);

			expect(element.value).toBe('2');
		});
	});

	describe('single select mode', () => {
		beforeEach(() => {
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
		});

		it('should ignore key presses when disabled', async () => {
			element.disabled = true;

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));

			expect(element.selectedIndex).toBe(0);
		});

		describe('when closed', () => {
			it.each(['input', 'change'])(
				`should emit %s event when selecting an option with the keyboard`,
				async (eventName) => {
					const eventSpy = vi.fn();
					element.addEventListener(eventName, eventSpy);

					element.focus();
					element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));

					expect(eventSpy).toHaveBeenCalledTimes(1);
				}
			);
		});

		describe('when open', () => {
			beforeEach(async () => {
				element.open = true;
				await elementUpdated(element);
			});

			it.each(['input', 'change'])(
				`should emit %s event only once the select closes`,
				async (eventName) => {
					const eventSpy = vi.fn();
					element.addEventListener(eventName, eventSpy);

					element.focus();
					element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));

					expect(eventSpy).toHaveBeenCalledTimes(0);

					element.open = false;

					expect(eventSpy).toHaveBeenCalledTimes(1);
				}
			);

			it(`should select an option by clicking on it`, async () => {
				getOption('3').click();

				expect(element.value).toBe('3');
			});

			it(`should close after selecting an option by clicking on it`, async () => {
				getOption('3').click();

				expect(element.open).toBe(false);
			});

			it.each(['input', 'change'])(
				`should emit %s event when selecting an option by clicking on it`,
				async (eventName) => {
					const eventSpy = vi.fn();
					element.addEventListener(eventName, eventSpy);

					getOption('3').click();

					expect(eventSpy).toHaveBeenCalledTimes(1);
				}
			);
		});
	});

	describe('multiple select mode', () => {
		beforeEach(async () => {
			element.multiple = true;
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
			await elementUpdated(element);
		});

		it('should initially not have an active option', () => {
			expect(getActiveOption()).toBeNull();
		});

		it('should make an option active when clicking on it', async () => {
			getOption('1').click();
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('1'));
		});

		it('should toggle the selected state of the active option when pressing space', async () => {
			getOption('1').click();
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

			expect(element.selectedOptions).toEqual([]);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

			expect(element.selectedOptions).toEqual([getOption('1')]);
		});

		it.each(['input', 'change'])(
			'should emit %s event when toggling an option with the keyboard',
			async (eventName) => {
				const eventSpy = vi.fn();
				element.addEventListener(eventName, eventSpy);

				element.focus();
				element.dispatchEvent(new KeyboardEvent('keydown', { key: keyHome }));

				element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
				await elementUpdated(element);

				expect(eventSpy).toHaveBeenCalledTimes(1);
			}
		);

		it('should toggle the selected state of an option when clicking on it', () => {
			getOption('1').click();
			expect(element.selectedOptions).toEqual([getOption('1')]);

			getOption('1').click();
			expect(element.selectedOptions).toEqual([]);
		});

		it.each(['input', 'change'])(
			'should emit %s event when toggling an option by clicking',
			(eventName) => {
				const eventSpy = vi.fn();
				element.addEventListener(eventName, eventSpy);

				getOption('1').click();

				expect(eventSpy).toHaveBeenCalledTimes(1);
			}
		);

		it('should uncheck all options on blur', async () => {
			getOption('1').click();
			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyEnd, shiftKey: true })
			);
			await elementUpdated(element);

			element.blur();
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([]);
		});

		it('should uncheck all options when multiple is changed to false', async () => {
			getOption('1').click();
			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyEnd, shiftKey: true })
			);
			await elementUpdated(element);

			element.multiple = false;
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([]);
		});

		it('should uncheck all options when multiple is changed to true', async () => {
			element.multiple = false;
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2" selected></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
			await elementUpdated(element);

			element.multiple = true;
			await elementUpdated(element);

			expect(getOption('1').checked).toBe(false);
			expect(getOption('2').checked).toBe(false);
			expect(getOption('3').checked).toBe(false);
		});

		it('should uncheck all options except the active one when pressing Escape', async () => {
			getOption('1').click();
			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyEnd, shiftKey: true })
			);
			await elementUpdated(element);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEscape }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('3'));
		});

		it('should ignore key presses when disabled', async () => {
			element.disabled = true;
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyHome }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(null);
		});

		it('should scroll the active option into view when pressing Tab', async () => {
			getOption('1').click();
			element.focus();
			await elementUpdated(element);
			getOption('1').scrollIntoView = vi.fn();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyTab }));
			await elementUpdated(element);

			expect(getOption('1').scrollIntoView).toHaveBeenCalledTimes(1);
		});

		it('should prevent focus when clicking on the scrollbar', () => {
			Object.defineProperty(
				element.shadowRoot!.querySelector('.listbox'),
				'scrollWidth',
				{
					get: () => 100,
				}
			);
			const mousedown = new MouseEvent('mousedown', { cancelable: true });
			Object.defineProperty(mousedown, 'offsetX', { value: 101 });

			element.dispatchEvent(mousedown);

			expect(mousedown.defaultPrevented).toBe(true);
		});
	});

	describe('clearable', () => {
		const getClearButton = () =>
			element.shadowRoot!.querySelector('.clear-button') as HTMLButtonElement;

		it('should not render a clear button by default', async () => {
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);
			expect(getClearButton()).toBeNull();
		});

		it('should render a clear button when clearable is true and a value is selected', async () => {
			element.clearable = true;
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);
			expect(getClearButton()).not.toBeNull();
		});

		it('should render a clear button in multiple mode when clearable is true and options are selected', async () => {
			element.multiple = true;
			element.clearable = true;
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);
			expect(getClearButton()).not.toBeNull();
		});

		it('should not render a clear button when value is empty', async () => {
			element.clearable = true;
			await elementUpdated(element);
			expect(getClearButton()).toBeNull();
		});

		it('should clear the selection when clicking the clear button', async () => {
			element.clearable = true;
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);

			getClearButton().click();
			await elementUpdated(element);

			expect(element.value).toBe('');
			expect(element.selectedIndex).toBe(-1);
		});

		it('should clear the selection when clicking the clear button in multiple mode', async () => {
			element.multiple = true;
			element.clearable = true;
			element.innerHTML = `
				<vwc-option value="1" text="1" selected></vwc-option>
				<vwc-option value="2" text="2" selected></vwc-option>
			`;
			await elementUpdated(element);

			getClearButton().click();
			await elementUpdated(element);

			expect(element.selectedOptions.length).toBe(0);
		});

		it('should stop propagation when clicking the clear button to prevent opening the dropdown', async () => {
			element.clearable = true;
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);

			const button = getClearButton();
			const clickEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			});
			const spy = vi.spyOn(clickEvent, 'stopPropagation');

			button.dispatchEvent(clickEvent);

			expect(spy).toHaveBeenCalled();
			expect(element.open).toBeFalsy();
		});

		it('should prevent default on mousedown of the clear button', async () => {
			element.clearable = true;
			element.innerHTML = `<vwc-option value="1" text="1" selected></vwc-option>`;
			await elementUpdated(element);

			const button = getClearButton();
			const mousedownEvent = new MouseEvent('mousedown', {
				bubbles: true,
				cancelable: true,
			});
			const preventDefaultSpy = vi.spyOn(mousedownEvent, 'preventDefault');

			button.dispatchEvent(mousedownEvent);

			expect(preventDefaultSpy).toHaveBeenCalled();
		});

		it('should reset activeIndex and stop propagation when focusing the clear button in multiple mode', async () => {
			element.multiple = true;
			element.clearable = true;
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2" selected></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
			await elementUpdated(element);

			(element as any).activeIndex = 0;

			const button = getClearButton();
			const event = new FocusEvent('focusin', {
				bubbles: true,
				cancelable: true,
			});
			const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

			button.dispatchEvent(event);

			expect(stopPropagationSpy).toHaveBeenCalled();
			expect((element as any).activeIndex).toBe(-1);
		});

		it('should stop keydown propagation on the clear button to prevent keyboard navigation in multiple mode', async () => {
			element.multiple = true;
			element.clearable = true;
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2" selected></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
			await elementUpdated(element);

			const button = getClearButton();
			const event = new KeyboardEvent('keydown', {
				key: 'ArrowDown',
				bubbles: true,
				cancelable: true,
			});
			const spy = vi.spyOn(event, 'stopPropagation');

			button.dispatchEvent(event);

			expect(spy).toHaveBeenCalled();
		});

		it('should toggle aria-hidden on the clear button based on focus', async () => {
			element.clearable = true;
			element.innerHTML = `
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2" selected></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
			`;
			await elementUpdated(element);

			const button = getClearButton();
			expect(button.ariaHidden).toBe('true');

			button.dispatchEvent(new FocusEvent('focusin'));
			await elementUpdated(element);
			expect(button.ariaHidden).toBe('false');

			button.dispatchEvent(new FocusEvent('focusout'));
			await elementUpdated(element);
			expect(button.ariaHidden).toBe('true');
		});
	});

	describe('feedback messages', () => {
		it('should ignore events when triggered on feedback messages', async () => {
			element.helperText = 'helper text';
			await elementUpdated(element);

			(
				element
					.querySelector('vwc-feedback-message')!
					.shadowRoot!.querySelector(`.${'helper'}-message`) as HTMLElement
			).dispatchEvent(new Event('click', { bubbles: true, composed: true }));

			expect(element.open).toBe(false);
		});
	});

	it('should not add non-option children to the proxy options', async () => {
		element.innerHTML = `
			<vwc-option value="1" text="1"></vwc-option>
			<option value="1">1</option>
			<div role="option">Div option</div>
		`;
		await elementUpdated(element);

		expect(element.proxy.options.length).toBe(2);
	});

	describe('a11y attributes', () => {
		it('should set aria-controls to the id of listbox', () => {
			const uniqueListboxId = getListbox().id;
			expect(uniqueListboxId).toBeTruthy();
			expect(element.getAttribute('aria-controls')).toBe(uniqueListboxId);
		});

		it('should set aria-labelledby on the listbox of multiple version', async () => {
			element.multiple = true;
			element.label = 'label';
			await elementUpdated(element);
			const listbox = getListbox();
			expect(listbox.getAttribute('aria-labelledby')).toBe('label');
		});

		it('should default ariaLabel to label', async function () {
			element.label = 'label';
			await elementUpdated(element);

			expect(element.ariaLabel).toBe('label');
		});

		it('should not override a provided ariaLabel with label', async function () {
			element.ariaLabel = 'ariaLabel';
			element.label = 'label';
			await elementUpdated(element);

			expect(element.ariaLabel).toBe('ariaLabel');
		});

		it('should set aria-label on the listbox of multiple version when label is not present', async () => {
			element.multiple = true;
			element.ariaLabel = 'label';
			await elementUpdated(element);
			const listbox = getListbox();
			expect(listbox.getAttribute('aria-labelledby')).toBeNull();
			expect(listbox.getAttribute('aria-label')).toBe('label');
		});
	});
});
