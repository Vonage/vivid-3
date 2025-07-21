import 'element-internals-polyfill';

import { fixture } from '@repo/shared';
import { customElement } from '@microsoft/fast-element';
import { FormAssociated } from '../../foundation/form-associated/form-associated';
import { VividElement } from '../../foundation/vivid-element/vivid-element';
import { FormElement } from './form-element';

const VALIDATION_MESSAGE = 'Validation Message';

describe('FormElement mixin', function () {
	function enableValidation() {
		dispatchBlurEvent();
		instance.dirtyValue = true;
	}

	function dispatchBlurEvent() {
		instance.dispatchEvent(new Event('blur'));
	}

	@customElement('form-element-class')
	class FormElementClass extends FormElement(FormAssociated(VividElement)) {
		override proxy = document.createElement('input');

		override get validationMessage() {
			return VALIDATION_MESSAGE;
		}
	}

	let instance: FormElementClass;

	beforeEach(async function () {
		instance = (await fixture(
			'<form-element-class></form-element-class>'
		)) as FormElementClass;
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
