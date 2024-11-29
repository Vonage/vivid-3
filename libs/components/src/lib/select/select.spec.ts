import 'element-internals-polyfill';

import {
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { Size } from '../enums';
import { Select } from './select';
import '.';
import { ListboxOption } from '../option/option.ts';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyEscape,
	keyHome,
	keyTab,
} from '@microsoft/fast-web-utilities';

const COMPONENT_TAG = 'vwc-select';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-select', () => {
	let originalScrollIntoView: any;

	/**
	 * Get the "checked options", which are visually highlighted options in multi-select mode
	 */
	const getCheckedOptions = () =>
		Array.from(
			element.querySelectorAll('vwc-option[aria-checked="true"]')
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

	let element: Select;

	beforeAll(() => {
		originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
		HTMLElement.prototype.scrollIntoView = jest.fn();
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
				<vwc-option value="1" text="1"></vwc-option>
				<vwc-option value="2" text="2"></vwc-option>
				<vwc-option value="3" text="3"></vwc-option>
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
			expect(element.selectedOptions).toEqual([getOption('3')]);
		});

		it('should update value when selectedIndex is set', async () => {
			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(element.value).toEqual('3');
		});

		it('should choose the next selectable option when selecting a disabled option', async () => {
			getOption('2').disabled = true;
			element.selectedIndex = 1;
			expect(element.selectedIndex).toEqual(2);
		});

		it('should search for the next selectable option in reverse order when the new index ist smaller than the current one', async () => {
			getOption('2').disabled = true;
			element.selectedIndex = 2;
			element.selectedIndex = 1;
			expect(element.selectedIndex).toEqual(0);
		});

		it('should revert to the previous value if no selectable option can be found', async () => {
			getOption('3').disabled = true;
			element.selectedIndex = 1;
			element.selectedIndex = 2;
			expect(element.selectedIndex).toEqual(1);
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

		it('should set aria-label on host if aria-label unset', async function () {
			element.removeAttribute('aria-label');
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(element.getAttribute('aria-label')).toEqual(labelText);
		});

		it('should leave ariaLabel unchanged if aria-label already set', async () => {
			const ariaLabelText = 'aria-label';
			element.ariaLabel = ariaLabelText;
			const labelText = 'label';
			element.label = labelText;

			await elementUpdated(element);
			expect(element.getAttribute('aria-label')).toEqual(ariaLabelText);
		});
	});

	describe('ariaLabel', () => {
		it('should reflect on the host', async function () {
			const ariaLabel = 'label';
			element.ariaLabel = ariaLabel;
			await elementUpdated(element);
			expect(element.getAttribute('aria-label')).toEqual(ariaLabel);
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

			(element.querySelector('vwc-option') as HTMLElement).click();

			expect(element.open).toBe(true);
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
			(
				element.shadowRoot!.querySelector('.error-message') as HTMLElement
			).textContent!.trim();

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
			const spy = jest.fn();
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
			const spy = jest.fn();
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
			const spy = jest.fn();
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
			const inputSpy = jest.fn();
			const changeSpy = jest.fn();
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
			(MouseEvent as any).prototype.offsetX = 0;

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
			element.getBoundingClientRect = jest.fn().mockReturnValue({ width });
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
		beforeEach(async () => {
			element.innerHTML = `
			<option value="1">1</option>
			<option value="2" selected>2</option>
			<option value="3">3</option>
			`;
			await elementUpdated(element);
		});

		it('should recieve array of options', async () => {
			await elementUpdated(element);
			expect(element.options[1]).toEqual(
				element.querySelector('option:nth-child(2)')
			);
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
			expect(
				getControlElement(element)
					.querySelector('.selected-value')
					?.textContent?.trim()
			).toEqual('placeholder');
			expect(getControlElement(element).classList).toContain(
				'shows-placeholder'
			);
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
			const placeholderText = 'placeholder';
			const form = (await fixture(
				`<form><${COMPONENT_TAG} name="select" required placeholder="${placeholderText}">
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
			expect(
				element.shadowRoot?.querySelector('.selected-value .text')?.textContent
			).toBe(placeholderText);
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

		it('should select the first option when pressing home', async () => {
			element.selectedIndex = 1;

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyHome }));

			expect(element.selectedIndex).toBe(0);
		});

		it('should select the last option when pressing end', async () => {
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));

			expect(element.selectedIndex).toBe(2);
		});

		it('should select the next option when pressing ArrowDown', async () => {
			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowDown })
			);

			expect(element.selectedIndex).toBe(1);
		});

		it('should select the previous option when pressing ArrowUp', async () => {
			element.selectedIndex = 1;
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyArrowUp }));

			expect(element.selectedIndex).toBe(0);
		});

		describe('when closed', () => {
			it.each(['input', 'change'])(
				`should emit %s event when selecting an option with the keyboard`,
				async (eventName) => {
					const eventSpy = jest.fn();
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
					const eventSpy = jest.fn();
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
					const eventSpy = jest.fn();
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

		it('should make first option active when pressing Home', async () => {
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyHome }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('1'));
		});

		it('should check all options from the active to first when pressing Shift + Home', async () => {
			getOption('3').click();

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyHome, shiftKey: true })
			);
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([
				getOption('1'),
				getOption('2'),
				getOption('3'),
			]);
		});

		it('should make last option active when pressing End', async () => {
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyEnd }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('3'));
		});

		it('should check all options from active to last when pressing Shift + End', async () => {
			getOption('1').click();

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyEnd, shiftKey: true })
			);
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([
				getOption('1'),
				getOption('2'),
				getOption('3'),
			]);
		});

		it('should make the next option active when pressing ArrowDown', async () => {
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyHome }));
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowDown })
			);
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('2'));
		});

		it('should stay on the last option when pressing ArrowDown', async () => {
			getOption('3').click();

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowDown })
			);
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('3'));
		});

		it('should check the next option when pressing Shift + ArrowDown', async () => {
			getOption('1').click();

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowDown, shiftKey: true })
			);
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([getOption('1'), getOption('2')]);
		});

		it('should make the previous option active when pressing ArrowUp', async () => {
			getOption('3').click();

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyArrowUp }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('2'));
		});

		it('should stay on the first option when pressing ArrowUp', async () => {
			getOption('1').click();

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: keyArrowUp }));
			await elementUpdated(element);

			expect(getActiveOption()).toBe(getOption('1'));
		});

		it('should check the previous option when pressing Shift + ArrowUp', async () => {
			getOption('3').click();

			element.focus();
			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: keyArrowUp, shiftKey: true })
			);
			await elementUpdated(element);

			expect(getCheckedOptions()).toEqual([getOption('2'), getOption('3')]);
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
				const eventSpy = jest.fn();
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
				const eventSpy = jest.fn();
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
			getOption('1').scrollIntoView = jest.fn();

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

	describe('feedback messages', () => {
		it('should ignore events when triggered on feedback messages', async () => {
			element.helperText = 'helper text';
			await elementUpdated(element);

			element
				.shadowRoot!.querySelector('.helper-message')!
				.dispatchEvent(new Event('click', { bubbles: true, composed: true }));

			expect(element.open).toBe(false);
		});
	});

	describe('typeahead', () => {
		beforeEach(async () => {
			element = (await fixture(`<${COMPONENT_TAG}>
				<vwc-option value="1" text="Apple"></vwc-option>
				<vwc-option value="2" text="Ananas"></vwc-option>
				<vwc-option value="3" text="Nectarine"></vwc-option>
			</${COMPONENT_TAG}>`)) as Select;
		});

		it('should select the first option that starts with the typed character', async () => {
			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));

			expect(element.selectedIndex).toBe(2);
		});

		it('should select the first option that starts with multiple typed characters', async () => {
			element.focus();
			await elementUpdated(element);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(1);
		});

		it('should reset the typeahead after 5 seconds of no key presses', async () => {
			element.focus();
			await elementUpdated(element);

			jest.useFakeTimers();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

			jest.advanceTimersByTime(5000);
			jest.useRealTimers();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));

			expect(element.selectedIndex).toBe(2);
		});

		it('should make options active instead of selecting them when multiple is true', async () => {
			element.multiple = true;
			await elementUpdated(element);

			element.focus();
			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));
			await elementUpdated(element);

			expect(element.selectedIndex).toBe(0);
			expect(getActiveOption()?.value).toBe('3');
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

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			`;
			element.selectedIndex = 2;
			element.label = 'Label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
