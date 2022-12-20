import {
	createFormHTML,
	elementUpdated,
	fixture, getBaseElement,
	getControlElement,
	listenToFormSubmission
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {Shape} from '../enums';
import { NumberField } from './number-field';
import '.';
import { numberFieldDefinition } from './definition';

const COMPONENT_TAG_NAME = 'vwc-number-field';

/**
 * @param element
 */
function getRootElement(element: NumberField) {
	return element.shadowRoot?.querySelector('.base') as HTMLElement;
}

describe('vwc-number-field', () => {

	function setToBlurred() {
		element.dispatchEvent(new Event('blur'));
	}

	function setToFocused() {
		element.dispatchEvent(new Event('focus'));
	}

	/**
	 * @param errorMessage
	 */
	function setValidityToError(errorMessage = 'error') {
		element.setValidity({badInput: true}, errorMessage);
		element.validate();
	}

	let element: NumberField;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG_NAME}></${COMPONENT_TAG_NAME}>`
		)) as NumberField;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-number-field', async () => {
			expect(numberFieldDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(NumberField);
			expect(getControlElement(element).getAttribute('type')).toEqual('text');
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeTruthy();
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});
	});

	describe('readOnly', function () {
		it('should add class readonly to host', async function () {
			const readonlyClassWhenFalse = getRootElement(element)
				.classList
				.contains('readonly');
			element.readOnly = true;
			await elementUpdated(element);
			const readonlyClassWhenTrue = getRootElement(element)
				.classList
				.contains('readonly');
			expect(readonlyClassWhenFalse)
				.toEqual(false);
			expect(readonlyClassWhenTrue)
				.toEqual(true);
		});
	});

	describe('autofocus', function () {
		it('should set autofocus on the input element', async function () {
			element.autofocus = true;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.hasAttribute('autofocus'))
				.toEqual(true);
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {

			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute('placeholder'))
				.toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getRootElement(element)
				.classList
				.contains('placeholder'))
				.toEqual(true);
		});
	});

	describe('list', function () {
		const dataListID = 'dataListId';

		it('should set list attribute on the input', async function () {
			element.list = dataListID;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute('list'))
				.toEqual(dataListID);
		});
	});

	describe('step', function () {
		const value = '8';
		const propertyName = 'step';
		it('should set step attribute on the input', async function () {

			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getControlElement(element)
				?.getAttribute(propertyName))
				.toEqual(value);
		});
	});

	describe('max', function () {
		const value = 8;
		const propertyName = 'max';
		const proxyPropertyName = 'max';

		it('should set max attribute on the input', async function () {

			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getControlElement(element)
				?.getAttribute(propertyName))
				.toEqual(value.toString());
		});

		it('should set value to max if set to larger value', async function () {
			(element as any)[propertyName] = value;
			element.value = (value + 1).toString();
			await elementUpdated(element);
			const controlElement = getControlElement(element) as HTMLInputElement;
			expect(controlElement[proxyPropertyName])
				.toEqual(value.toString());
		});
	});

	describe('min', function () {
		const value = '2';
		const propertyName = 'min';
		const proxyPropertyName = 'min';

		it('should set min attribute on the input', async function () {

			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute(propertyName))
				.toEqual(value);
		});

		it('should set value to min if set to lower value', async function () {
			(element as any)[propertyName] = value;
			element.value = (Number(value) - 1).toString();
			await elementUpdated(element);
			const controlElement = getControlElement(element) as HTMLInputElement;
			expect(controlElement[proxyPropertyName])
				.toEqual(value);
		});
	});

	describe('form association', function () {
		let fieldValue: number,
			formId: string,
			fieldName: string,
			formWrapper: HTMLElement;

		beforeEach(function () {
			fieldValue = 5;
			fieldName = 'test-field';
			formId = 'test-form-id';
			formWrapper = document.createElement('div');
			document.body.appendChild(formWrapper);
		});

		afterEach(function () {
			formWrapper.remove();
		});

		it('should attach to closest form', async function () {
			const {form: formElement} = createFormHTML<NumberField>({
				componentTagName: COMPONENT_TAG_NAME,
				fieldName,
				fieldValue,
				formId,
				formWrapper
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(fieldValue.toString());
			});
		});

		it('should attach to form when given form id', async function () {
			const {otherForm} = createFormHTML<NumberField>(
				{
					fieldName, fieldValue, formId, otherFormId: 'otherFormId', componentTagName: COMPONENT_TAG_NAME, formWrapper
				});

			const submitPromise = listenToFormSubmission(otherForm);
			otherForm.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(fieldValue);
			});
		});

		it('should reset the value of the custom element to default on form reset', async function () {
			const {
				form: formElement,
				element
			} = createFormHTML<NumberField>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG_NAME,
				formWrapper
			});

			element.value = '5';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value)
				.toEqual(fieldValue.toString());
		});
	});

	describe('events', function () {
		it('should emit an input event', async function () {
			const inputPromise = new Promise(res => element.addEventListener('input', () => res(true)));
			const innerInput = element.shadowRoot?.querySelector('input') as HTMLInputElement;
			innerInput.dispatchEvent(new InputEvent('input', {
				bubbles: true,
				composed: true
			}));
			expect(await inputPromise)
				.toEqual(true);
		});

		it('should emit a change event', async function () {
			const inputPromise = new Promise(res => element.addEventListener('change', () => res(true)));
			const innerInput = element.shadowRoot?.querySelector('input') as HTMLInputElement;
			innerInput.dispatchEvent(new InputEvent('change', {
				bubbles: true,
				composed: true
			}));
			expect(await inputPromise)
				.toEqual(true);
		});
	});

	describe('helper text', function () {
		it('should render the helper text when attribute is set', async function () {
			const helperTextElementWithoutText = element.shadowRoot?.querySelector('.helper-message');
			const helperText = 'Helper Text';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(helperTextElementWithoutText)
				.toBeNull();
			expect(element.shadowRoot?.querySelector('.helper-message')
				?.textContent
				?.trim())
				.toEqual(helperText);
		});
	});

	describe('error message', function () {

		it('should add class error to base if not valid', async function () {
			element.dirtyValue = true;
			setToBlurred();
			setValidityToError('blah');
			await elementUpdated(element);

			expect(getRootElement(element)
				.classList
				.contains('error'))
				.toEqual(true);
		});

		it('should render the error message when not valid', async function () {
			const errorElementWithoutText = element.shadowRoot?.querySelector('.error-message');
			const errorMessage = 'Error Text';

			element.dirtyValue = true;
			setToBlurred();
			setValidityToError(errorMessage);
			await elementUpdated(element);

			expect(errorElementWithoutText)
				.toBeNull();
			expect(element.shadowRoot?.querySelector('.error-message')
				?.textContent
				?.trim())
				.toEqual(errorMessage);
		});

		it('should render the error message only after a blur', async function() {
			const errorMessage = 'Error Text';
			element.dirtyValue = true;
			setValidityToError(errorMessage);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.error-message')).toBeNull();
		});

		it('should replace helper text', async function () {
			element.helperText = 'helper text';
			element.dirtyValue = true;
			setToBlurred();
			setValidityToError();
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.helper-text'))
				.toBeNull();
		});

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
			expect(element.shadowRoot?.querySelector('.error-message')?.
				textContent?.trim()).toEqual(errorMessage);
		});

		it('should update error message when blurred', async function() {
			setToBlurred();
			const errorMessage = 'Error Text';
			const errorMessageTwo = 'Error Text 2';
			element.dirtyValue = true;
			setValidityToError(errorMessage);
			await elementUpdated(element);

			setValidityToError(errorMessageTwo);
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('.error-message')?.
				textContent?.trim()).toEqual(errorMessageTwo);
		});

		it('should change the error message only when already not valid', async function() {
			setToBlurred();
			setToFocused();
			const errorMessage = 'Error Text';
			element.dirtyValue = true;
			setValidityToError(errorMessage);
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('.error-message')).toBeNull();
		});
	});

	describe('successText', function () {
		it('should add class success to base if successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);

			expect(getBaseElement(element)
				.classList
				.contains('success'))
				.toEqual(true);
		});

		it('should not show helper text when success is shown', async function () {
			element.helperText = 'help';
			element.successText = 'success';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.helper-text'))
				.toBeNull();
		});

		it('should not show error message when success is shown', async function () {
			element.dirtyValue = true;
			setToBlurred();
			setValidityToError('blah');
			element.successText = 'success';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.error-message'))
				.toBeNull();
		});

		it('should show success message if set', async function() {
			element.successText = 'success';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.success-message')?.textContent?.trim()).toEqual('success');
		});
	});

	describe('disabled', function () {
		it('should set disabled class when attribute is set', async function () {
			const disabledClassWhenEnabled = getRootElement(element)
				.classList
				.contains('disabled');
			element.disabled = true;
			await elementUpdated(element);
			const disabledClassWhenDisabled = getRootElement(element)
				.classList
				.contains('disabled');
			expect(disabledClassWhenEnabled)
				.toEqual(false);
			expect(disabledClassWhenDisabled)
				.toEqual(true);
		});
	});

	describe('value', function () {
		it('should set \'has-value\' class when there is a value', async function () {
			const activeClassWhenEnabled = getRootElement(element)
				.classList
				.contains('has-value');
			element.value = '5';
			await elementUpdated(element);
			const activeClassWhenDisabled = getRootElement(element)
				.classList
				.contains('has-value');
			expect(activeClassWhenEnabled)
				.toEqual(false);
			expect(activeClassWhenDisabled)
				.toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'filled';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			expect(getRootElement(element)
				.classList
				.contains('appearance-filled'))
				.toEqual(true);
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(getRootElement(element)
				.classList
				.contains('shape-pill'))
				.toEqual(true);
		});
	});

	describe('autocomplete', function () {
		it('should set autocomplete on the internal input', async function () {
			const internalInput = element.shadowRoot?.querySelector('input') as HTMLElement;
			const autoCompleteDefault = internalInput.getAttribute('autocomplete');

			element.autoComplete = 'off';
			await elementUpdated(element);
			expect(autoCompleteDefault).toBeNull();
			expect(internalInput.getAttribute('autocomplete')).toEqual('off');

		});

		it('should reflect the name on the internal input', async function () {
			const internalInput = element.shadowRoot?.querySelector('input') as HTMLElement;
			element.name = 'off';
			await elementUpdated(element);
			expect(internalInput.getAttribute('name')).toEqual('off');
		});
	});

	describe('number buttons', function () {
		let addButton: HTMLButtonElement, subtractButton: HTMLButtonElement;

		beforeEach(function () {
			addButton = getRootElement(element).querySelector('#add') as HTMLButtonElement;
			subtractButton = getRootElement(element).querySelector('#subtract') as HTMLButtonElement;
		});

		it('should advance value by 1 as default', async function () {
			element.value = '10';
			addButton?.click();
			await elementUpdated(element);
			expect((getControlElement(element) as HTMLInputElement).value).toEqual('11');
		});

		it('should add by step when clicking the add button', async function() {
			element.value = '10';
			element.step = 5;
			addButton?.click();
			await elementUpdated(element);
			expect((getControlElement(element) as HTMLInputElement).value).toEqual('15');
		});

		it('should subtract by step when clicking the add button', async function() {
			element.value = '10';
			element.step = 5;
			subtractButton?.click();
			await elementUpdated(element);
			expect((getControlElement(element) as HTMLInputElement).value).toEqual('5');
		});

		it('should have pill shape when numberField is pilled', async function() {
			element.shape = Shape.Pill;
			await elementUpdated(element);
			expect(addButton.getAttribute('shape')).toEqual(Shape.Pill);
			expect(subtractButton.getAttribute('shape')).toEqual(Shape.Pill);
		});

		it('should set step as 1 when step is null', async function () {
			(element as any)['step'] = null;
			element.value = '8';
			await elementUpdated(element);
			addButton.click();
			expect(element.value)
				.toEqual('9');
		});

		it('should set inert in disabled and readonly', async function() {
			/**
			 *
			 */
			function isButtonsWrapperInert() {
				return addButton.parentElement?.hasAttribute('inert');
			}

			element.readOnly = true;
			await elementUpdated(element);
			const inertWhenReadOnly = isButtonsWrapperInert();

			element.readOnly = false;
			await elementUpdated(element);
			const inertWhenActive = isButtonsWrapperInert();

			element.disabled = true;
			await elementUpdated(element);
			const inertWhenDisabled = isButtonsWrapperInert();

			expect(inertWhenActive).toEqual(false);
			expect(inertWhenReadOnly).toEqual(true);
			expect(inertWhenDisabled).toEqual(true);
		});

		it('should set tabindex="-1" on the buttons', async function() {
			/**
			 *
			 */
			function isButtonsWrapperInert() {
				return addButton.getAttribute('tabindex') === '-1' &&
					subtractButton.getAttribute('tabindex') === '-1';
			}

			const inertWhenActive = isButtonsWrapperInert();

			element.readOnly = true;
			await elementUpdated(element);
			const inertWhenReadOnly = isButtonsWrapperInert();

			element.readOnly = false;
			element.disabled = true;
			await elementUpdated(element);
			const inertWhenDisabled = isButtonsWrapperInert();

			expect(inertWhenActive).toEqual(false);
			expect(inertWhenReadOnly).toEqual(true);
			expect(inertWhenDisabled).toEqual(true);
		});
	});

	describe('minlength and maxlength', function () {
		it('should revert to last valid length', async function() {
			element.maxlength = 5;
			element.minlength = 2;
			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('maxlength')).toEqual('5');
			expect(getControlElement(element).getAttribute('minlength')).toEqual('2');
		});
	});
});
