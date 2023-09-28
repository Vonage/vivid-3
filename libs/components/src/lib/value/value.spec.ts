import {
	createFormHTML,
	fixture,
	listenToFormSubmission,
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Observable } from '@microsoft/fast-element';
import { Value } from './value';
import { valueDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-value';

describe('vwc-value', () => {
	let element: Value;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Value;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tooltip', async () => {
			expect(valueDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Value);
			expect(element.key).toBeUndefined();
		});
	});

	describe('updateValue', () => {
		it('should update value', async () => {
			element.updateValue('new value');

			expect(element.value).toEqual('new value');
		});

		it.each(['input', 'change'])('should emit a %s event', async (eventName) => {
			const spy = jest.fn();
			element.addEventListener(eventName, spy);

			element.updateValue('new value');

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('disabled', () => {
		let parent: HTMLFormElement;
		beforeEach(async () => {
			element.remove();
			parent = document.createElement('form');
			document.body.appendChild(parent);
		});
		afterEach(() => {
			parent.remove();
		});

		it('should mirror observable disabled value from parent', async () => {
			const INITIAL_DISABLED_VALUE = true;
			const CHANGED_DISABLED_VALUE = false;
			parent.disabled = INITIAL_DISABLED_VALUE;
			parent.appendChild(element);

			const elementsInitialDisabledValue = element.disabled;

			parent.disabled = CHANGED_DISABLED_VALUE;
			Observable.notify(parent, 'disabled');

			expect(elementsInitialDisabledValue).toBe(INITIAL_DISABLED_VALUE);
			expect(element.disabled).toBe(CHANGED_DISABLED_VALUE);
		});
	});

	describe('formDisabledCallback', () => {
		it('should do nothing', async () => {
			element.formDisabledCallback();
			expect(element.disabled).toBe(false);
		});
	});

	describe('formResetCallback', () => {
		it('should do nothing', async () => {
			element.initialValue = 'initial value';
			element.value = 'new value';
			element.formResetCallback();
			expect(element.value).toBe('new value');
		});
	});

	describe('form association', () => {
		const fieldValue = 'value';
		const formId = 'test-form-id';
		const fieldName = 'test-field';
		let formWrapper: HTMLElement;

		beforeEach(() => {
			formWrapper = document.createElement('div');
			document.body.appendChild(formWrapper);
		});

		afterEach(() => {
			formWrapper.remove();
		});

		it('should attach to closest form', async () => {
			const { form: formElement } = createFormHTML<Value>({
				componentTagName: COMPONENT_TAG,
				fieldName,
				fieldValue,
				formId,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});

		it('should attach to form when given form id', async () => {
			const { otherForm } = createFormHTML<Value>({
				fieldName,
				fieldValue,
				formId,
				otherFormId: 'otherFormId',
				componentTagName: COMPONENT_TAG,
				formWrapper,
			});

			const submitPromise = listenToFormSubmission(otherForm);
			otherForm.requestSubmit();

			(await submitPromise).forEach((formDataValue, formDataKey) => {
				expect(formDataKey).toEqual(fieldName);
				expect(formDataValue).toEqual(fieldValue);
			});
		});
	});
});
