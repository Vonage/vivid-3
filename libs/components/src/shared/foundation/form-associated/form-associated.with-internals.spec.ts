import 'element-internals-polyfill';

import {
	checkableFormAssociatedCommonTests,
	formAssociatedCommonTests,
	setup,
	TestElement,
	ValidateTest,
} from './form-associated.common-tests.spec';

describe('FormAssociated when ElementInternals is supported', () => {
	formAssociatedCommonTests();

	describe('formAssociated', () => {
		it('should return true', async () => {
			expect((TestElement as any).formAssociated).toBe(true);
		});
	});

	describe('setValidity', () => {
		it('should set the validity state and message', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.validity.valid).toBe(true);

			element.setValidity(
				{
					valueMissing: true,
				},
				'Value missing'
			);

			expect(element.validity.valid).toBe(false);
			expect(element.validity.valueMissing).toBe(true);
			expect(element.validationMessage).toBe('Value missing');

			await disconnect();
		});
	});

	describe('validate', () => {
		it("should use the proxy's validity when the proxy is invalid", async () => {
			const { element } = await setup<ValidateTest>('validate-test');

			Object.defineProperty(element.proxy, 'validity', {
				value: {
					valid: false,
				},
			});

			element.validate();

			expect(element.setValidity).toHaveBeenCalledWith(
				element.proxy.validity,
				'proxy validation message',
				undefined
			);
		});

		it.each(['tooLong', 'tooShort'])(
			"should use the control's validity when the proxy is valid but control is invalid with %s reason",
			async (reason) => {
				const { element } = await setup<ValidateTest>('validate-test');

				Object.defineProperty(element.proxy, 'validity', {
					value: {
						valid: true,
					},
				});
				Object.defineProperty(element.control, 'validity', {
					value: {
						[reason]: true,
						valid: false,
					},
				});

				element.validate();

				expect(element.setValidity).toHaveBeenCalledWith(
					element.control.validity,
					'control validation message',
					undefined
				);
			}
		);

		it("should use the proxy's validity when control has no validity state", async () => {
			const { element } = await setup<ValidateTest>('validate-test');

			Object.defineProperty(element.proxy, 'validity', {
				value: {
					valid: true,
				},
			});
			Object.defineProperty(element.control, 'validity', {
				value: undefined,
			});

			element.validate();

			expect(element.setValidity).toHaveBeenCalledWith(
				element.proxy.validity,
				'proxy validation message',
				undefined
			);
		});
	});
});

describe('CheckableFormAssociated when ElementInternals is supported', () => {
	checkableFormAssociatedCommonTests();
});
