import {FormElement, formElements} from './form-elements';

const VALIDATION_MESSAGE = 'Validation Message';

describe('formElements mixin', function () {

	/**
	 * @param elementInstance
	 */
	function setProxy(elementInstance = instance) {
		elementInstance.proxy = document.createElement('input');
	}

	/**
	 *
	 */
	function enableValidation() {
		dispatchBlurEvent();
		instance.dirtyValue = true;
	}

	/**
	 *
	 */
	function dispatchBlurEvent() {
		instance.dispatchEvent(new Event('blur'));
	}

	@formElements
	class TestClass extends HTMLElement{
		constructor() {
			super();
		}
		validationMessage = VALIDATION_MESSAGE;
		validate() {
			return 5;
		}

		setValidity = jest.fn();
		proxy?: HTMLElement;
	}
	interface TestClass extends FormElement{}

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

	it('should return the correct errorValidationMessage', function () {
		instance.userValid = true;
		instance.charCount = true;
		instance.helperText = 'message';
		instance.label = 'label';

		expect(instance.errorValidationMessage).toEqual('');
	});

	describe('validate', function () {
		it('should set userValid to true if not blurred and not dirty with a valid proxy', async function() {
			instance.userValid = true;
			instance.validate();
			expect(instance.userValid).toEqual(true);
		});

		it('should set userValid as false if blurred, dirty and with a valid proxy', function () {
			instance.userValid = false;
			enableValidation();
			instance.validate();
			expect(instance.userValid).toEqual(false);
		});

		it('should call set validity with the input control as anchor when ElementInternals is defined', function () {
			const elementInternals = (window as any)['ElementInternals'] = function() { return 5; };
			elementInternals.prototype.setFormValue = jest.fn();
			const proxy = instance.proxy as any;
			instance.validate();
			expect(instance.setValidity).toHaveBeenCalledWith(proxy.validity, proxy.validationMessage, (instance as any).control);
			delete (window as any)['ElementInternals'];
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
			instance.validate();
			const userValidAfterEnabledValidation = instance.userValid;
			instance.dispatchEvent(new Event('focus'));
			instance.validate();
			const userValidAfterFocusedValidation = instance.userValid;
			expect(userValidAfterEnabledValidation).toEqual(false);
			expect(userValidAfterFocusedValidation).toEqual(true);
		});
	});

	describe('invalid event', function () {

		it('should enable validation', function () {
			instance.dispatchEvent(new Event('invalid'));
			instance.userValid = true;
			instance.validate();
			expect(instance.userValid).toEqual(false);
		});

		it('should call validate', function () {
			instance.validate = jest.fn();
			instance.dispatchEvent(new Event('invalid'));
			expect(instance.validate).toHaveBeenCalledTimes(1);
		});

		it('should call validate only if validation is disabled', function () {
			enableValidation();
			instance.validate = jest.fn();
			instance.dispatchEvent(new Event('invalid'));
			expect(instance.validate).toHaveBeenCalledTimes(0);
		});
	});
});
