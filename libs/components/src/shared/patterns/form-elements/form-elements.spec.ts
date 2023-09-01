import {
	FormElement,
	FormElementCharCount,
	formElements,
} from './form-elements';

const VALIDATION_MESSAGE = 'Validation Message';

describe('Form Elements', function () {
	describe('FormElementCharCount', () => {
		it('should set charCount to false on init', async () => {
			const instance = new FormElementCharCount();
			expect(instance.charCount).toEqual(false);
		});
	});
	describe('formElements mixin', function () {
		function setProxy(elementInstance = instance) {
			elementInstance.proxy = document.createElement('input');
		}

		function enableValidation() {
			dispatchBlurEvent();
			instance.dirtyValue = true;
		}

		function dispatchBlurEvent() {
			instance.dispatchEvent(new Event('blur'));
		}

		@formElements
		class TestClass extends HTMLElement {
			constructor() {
				super();
			}
			validationMessage = VALIDATION_MESSAGE;
			validate() {
				return 5;
			}

			setValidity = jest.fn();
			proxy?: HTMLElement;

			formResetCallback () {}
		}
		interface TestClass extends FormElement {}

		customElements.define('test-class', TestClass);

		let instance: TestClass;

		beforeEach(async function () {
			instance = document.createElement('test-class') as TestClass;
			setProxy(instance);
			document.body.appendChild(instance);
		});

		afterEach(function () {
			instance.remove();
		});

		it('should return empty errorValidationMessage', function () {
			expect(instance.errorValidationMessage).toEqual('');
		});

		describe('validate', function () {
			it('should return empty errorValidationMessage if not blurred and not dirty with a valid proxy', async function () {
				instance.validate();
				expect(instance.errorValidationMessage).toEqual('');
			});

			it('should return the validationMessage when blurred, dirty and with a valid proxy', function () {
				enableValidation();
				instance.validate();
				expect(instance.errorValidationMessage).toEqual(VALIDATION_MESSAGE);
			});
		});

		describe('blur event', function () {
			it('should call validate', function () {
				instance.validate = jest.fn();
				dispatchBlurEvent();
				expect(instance.validate).toHaveBeenCalledTimes(1);
			});
		});

		describe('focus event', function () {
			it('should prevent validation messages', function () {
				enableValidation();
				instance.dispatchEvent(new Event('focus'));
				instance.validate();
				expect(instance.errorValidationMessage).toEqual('');
			});
		});

		describe('invalid event', function () {
			it('should force validation message to be displayed', function () {
				instance.dispatchEvent(new Event('invalid'));
				instance.validate();
				expect(instance.errorValidationMessage).toEqual(VALIDATION_MESSAGE);
			});

			it('should call validate', function () {
				instance.validate = jest.fn();
				instance.dispatchEvent(new Event('invalid'));
				expect(instance.validate).toHaveBeenCalledTimes(1);
			});
		});

		describe('formResetCallback', () => {
			it('should prevent validation message from being shown', () => {
				instance.dispatchEvent(new Event('invalid'));
				instance.validate();
				instance.formResetCallback();
				expect(instance.errorValidationMessage).toEqual('');
			});
		});
	});
});
