import 'element-internals-polyfill';

import { elementUpdated, fixture } from '@vivid-nx/shared';
import { customElement, FASTElement } from '@microsoft/fast-element';
import { applyMixinsWithObservables } from '../../utils/applyMixinsWithObservables.ts';
import { FormAssociated } from '../../foundation/form-associated/form-associated.ts';
import { VividElement } from '../../foundation/vivid-element/vivid-element.ts';
import { createRegisterFunction } from '../../design-system/createRegisterFunction.ts';
import { iconDefinition } from '../../../lib/icon/definition.ts';
import { defineVividComponent } from '../../design-system/defineVividComponent.ts';
import {
	ErrorText,
	errorText,
	FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
	getFeedbackTemplate,
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
				instance.validate = vi.fn();
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
				instance.validate = vi.fn();
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

		const baseValidate = vi.fn().mockReturnValue(5);

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

			override setValidity = vi.fn();
		}

		interface ErrorTextClass extends ErrorText, FormElement {}

		let instance: ErrorTextClass;

		beforeEach(async function () {
			instance = fixture(
				'<error-text-class></error-text-class>'
			) as ErrorTextClass;
			vi.clearAllMocks();
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

			expect(instance.setValidity).toHaveBeenLastCalledWith({}, '', undefined);
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

describe('getFeedbackTemplate', () => {
	@errorText
	@formElements
	class Feedback extends FormAssociated(VividElement) {
		proxy = document.createElement('input');
	}

	interface Feedback
		extends FormElementHelperText,
			FormElementSuccessText,
			FormElement,
			ErrorText,
			FormAssociated {}

	applyMixinsWithObservables(
		Feedback,
		FormElementHelperText,
		FormElementSuccessText
	);

	const feedbackDef = defineVividComponent(
		'feedback',
		Feedback,
		getFeedbackTemplate,
		[iconDefinition],
		{}
	);
	createRegisterFunction(feedbackDef)('test');

	let element: Feedback;
	beforeEach(async () => {
		element = (await fixture('<test-feedback></test-feedback>')) as Feedback;
	});

	const getMessage = (type: string) => {
		const messageEl = element.shadowRoot!.querySelector(
			`.${type}-message.message--visible:not(.sr-only)`
		);
		if (!messageEl) {
			return null;
		}
		const slot = messageEl.querySelector('slot') as HTMLSlotElement | null;
		if (slot && slot.assignedNodes().length > 0) {
			return slot.assignedNodes()[0].textContent!.trim();
		} else {
			return messageEl.textContent!.trim();
		}
	};

	describe('helper text', () => {
		it('should show helper text when property is set', async () => {
			element.helperText = 'helper text';
			await elementUpdated(element);

			expect(getMessage('helper')).toBe('helper text');
		});

		it('should allow setting helper text via slot', async () => {
			const helperText = document.createElement('span');
			helperText.slot = 'helper-text';
			helperText.textContent = 'helper text';
			element.appendChild(helperText);
			await elementUpdated(element);

			expect(getMessage('helper')).toBe('helper text');
		});
	});

	describe('error text', () => {
		it('should show validation error when the field is invalid', async () => {
			element.dirtyValue = true;
			element.dispatchEvent(new Event('blur'));
			element.proxy.setCustomValidity('error text');
			element.validate();
			await elementUpdated(element);

			expect(getMessage('error')).toBe('error text');
		});

		it('should show error text when property is set', async () => {
			element.errorText = 'error text';
			await elementUpdated(element);

			expect(getMessage('error')).toBe('error text');
		});

		it('should hide helper text when set', async () => {
			element.helperText = 'helper text';
			element.errorText = 'error text';
			await elementUpdated(element);

			expect(getMessage('helper')).toBe(null);
		});
	});

	describe('success text', () => {
		it('should show success text when set', async () => {
			element.successText = 'success text';
			await elementUpdated(element);

			expect(getMessage('success')).toBe('success text');
		});

		it('should hide error and helper text when set', async () => {
			element.helperText = 'helper text';
			element.errorText = 'error text';
			element.successText = 'success text';
			await elementUpdated(element);

			expect(getMessage('helper')).toBe(null);
			expect(getMessage('error')).toBe(null);
		});
	});
});
