import 'element-internals-polyfill';

import { fixture } from '@vivid-nx/shared';
import { customElement, FASTElement } from '@microsoft/fast-element';
import { FormAssociated } from '@microsoft/fast-foundation';
import {
	ErrorText,
	errorText,
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

	describe('formElements() validate method', () => {
		@formElements
		class Test extends HTMLElement {
			elementInternals: ElementInternals;
			constructor() {
				super();
				this.elementInternals = this.attachInternals();
			}

			proxy = document.createElement('input');
			control = document.createElement('input');

			validate() {}

			setValidity = jest.fn();
		}

		customElements.define('test-element', Test);

		let test: Test;

		beforeEach(() => {
			test = new Test();
			Object.defineProperty(test.proxy, 'validationMessage', {
				value: 'proxy validation message',
			});
			Object.defineProperty(test.control, 'validationMessage', {
				value: 'control validation message',
			});
		});

		it("should use the proxy's validity when the proxy is invalid", () => {
			Object.defineProperty(test.proxy, 'validity', {
				value: {
					valid: false,
				},
			});

			test.validate();

			expect(test.setValidity).toHaveBeenCalledWith(
				test.proxy.validity,
				'proxy validation message',
				undefined
			);
		});

		it.each(['tooLong', 'tooShort'])(
			"should use the control's validity when the proxy is valid but control is invalid with %s reason",
			(reason) => {
				Object.defineProperty(test.proxy, 'validity', {
					value: {
						valid: true,
					},
				});
				Object.defineProperty(test.control, 'validity', {
					value: {
						[reason]: true,
						valid: false,
					},
				});

				test.validate();

				expect(test.setValidity).toHaveBeenCalledWith(
					test.control.validity,
					'control validation message',
					undefined
				);
			}
		);

		it("should use the proxy's validity when control has no validity state", () => {
			Object.defineProperty(test.proxy, 'validity', {
				value: {
					valid: true,
				},
			});
			Object.defineProperty(test.control, 'validity', {
				value: undefined,
			});

			test.validate();

			expect(test.setValidity).toHaveBeenCalledWith(
				test.proxy.validity,
				'proxy validation message',
				undefined
			);
		});

		it('should not call setValidity when element internals are not supported', () => {
			delete (test as any).elementInternals;

			test.validate();

			expect(test.setValidity).not.toHaveBeenCalled();
		});
	});

	describe('formElements mixin', function () {
		function enableValidation() {
			dispatchBlurEvent();
			instance.dirtyValue = true;
		}

		function dispatchBlurEvent() {
			instance.dispatchEvent(new Event('blur'));
		}

		class _FormElementsClass extends FASTElement {}
		// eslint-disable-next-line @typescript-eslint/naming-convention
		interface _FormElementsClass extends FormAssociated {}

		class FormAssociatedTextField extends FormAssociated(_FormElementsClass) {
			proxy = document.createElement('input');
		}

		@customElement('form-elements-class')
		@formElements
		class FormElementsClass extends FormAssociatedTextField {
			override get validationMessage() {
				return VALIDATION_MESSAGE;
			}
		}
		interface FormElementsClass extends FormElement {}

		let instance: FormElementsClass;

		beforeEach(async function () {
			instance = (await fixture(
				'<form-elements-class></form-elements-class>'
			)) as FormElementsClass;
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
				enableValidation();
				instance.validate();
				instance.dispatchEvent(new Event('invalid'));

				instance.formResetCallback();

				expect(instance.errorValidationMessage).toEqual('');
			});
		});
	});

	describe('errorText mixin', function () {
		function enableValidation() {
			instance.dispatchEvent(new Event('blur'));
			instance.dirtyValue = true;
		}

		const baseValidate = jest.fn().mockReturnValue(5);

		class _ErrorTextClass extends FASTElement {}
		// eslint-disable-next-line @typescript-eslint/naming-convention
		interface _ErrorTextClass extends FormAssociated {}

		class FormAssociatedErrorTextClass extends FormAssociated(_ErrorTextClass) {
			proxy = document.createElement('input');
		}

		@customElement('error-text-class')
		@errorText
		@formElements
		class ErrorTextClass extends FormAssociatedErrorTextClass {
			override get validationMessage() {
				return VALIDATION_MESSAGE;
			}

			override validate() {
				return baseValidate();
			}

			override setValidity = jest.fn();
		}
		interface ErrorTextClass extends ErrorText, FormElement {}

		let instance: ErrorTextClass;

		beforeEach(async function () {
			instance = fixture(
				'<error-text-class></error-text-class>'
			) as ErrorTextClass;
			jest.resetAllMocks();
		});

		afterEach(function () {
			instance.remove();
		});

		it('should setValidity and set errorValidationMessage with the message set by errorText', async () => {
			const message = 'Error Message';

			instance.errorText = message;

			expect(instance.setValidity).toHaveBeenCalledWith(
				{ customError: true },
				message,
				undefined
			);
			expect(instance.errorValidationMessage).toEqual(message);
		});

		it('should block calls to validate while errorText is set', async () => {
			instance.errorText = 'Error message';
			instance.validate();

			expect(baseValidate).not.toHaveBeenCalled();
		});

		it('should restore validity and errorValidationMessage when errorText is cleared', async () => {
			enableValidation();
			instance.errorText = 'Error message';

			instance.errorText = '';

			expect(instance.setValidity).toHaveBeenLastCalledWith(
				{ customError: false },
				'',
				undefined
			);
			expect(instance.errorValidationMessage).toEqual(VALIDATION_MESSAGE);
		});

		it('should allows calls to validate again when errorText is cleared', async () => {
			instance.errorText = 'Error message';
			instance.errorText = '';

			instance.validate();

			expect(baseValidate).toHaveBeenCalled();
		});
	});
});
