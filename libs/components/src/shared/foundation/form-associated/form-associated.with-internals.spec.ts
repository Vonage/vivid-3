import 'element-internals-polyfill';

import {
	checkableFormAssociatedCommonTests,
	formAssociatedCommonTests,
	setup,
	TestElement,
} from './form-associated.common-tests.spec.ts';

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
});

describe('CheckableFormAssociated when ElementInternals is supported', () => {
	checkableFormAssociatedCommonTests();
});
