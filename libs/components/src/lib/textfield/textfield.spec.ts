import {elementUpdated, fixture} from '@vivid-nx/shared';
import {Textfield} from './textfield';
import '.';
import {TextFieldType} from '@microsoft/fast-foundation';

const COMPONENT_TAG = 'vwc-textfield';

describe('vwc-textfield', () => {
	let element: Textfield;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Textfield;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-textfield', async () => {
			expect(element)
				.toBeInstanceOf(Textfield);
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

	//TODO::character count

	//TODO::number type with special +/- sign

	describe('readOnly', function () {
		it('should add class readonly to host', async function () {
			const readonlyClassWhenFalse = element.classList.contains('readonly');
			element.readOnly = true;
			await elementUpdated(element);
			const readonlyClassWhenTrue = element.classList.contains('readonly');
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
	});

	describe('type', function () {
		const typeText = TextFieldType.text;
		it('should set type attribute on the input', async function () {

			element.type = typeText;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute('type'))
				.toEqual(typeText);
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

	describe('maxlength', function () {
		const value = '8';
		const propertyName = 'maxlength';
		const proxyPropertyName = 'maxLength';

		it('should set maxlength attribute on the input', async function () {

			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute(propertyName))
				.toEqual(value);
		});

		it('should set maxLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName])
				.toEqual(Number(value));
		});
	});

	describe('minlength', function () {
		const value = '2';
		const propertyName = 'minlength';
		const proxyPropertyName = 'minLength';

		it('should set minlength attribute on the input', async function () {

			(element as any)[propertyName] = value;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('input')
				?.getAttribute(propertyName))
				.toEqual(value);
		});

		it('should set minLength on proxy input', function () {
			(element as any)[propertyName] = value;
			expect((element.proxy as any)[proxyPropertyName])
				.toEqual(Number(value));
		});
	});

	describe('form association', function () {
		/**
		 * @param formElement
		 */
		function listenToSubmission(formElement: HTMLFormElement): Promise<FormData> {
			return new Promise((res) => {
				formElement.addEventListener('submit', () => {
					const formData = new FormData(formElement);
					res(formData);
				});
			});
		}

		/**
		 * @param fieldName
		 * @param fieldValue
		 * @param formId
		 * @param otherFormId
		 */
		function createFormHTML(fieldName: string, fieldValue: string, formId: string, otherFormId?: string) {
			const otherForm = otherFormId
				? `<form onsubmit="return false" id="${otherFormId}"><button></button></form>`
				: '';
			formWrapper.innerHTML = `
				<form onsubmit="return false" name="testForm" id="${formId}">
					<${COMPONENT_TAG} name="${fieldName}"
						value="${fieldValue}"
						${otherFormId ? `form="${otherFormId}"` : `form="${formId}"`}>
					</${COMPONENT_TAG}>
					<button></button>
				</form>
				${otherForm}
			`;

			return {
				form: formWrapper.children[0] as HTMLFormElement,
				otherForm: formWrapper.children[1] as HTMLFormElement,
				element: formWrapper.querySelector(COMPONENT_TAG) as Textfield,
				button: formWrapper.children[0]?.querySelector('button'),
				otherFormButton: formWrapper.children[1]?.querySelector('button'),
			};
		}

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
			const {form: formElement} = createFormHTML(fieldName, fieldValue, formId);

			const submitPromise = listenToSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(fieldValue);
			});
		});

		it('should attach to form when given form id', async function () {
			const {otherForm} = createFormHTML(fieldName, fieldValue, formId, 'otherFormId');

			const submitPromise = listenToSubmission(otherForm);
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
			} = createFormHTML(fieldName, fieldValue, formId);

			element.value = '5';
			formElement.reset();
			await elementUpdated(element);

			expect(element.value)
				.toEqual(fieldValue);
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
			const helperText = 'Helper Text';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.helper-text')?.textContent?.trim())
				.toEqual(helperText);
		});
	});

	describe('error message', function () {

		function setValidity(errorMessage = 'error') {
			element.setValidity({badInput: true}, errorMessage);
			element.validate();
		}

		it('should render the error message when attribute is set', async function () {
			const errorMessage = 'Error Text';
			element.dirtyValue = true;
			setValidity(errorMessage);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.error-message')?.textContent?.trim())
				.toEqual(errorMessage);
		});

		it('should replace helper text', async function () {
			element.helperText = 'helper text';
			element.dirtyValue = true;
			setValidity();
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.helper-text'))
				.toBeNull();
		});

		it(`should set error message to empty string when pristine`, async function () {
			setValidity();
			await elementUpdated(element);
			expect(element.errorValidationMessage)
				.toEqual('');
		});
	});
});
