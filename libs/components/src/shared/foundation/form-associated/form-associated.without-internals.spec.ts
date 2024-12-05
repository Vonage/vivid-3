import {
	checkableFormAssociatedCommonTests,
	formAssociatedCommonTests,
	setup,
	TestElement,
	ValidateTest,
} from './form-associated.common-tests.spec.ts';

describe('FormAssociated when ElementInternals is not supported', () => {
	formAssociatedCommonTests();

	describe('formAssociated', () => {
		it('should return false', async () => {
			expect((TestElement as any).formAssociated).toBe(false);
		});
	});

	describe('setValidity', () => {
		it('should set the validity and message but does not support state flags', async () => {
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
			expect(element.validity.valueMissing).toBe(false);
			expect(element.validationMessage).toBe('Value missing');

			await disconnect();
		});
	});

	describe('detachProxy', () => {
		it('should remove the proxy element from the DOM', async () => {
			const { connect, disconnect, element } = await setup();

			await connect();

			expect(element.proxy.isConnected).toBe(true);

			element.detachProxy();

			expect(element.proxy.isConnected).toBe(false);

			await disconnect();
		});
	});

	it.each(['change', 'click'])(
		'should stop %s events of the proxy from propagating',
		async (eventName) => {
			const { connect, disconnect, element } = await setup();

			await connect();

			const event = new Event(eventName);
			const spy = jest.fn();
			element.addEventListener(eventName, spy);

			element.proxy.dispatchEvent(event);

			expect(spy).not.toHaveBeenCalled();

			await disconnect();
		}
	);

	describe('validate', () => {
		it('should not call setValidity when element internals are not supported', async () => {
			const { element } = await setup<ValidateTest>('validate-test');

			element.validate();

			expect(element.setValidity).not.toHaveBeenCalled();
		});
	});
});

describe('CheckableFormAssociated when ElementInternals is not supported', () => {
	checkableFormAssociatedCommonTests();
});
