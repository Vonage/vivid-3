import 'element-internals-polyfill';

import { fixture } from '@repo/shared';
import { customElement } from '@microsoft/fast-element';
import { FormAssociated } from '../../foundation/form-associated/form-associated';
import { VividElement } from '../../foundation/vivid-element/vivid-element';
import { FormElement } from './form-element';
import { WithErrorText } from './with-error-text';

const VALIDATION_MESSAGE = 'Validation Message';

describe('WithErrorText mixin', function () {
	function enableValidation() {
		instance.dispatchEvent(new Event('blur'));
		instance.dirtyValue = true;
	}

	class BaseClass extends FormAssociated(VividElement) {
		override proxy = document.createElement('input');

		override get validationMessage() {
			return VALIDATION_MESSAGE;
		}
	}
	BaseClass.prototype.setValidity = vi.fn();
	BaseClass.prototype.validate = vi.fn();

	@customElement('error-text-class')
	class ErrorTextClass extends WithErrorText(FormElement(BaseClass)) {}

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

		expect(BaseClass.prototype.validate).not.toHaveBeenCalled();
	});

	it('should restore validity and errorValidationMessage when errorText is cleared', async () => {
		enableValidation();
		instance.errorText = 'Error message';

		instance.errorText = '';

		expect(BaseClass.prototype.setValidity).toHaveBeenLastCalledWith(
			expect.objectContaining({}),
			'',
			undefined
		);
		expect(instance.errorValidationMessage).toEqual(VALIDATION_MESSAGE);
	});

	it('should allows calls to validate again when errorText is cleared', async () => {
		instance.errorText = 'Error message';
		instance.errorText = '';

		instance.validate();

		expect(BaseClass.prototype.validate).toHaveBeenCalled();
	});
});
