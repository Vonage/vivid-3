import 'element-internals-polyfill';

import {
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
	listenToFormSubmission,
} from '@repo/shared';
import { Shape, Size } from '../enums';
import { setLocale } from '../../shared/localization';
import enUS from '../../locales/en-US';
import deDE from '../../locales/de-DE';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import {
	itShouldDisplayErrorTextFeedback,
	itShouldDisplayHelperTextFeedback,
	itShouldDisplaySuccessTextFeedback,
	itShouldDisplayValidationErrorFeedback,
} from '../../shared/feedback/should-display-feedback.spec';
import { NumberField } from './number-field';
import '.';

const COMPONENT_TAG = 'vwc-number-field';

describe('vwc-number-field', () => {
	function setToBlurred() {
		element.dispatchEvent(new Event('blur'));
	}

	let element: NumberField;
	let control: HTMLInputElement;

	function typeInput(input: string) {
		control.value = input;
		control.dispatchEvent(new Event('input'));
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NumberField;
		control = getControlElement(element) as HTMLInputElement;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-number-field', async () => {
			expect(element).toBeInstanceOf(NumberField);
			expect(control.getAttribute('type')).toEqual('text');
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
			expect(hasSizeClass(getBaseElement(element))).toBe(false);
		});
		it('should set size class on base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('size-condensed')).toBe(
				true
			);
		});

		it('should remove size class from base element', async () => {
			element.scale = Size.Condensed;
			await elementUpdated(element);
			element.scale = undefined;
			await elementUpdated(element);
			expect(hasSizeClass(getBaseElement(element))).toBe(false);
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeTruthy();
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
		});
	});

	describe('readOnly', function () {
		it('should add class readonly to host', async function () {
			const readonlyClassWhenFalse =
				getBaseElement(element).classList.contains('readonly');
			element.readOnly = true;
			await elementUpdated(element);
			const readonlyClassWhenTrue =
				getBaseElement(element).classList.contains('readonly');
			expect(readonlyClassWhenFalse).toEqual(false);
			expect(readonlyClassWhenTrue).toEqual(true);
		});
	});

	describe('autofocus', function () {
		it('should set autofocus on the input element', async function () {
			element.autofocus = true;
			await elementUpdated(element);
			expect(control.hasAttribute('autofocus')).toEqual(true);
		});

		it('should focus itself when connected if set', async function () {
			element.focus = vi.fn();
			element.autofocus = true;
			await elementUpdated(element);
			element.remove();

			document.body.appendChild(element);
			await elementUpdated(element);

			expect(element.focus).toHaveBeenCalled();
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(control.getAttribute('placeholder')).toEqual(placeholderText);
		});

		it('should set class placeholder to root', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('placeholder')).toEqual(
				true
			);
		});
	});

	describe('list', function () {
		const dataListID = 'dataListId';

		it('should set list attribute on the input', async function () {
			element.list = dataListID;
			await elementUpdated(element);
			expect(control.getAttribute('list')).toEqual(dataListID);
		});
	});

	describe('step', function () {
		it("should set proxy's step to empty if invalid value", function () {
			element.setAttribute('step', 'invalid');
			expect(element.proxy.step).toEqual('');
		});
	});

	describe('max', function () {
		it('should limit max to min value', async function () {
			element.min = 5;
			element.max = 0;
			await elementUpdated(element);
			expect(element.min).toEqual(5);
		});
	});

	describe('min', function () {
		it('should limit min to max value', async function () {
			element.max = 5;
			element.min = 10;
			await elementUpdated(element);
			expect(element.min).toEqual(5);
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
			const { form: formElement } = createFormHTML<NumberField>({
				componentTagName: COMPONENT_TAG,
				fieldName,
				fieldValue,
				formId,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue.toString());
			});
		});

		it('should attach to form when given form id', async function () {
			const { otherForm } = createFormHTML<NumberField>({
				fieldName,
				fieldValue,
				formId,
				otherFormId: 'otherFormId',
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(otherForm);
			otherForm.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should reset the value of the custom element to default on form reset', async function () {
			const { form: formElement, element } = createFormHTML<NumberField>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			element.value = '5';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue.toString());
		});
	});

	describe('events', function () {
		it('should emit an input event', async function () {
			const inputPromise = new Promise((res) =>
				element.addEventListener('input', () => res(true))
			);
			control.dispatchEvent(
				new InputEvent('input', {
					bubbles: true,
					composed: true,
				})
			);
			expect(await inputPromise).toEqual(true);
		});

		it('should emit a change event', async function () {
			const inputPromise = new Promise((res) =>
				element.addEventListener('change', () => res(true))
			);
			control.dispatchEvent(
				new InputEvent('change', {
					bubbles: true,
					composed: true,
				})
			);
			expect(await inputPromise).toEqual(true);
		});
	});

	describe('error message', function () {
		it('should add class error to base if not valid and blurred', async function () {
			element.max = 6;
			element.valueAsNumber = 7;
			setToBlurred();
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('error')).toEqual(true);
		});
	});

	describe('successText', function () {
		it('should add class success to base if successText is set', async function () {
			element.successText = 'success';
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('success')).toEqual(
				true
			);
		});
	});

	describe('disabled', function () {
		it('should set disabled class when attribute is set', async function () {
			const disabledClassWhenEnabled =
				getBaseElement(element).classList.contains('disabled');
			element.disabled = true;
			await elementUpdated(element);
			const disabledClassWhenDisabled =
				getBaseElement(element).classList.contains('disabled');
			expect(disabledClassWhenEnabled).toEqual(false);
			expect(disabledClassWhenDisabled).toEqual(true);
		});
	});

	describe('input field', function () {
		it('should filter out any invalid characters', async function () {
			typeInput('a1,b2.c-d\\/');
			expect(control.value).toEqual('12.-');
		});

		it('should filter out any period after the first one', async function () {
			typeInput('1.2.3.4');
			expect(control.value).toEqual('1.234');
		});

		it('should allow a trailing period', async function () {
			typeInput('1.');
			expect(control.value).toEqual('1.');
		});

		describe('with locale using comma as decimal separator', function () {
			beforeEach(() => {
				setLocale(deDE);
			});

			afterEach(() => {
				setLocale(enUS);
			});

			it('should format values with comma', async function () {
				element.value = '1.2';
				await elementUpdated(element);

				expect(control.value).toEqual('1,2');
			});

			it('should accept values entered with comma', async function () {
				typeInput('1,2');

				expect(element.value).toEqual('1.2');
			});

			it('should filter out any invalid characters', async function () {
				typeInput('a1,b2.c-d\\/');
				expect(control.value).toEqual('1,2-');
			});

			it('should filter out any period after the first one', async function () {
				typeInput('1,2,3,4');
				expect(control.value).toEqual('1,234');
			});

			it('should allow a trailing period', async function () {
				typeInput('1,');
				expect(control.value).toEqual('1,');
			});
		});
	});

	describe('value', function () {
		it("should set 'has-value' class when there is a value", async function () {
			const activeClassWhenEnabled =
				getBaseElement(element).classList.contains('has-value');
			element.value = '5';
			await elementUpdated(element);
			const activeClassWhenDisabled =
				getBaseElement(element).classList.contains('has-value');
			expect(activeClassWhenEnabled).toEqual(false);
			expect(activeClassWhenDisabled).toEqual(true);
		});

		it.each(['', '-', '.', '-.', '5-'])(
			'should ignore invalid input value %s',
			async function (value) {
				typeInput(value);
				await elementUpdated(element);
				expect(element.value).toEqual('');
			}
		);

		it.each(['0', '1', '1.1', '-0.5', '-.5', '00', '0.0', '0.10'])(
			'should accept number-like input value %s',
			async function (value) {
				typeInput(value);
				await elementUpdated(element);
				expect(element.value).toEqual(value);
			}
		);

		it('should remove trailing period from number-like input value', async function () {
			typeInput('5.');
			await elementUpdated(element);
			expect(element.value).toEqual('5');
		});

		it('should clear invalid programmatically added invalid value', async function () {
			element.value = '5.5.';
			const valueWithTwoDecimalPoints = element.value;
			element.value = '6.';
			const valueWithInvalidDecimalPoint = element.value;
			element.value = '-';
			const valueWithNegativeSignAlone = element.value;
			element.value = '5a';
			const valueWithInvalidCharacter = element.value;
			expect(valueWithTwoDecimalPoints).toEqual('');
			expect(valueWithInvalidDecimalPoint).toEqual('');
			expect(valueWithNegativeSignAlone).toEqual('');
			expect(valueWithInvalidCharacter).toEqual('');
		});

		it('should validate input if value fits step', async () => {
			element.step = 0.1;
			typeInput('5.5');
			expect(element.validationMessage).toEqual('');
		});

		it('should be invalid if value is not in max boundary', async function () {
			element.max = 6;
			element.valueAsNumber = 6 + 1;
			await elementUpdated(element);
			expect(element.checkValidity()).toBe(false);
		});

		it('should be invalid if value is not in min boundary', async function () {
			element.min = 6;
			element.valueAsNumber = 6 - 1;
			await elementUpdated(element);
			expect(element.checkValidity()).toBe(false);
		});

		it('should be invalid if required and empty', async () => {
			element.required = true;
			await elementUpdated(element);
			expect(element.checkValidity()).toBe(false);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'filled';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			expect(
				getBaseElement(element).classList.contains('appearance-filled')
			).toEqual(true);
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('shape-pill')).toEqual(
				true
			);
		});
	});

	describe('autocomplete', function () {
		it('should set autocomplete on the internal control', async function () {
			const autoCompleteDefault = control.getAttribute('autocomplete');

			element.autoComplete = 'off';
			await elementUpdated(element);
			expect(autoCompleteDefault).toBeNull();
			expect(control.getAttribute('autocomplete')).toEqual('off');
		});

		it('should reflect the name on the internal control', async function () {
			element.name = 'off';
			await elementUpdated(element);
			expect(control.getAttribute('name')).toEqual('off');
		});
	});

	describe('select', function () {
		const onSelect = vi.fn();
		beforeEach(() => {
			control.select = vi.fn();
			element.addEventListener('select', onSelect);
		});

		it('should emit select event', async function () {
			element.select();

			expect(onSelect).toHaveBeenCalled();
		});

		it('should call select on the control', async function () {
			element.select();

			expect(control.select).toHaveBeenCalled();
		});
	});

	describe('input', () => {
		it('should decrement the value when pressing down arrow ', async () => {
			element.value = '5';

			control.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			expect(element.value).toBe('4');
		});

		it('should increment the value when pressing up arrow', async () => {
			element.value = '5';

			control.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

			expect(element.value).toBe('6');
		});

		it.each(['ArrowDown', 'ArrowUp'])(
			'should prevent default of %s key presses',
			async () => {
				const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
				event.preventDefault = vi.fn();

				control.dispatchEvent(event);

				expect(event.preventDefault).toHaveBeenCalled();
			}
		);

		it('should not prevent default of other key presses', async () => {
			const event = new KeyboardEvent('keydown', { key: 'A' });
			event.preventDefault = vi.fn();

			control.dispatchEvent(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});

	describe('number buttons', function () {
		let addButton: HTMLButtonElement, subtractButton: HTMLButtonElement;

		beforeEach(function () {
			addButton = getBaseElement(element).querySelector(
				'#add'
			) as HTMLButtonElement;
			subtractButton = getBaseElement(element).querySelector(
				'#subtract'
			) as HTMLButtonElement;
		});

		it('should advance value by 1 as default', async function () {
			element.value = '10';
			addButton?.click();
			await elementUpdated(element);
			expect(control.value).toEqual('11');
		});

		it('should increment by step when clicking the add button', async function () {
			element.value = '10';
			element.step = 5;
			addButton?.click();
			await elementUpdated(element);
			expect(control.value).toEqual('15');
		});

		it('should subtract by step when clicking the add button', async function () {
			element.value = '10';
			element.step = 5;
			subtractButton?.click();
			await elementUpdated(element);
			expect(control.value).toEqual('5');
		});

		it('should have pill shape when numberField is pilled', async function () {
			element.shape = Shape.Pill;
			await elementUpdated(element);
			expect(addButton.getAttribute('shape')).toEqual(Shape.Pill);
			expect(subtractButton.getAttribute('shape')).toEqual(Shape.Pill);
		});

		it('should set step as 1 with default step', async function () {
			element.value = '8';
			await elementUpdated(element);
			addButton.click();
			expect(element.value).toEqual('9');
		});

		it('should set inert in disabled and readonly', async function () {
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

		it('should set the disabled in readOnly', async function () {
			element.readOnly = true;
			await elementUpdated(element);
			expect(addButton.hasAttribute('disabled')).toBe(true);
			expect(subtractButton.hasAttribute('disabled')).toBe(true);
		});

		it('should set the disabled in disabled', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(addButton.hasAttribute('disabled')).toBe(true);
			expect(subtractButton.hasAttribute('disabled')).toBe(true);
		});

		it('should set tabindex="-1" on the buttons', async function () {
			function isButtonsWrapperInert() {
				return (
					addButton.getAttribute('tabindex') === '-1' &&
					subtractButton.getAttribute('tabindex') === '-1'
				);
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

		it('should increase decimals correctly', async function () {
			element.step = 0.1;
			await elementUpdated(element);
			for (let i = 0.1; i <= 1; i += 0.1) {
				addButton.click();
				expect(element.value).toEqual(Number(i.toFixed(12)).toString());
			}
		});

		it('should decrease decimals correctly', async function () {
			element.step = 0.1;
			await elementUpdated(element);
			for (let i = -0.1; i >= -1; i -= 0.1) {
				subtractButton.click();
				expect(element.value).toEqual(Number(i.toFixed(12)).toString());
			}
		});
	});

	describe('minlength and maxlength', function () {
		it('should revert to last valid length', async function () {
			element.maxlength = 5;
			element.minlength = 2;
			await elementUpdated(element);
			expect(control.getAttribute('maxlength')).toEqual('5');
			expect(control.getAttribute('minlength')).toEqual('2');
		});
	});

	describe('valueAsNumber', function () {
		it('should return NaN if no value', function () {
			element.value = '';
			expect(element.valueAsNumber).toEqual(NaN);
		});

		it('should return the value as a number type', async function () {
			element.value = '5';
			await elementUpdated(element);
			expect(element.valueAsNumber).toEqual(5);
		});

		it('should set the number value as a string', async function () {
			element.valueAsNumber = 5e3;
			await elementUpdated(element);
			expect(element.value).toEqual('5000');
		});
	});

	describe('stepUp', function () {
		it('should increase the value by one when no step is given', function () {
			element.value = '5';
			element.stepUp();
			expect(element.value).toEqual('6');
		});

		it('should set value to minimum if value invalid and boundary is positive', function () {
			element.step = 4;
			element.value = 'a';
			element.min = 2;
			element.stepUp();
			expect(element.valueAsNumber).toBe(2);
		});

		it('should set the value to max if value invalid and boundary is negative', function () {
			element.step = 4;
			element.value = 'a';
			element.min = -10;
			element.max = -2;
			element.stepUp();
			expect(element.valueAsNumber).toBe(-2);
		});

		it('should set value as step if minimum does not exist or zero', () => {
			element.step = 0.00534;
			element.value = 'a';
			element.min = 0;

			element.stepUp();
			expect(element.valueAsNumber).toBe(0.00534);
		});

		it('should set value to zero if boundary crosses signs', () => {
			element.max = 10;
			element.min = -10;
			element.step = 5;
			element.stepUp();
			expect(element.valueAsNumber).toBe(0);
		});

		it('should increase the value by step value', function () {
			element.value = '5';
			element.step = 5;
			element.stepUp();
			expect(element.value).toEqual('10');
		});
	});

	describe('stepDown', function () {
		it('should decrease the value by one when no step is given', function () {
			element.value = '5';
			element.stepDown();
			expect(element.value).toEqual('4');
		});

		it('should decrease the value by step value', function () {
			element.value = '5';
			element.step = 5;
			element.stepDown();
			expect(element.value).toEqual('0');
		});

		it('should set value to minimum if value invalid and boundary is positive', function () {
			element.step = 4;
			element.value = 'a';
			element.min = 2;
			element.stepDown();
			expect(element.valueAsNumber).toBe(2);
		});

		it('should set the value to max if value invalid and boundary is negative', function () {
			element.step = 4;
			element.value = 'a';
			element.min = -10;
			element.max = -2;
			element.stepDown();
			expect(element.valueAsNumber).toBe(-2);
		});

		it('should set value as negative step if minimum does not exist or zero', () => {
			element.step = 0.00534;
			element.value = 'a';
			element.min = 0;

			element.stepDown();
			expect(element.valueAsNumber).toBe(-0.00534);
		});

		it('should set value to zero if boundary crosses signs', () => {
			element.max = 10;
			element.min = -10;
			element.step = 5;
			element.stepDown();
			expect(element.valueAsNumber).toBe(0);
		});
	});

	describe('errorText', function () {
		const forcedErrorMessage = 'BAD!';

		it('should add the error class', async function () {
			element.errorText = forcedErrorMessage;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('error')).toEqual(true);
		});
	});

	describe('a11y', () => {
		beforeEach(async () => {
			element.label = 'Label';
			element.errorText = 'Error';
			await elementUpdated(element);
		});

		describe('add and subtract buttons', () => {
			it('renders a localized "aria-label" on the add button', async () => {
				const addButton = element.shadowRoot?.getElementById('add');
				expect(addButton?.ariaLabel).toBe('Increase value');
				element.step = 3;
				await elementUpdated(element);
				expect(addButton?.ariaLabel).toBe('Increase value by 3');
			});

			it('renders a localized "aria-label" on the subtract button', async () => {
				const subtractButton = element.shadowRoot?.getElementById('subtract');
				expect(subtractButton?.ariaLabel).toBe('Decrease value');
				element.step = 3;
				await elementUpdated(element);
				expect(subtractButton?.ariaLabel).toBe('Decrease value by 3');
			});

			it('updates status announcement after clicking the button', async () => {
				element.value = '5';
				await elementUpdated(element);

				const addButton = element.shadowRoot?.getElementById('add');
				addButton?.click();
				await elementUpdated(element);

				const annoucementEl =
					element.shadowRoot?.getElementById('value-announcement');
				expect(annoucementEl?.textContent?.trim()).toBe('Updated value: 6');
			});

			describe('aria overrides', () => {
				it('renders the correct text for "aria-label" in the add button', async () => {
					element.incrementButtonAriaLabel = 'Add label';
					await elementUpdated(element);
					const addButton = element.shadowRoot?.getElementById('add');
					expect(addButton?.ariaLabel).toBe('Add label');
				});

				it('renders the correct text for "aria-label" in the subtract button', async () => {
					element.decrementButtonAriaLabel = 'Subtract label';
					await elementUpdated(element);
					const subtractButton = element.shadowRoot?.getElementById('subtract');
					expect(subtractButton?.ariaLabel).toBe('Subtract label');
				});
			});
		});
	});

	describe('feedback messages', () => {
		itShouldDisplayHelperTextFeedback(() => element);
		itShouldDisplaySuccessTextFeedback(() => element);
		itShouldDisplayErrorTextFeedback(() => element);
		itShouldDisplayValidationErrorFeedback(() => element);
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getControlElement(element),
			[
				'ariaAtomic',
				'ariaBusy',
				'ariaCurrent',
				'ariaDisabled',
				'ariaHasPopup',
				'ariaHidden',
				'ariaInvalid',
				'ariaKeyShortcuts',
				'ariaLabel',
				'ariaLive',
				'ariaRelevant',
				'ariaRoleDescription',
			]
		);
	});
});
