import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import { TextArea } from './text-area';
import '.';

const COMPONENT_TAG = 'vwc-text-area';

describe('vwc-text-area', () => {
	function setToBlurred() {
		element.dispatchEvent(new Event('blur'));
	}

	function setValidityToError(errorMessage = 'error') {
		element.setValidity({ badInput: true }, errorMessage);
		element.validate();
	}

	const getTextarea = () =>
		element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;

	let element: TextArea;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TextArea;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-text-area', async () => {
			expect(element.charCount).toBe(undefined);
			expect(element.cols).toBe(20);
			expect(element.dirtyValue).toBe(false);
			expect(element.disabled).toBe(false);
			expect(element.errorValidationMessage).toBe('');
			expect(element.helperText).toBe(undefined);
			expect(element.label).toBe(undefined);
			expect(element.maxlength).toBe(undefined);
			expect(element.minlength).toBe(undefined);
			expect(element.name).toBe(undefined);
			expect(element.placeholder).toBe(undefined);
			expect(element.readOnly).toBe(undefined);
			expect(element.required).toBe(false);
			expect(element.rows).toBe(undefined);
			expect(element.resize).toBe('none');
			expect(element.formId).toBe(undefined);
			expect(element.list).toBe(undefined);
			expect(element.spellcheck).toBe(undefined);
			expect(element.autofocus).toBe(undefined);
			expect(element.value).toBe('');
			expect(element).toBeInstanceOf(TextArea);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

	describe('char-count', function () {
		it('should render char-count if attribute char-count and max-length are set', async function () {
			element.charCount = true;
			element.maxlength = 20;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.char-count')).toBeTruthy();
		});

		it('should remove char count if max-length is not set', async function () {
			element.charCount = true;
			element.toggleAttribute('max-length', false);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.char-count')).toBeNull();
		});

		it('should render count with 0 if value is not set', async function () {
			element.charCount = true;
			element.maxlength = 20;
			const expectedString = '0 / 20';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.char-count')?.textContent?.trim()
			).toEqual(expectedString);
		});

		it('should render count according to value and max', async function () {
			element.charCount = true;
			element.maxlength = 20;
			element.value = '12345';
			const expectedString = '5 / 20';
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('.char-count')?.textContent?.trim()
			).toEqual(expectedString);
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
			expect(getControlElement(element)?.hasAttribute('autofocus')).toEqual(
				true
			);
		});
	});

	describe('placeholder', function () {
		const placeholderText = 'Text';
		it('should set placeholder attribute on the input', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getTextarea().getAttribute('placeholder')).toEqual(
				placeholderText
			);
		});

		it('should set class placeholder to base', async function () {
			element.placeholder = placeholderText;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('placeholder')).toEqual(
				true
			);
		});

		it('should have no placeholder if placeholder is not set as string', async function () {
			element.placeholder = '';
			await elementUpdated(element);
			expect(getTextarea().getAttribute('placeholder')).toBeNull();
		});
	});

	describe('minlength', function () {
		const value = '8';
		const propertyName = 'minlength';
		const proxyPropertyName = 'minLength';

		it('should set minlength attribute on the input', async function () {
			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getTextarea().getAttribute(propertyName)).toEqual(value);
		});

		it('should set minLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName]).toEqual(Number(value));
		});
	});

	describe('maxlength', function () {
		const value = '8';
		const propertyName = 'maxlength';
		const proxyPropertyName = 'maxLength';

		it('should set maxlength attribute on the input', async function () {
			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(getTextarea().getAttribute(propertyName)).toEqual(value);
		});

		it('should set maxLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName]).toEqual(Number(value));
		});
	});

	describe('list', function () {
		it('should set list attribute on the textarea', async function () {
			element.list = 'data-list';
			await elementUpdated(element);
			expect(getTextarea().getAttribute('list')).toBe('data-list');
		});
	});

	describe('spellcheck', function () {
		it('should set spellcheck attribute on the textarea', async function () {
			element.spellcheck = true;
			await elementUpdated(element);
			expect(getTextarea().hasAttribute('spellcheck')).toBe(true);
		});
	});

	describe('form association', function () {
		let fieldValue: string,
			formId: string,
			fieldName: string,
			formWrapper: HTMLElement;

		beforeEach(function () {
			fieldValue = 'field-value';
			fieldName = 'test-field';
			formId = 'test-form-id';
			formWrapper = document.createElement('div');
			document.body.appendChild(formWrapper);
		});

		afterEach(function () {
			formWrapper.remove();
		});

		it('should attach to closest form', async function () {
			const { form: formElement } = createFormHTML<TextArea>({
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
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should attach to form when given form id', async function () {
			const { otherForm } = createFormHTML<TextArea>({
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
			const { form: formElement, element } = createFormHTML<TextArea>({
				fieldName,
				fieldValue,
				formId,
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			element.value = '5';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value).toEqual(fieldValue);
		});
	});

	describe('events', function () {
		it('should emit an input event', async function () {
			const inputPromise = new Promise((res) =>
				element.addEventListener('input', () => res(true))
			);
			const innerInput = getTextarea();
			innerInput.dispatchEvent(
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
			const innerInput = getTextarea();
			innerInput.dispatchEvent(
				new InputEvent('change', {
					bubbles: true,
					composed: true,
				})
			);
			expect(await inputPromise).toEqual(true);
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
	});

	describe('name', function () {
		it('should reflect the name on the internal input', async function () {
			const internalInput = getTextarea();
			element.name = 'text area name';
			await elementUpdated(element);
			expect(internalInput.getAttribute('name')).toEqual('text area name');
		});
	});

	describe('error message', function () {
		it('should add class error to base if not valid', async function () {
			element.dirtyValue = true;
			setToBlurred();
			setValidityToError('blah');
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

	describe('rows, cols and wrap', function () {
		it('should reflect rows cols and wrap on the control', async function () {
			const control = getControlElement(element);
			const rows = 5;
			const cols = 10;
			const wrap = 'hard';
			element.rows = rows;
			element.cols = cols;
			element.wrap = wrap;
			await elementUpdated(element);
			expect(control.getAttribute('rows')).toEqual(rows.toString());
			expect(control.getAttribute('cols')).toEqual(cols.toString());
			expect(control.getAttribute('wrap')).toEqual(wrap);
		});

		it('should remove cols attribute if cols is falsy', async function () {
			const control = getControlElement(element);
			(element.cols as any) = undefined;
			await elementUpdated(element);
			expect(control.hasAttribute('cols')).toEqual(false);
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
	});

	describe('select method', function () {
		it('should call select on the input', async function () {
			getTextarea().select = vi.fn();

			element.select();

			expect(getTextarea().select).toHaveBeenCalled();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Label';
			element.value = 'Value text';
			element.resize = 'both';
			element.helperText = 'Helper text';
			element.errorText = 'Error text';
			element.charCount = true;

			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
