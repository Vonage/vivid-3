import { axe, elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-select', () => {
	let originalScrollIntoView: any;

	let element: Select;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

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

	describe('option label', function () {
		it('should show the options\'s label instead of the text', async function () {
			const label = 'label';
			element.innerHTML = `
				<vwc-option label="${label}" value="1" text="Option 1"></vwc-option>
				<vwc-option value="2" text="Option 2"></vwc-option>
				<vwc-option value="3" text="Option 3"></vwc-option>
				`;
			await elementUpdated(element);

			expect(getControlElement(element).querySelector('.selected-value')?.textContent?.trim()).toEqual(label);
		});
	});

	describe('selectedIndex', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
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
			expect(element.selectedOptions).toEqual([element.querySelector('option:nth-child(3)')]);
		});
	});

	describe('label', function () {
		it('should set a select label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});

		it('should not set aria-label on host', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(element.getAttribute('aria-label'))
				.toEqual(null);
		});
	});

	describe('ariaLabel', () => {
		it('should reflect on the host', async function () {
			const ariaLabel = 'label';
			element.ariaLabel = ariaLabel;
			await elementUpdated(element);
			expect(element.getAttribute('aria-label'))
				.toEqual(ariaLabel);
		});
	});

	describe('icon', () => {
		it('should have a icon slot', async () => {
			expect(Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async function () {
			const icon = 'info';
			element.icon = icon;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector(ICON_SELECTOR)?.getAttribute('name')).toEqual(icon);
		});
	});

	describe('success text', () => {
		it('should add success class to base when successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('success')).toBeTruthy();
		});
	});

	describe('error text', () => {
		it('should add error class to base when errorText is set', async function () {
			element.errorText = 'error';
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('error')).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class for select when disabled is true', async () => {
			const disableClassExistsWithDisabledFalse = Boolean(element.shadowRoot?.querySelector('.control.disabled'));

			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			expect(disableClassExistsWithDisabledFalse).toBeFalsy();
			expect(element.shadowRoot?.querySelector('.control.disabled')).toBeTruthy();
		});
	});

	describe('multiple', () => {

		it('should set multiple attribute on the element', async () => {
			const multipleAttributeExistsWithMultipleFalse = element.hasAttribute('multiple');

			element.multiple = true;
			await elementUpdated(element);

			expect(multipleAttributeExistsWithMultipleFalse).toBeFalsy();
			expect(element.hasAttribute('multiple')).toBeTruthy();
		});

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
		it('should set open when clicked', async () => {
			const openStateBeforeClick = element.open;

			element.click();
			await elementUpdated(element);

			expect(openStateBeforeClick).toEqual(false);
			expect(element.open).toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'fieldset';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(control?.classList.contains(`appearance-${appearance}`))
				.toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(control?.classList.contains(`shape-${shape}`))
				.toBeTruthy();
		});
	});

	describe('validation', function () {
		function setValidityToError(errorMessage = 'error') {
			element.setValidity({ badInput: true }, errorMessage);
			element.validate();
		}

		function setToBlurred() {
			element.dispatchEvent(new Event('blur'));
		}

		it('should set error message to empty string when pristine', async function () {
			setValidityToError();
			await elementUpdated(element);
			expect(element.errorValidationMessage)
				.toEqual('');
		});

		it('should validate after a blur', async function () {
			const errorMessage = 'Error Text';
			element.dirtyValue = true;
			setValidityToError(errorMessage);
			setToBlurred();
			await elementUpdated(element);
			expect(element.errorValidationMessage).toEqual(errorMessage);
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
			element.dispatchEvent(new FocusEvent('focusout', { relatedTarget: element }));
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
				<option value="2" id="id2>2</option>
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
			expect(Boolean(element.shadowRoot?.querySelector('slot[name="meta"]'))).toEqual(true);
		});

		it('should add class .has-meta if the meta slot is occupied', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains('has-meta')).toBeTruthy();

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
			expect(element.shadowRoot?.querySelector('.popup')?.hasAttribute('strategy')).toBeFalsy();
		});

		it('should add strategy="absolute" when fixedDropdown is false', function () {
			expect(element.shadowRoot?.querySelector('.popup')?.getAttribute('strategy')).toEqual('absolute');
		});

		it('should set --_select-fixed-width to the width of the select on open', async function () {
			const width = 50;
			element.fixedDropdown = true;
			setBoundingClientRect(width);

			await toggleOpenState(true);

			const popup = element.shadowRoot?.querySelector('.popup') as HTMLElement;
			const variableValue = window.getComputedStyle(popup).getPropertyValue('--_select-fixed-width');
			expect(variableValue).toEqual(`${width}px`);
		});

		it('should round the width set to --_select-fixed-width', async function () {
			const width = 50.5;
			const expectedWidth = Math.round(width);
			element.fixedDropdown = true;
			setBoundingClientRect(width);
			await toggleOpenState(true);
			const popup = element.shadowRoot?.querySelector('.popup') as HTMLElement;
			const variableValue = window.getComputedStyle(popup).getPropertyValue('--_select-fixed-width');
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
			const variableValue = window.getComputedStyle(popup).getPropertyValue('--_select-fixed-width');
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
			expect(element.options[1]).toEqual(element.querySelector('option:nth-child(2)'));
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
			expect(element.selectedOptions[0]).toEqual(element.querySelector('option:nth-child(2)'));
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
			expect(getControlElement(element).querySelector('.selected-value')?.textContent?.trim()).toEqual('placeholder');

			element.selectedIndex = 2;
			await elementUpdated(element);
			expect(getControlElement(element).querySelector('.selected-value')?.textContent?.trim()).toEqual('3');
		});

		it('should display the value of the selected option and not the placeholder', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} placeholder="placeholder">
					<option value="1">1</option>
					<option value="2" selected>2</option>
					<option value="3">3</option>
				</${COMPONENT_TAG}>`
			)) as Select;

			await elementUpdated(element);
			expect(getControlElement(element).querySelector('.selected-value')?.textContent?.trim()).toEqual('2');
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.innerHTML = `
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			`;
			element.selectedIndex = 2;
			element.ariaLabel = 'Label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
