import {createFormHTML, elementUpdated, fixture, listenToFormSubmission} from '@vivid-nx/shared';
import { Checkbox } from './checkbox';
import '.';

const COMPONENT_TAG = 'vwc-checkbox';

describe('vwc-checkbox', () => {
	let element: Checkbox;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Checkbox;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-checkbox', async () => {
			expect(element).toBeInstanceOf(Checkbox);
			expect(element.checked).toBeFalsy();
			expect(element.indeterminate).toBeFalsy();
			expect(element.readOnly).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.label).toBeUndefined();
		});
	});

	describe('label', () => {
		it('set label property to node', async () => {
			const label = 'lorem';
			element.setAttribute('label', label);

			await elementUpdated(element);

			const labelEl = element.shadowRoot?.querySelector('label');
			expect(labelEl?.textContent?.trim()).toEqual(label);
		});
	});

	describe('checked', () => {
		it('should set checked class when checked is true', async () => {

			element.toggleAttribute('checked', true);
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base.checked');
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {

			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base.disabled');
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('readonly', () => {
		it('should set read only class when readonly is true', async () => {

			element.toggleAttribute('readonly', true);
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base.readonly');
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('indeterminate', () => {
		it('should set indeterminate class when indeterminate is true', async () => {

			element.indeterminate = true;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector('.base.indeterminate');
			expect(base).toBeInstanceOf(Element);
		});

		it('should set off `indeterminate` on `checked` change by user click', async () => {

			element.indeterminate = true;

			const base = element.shadowRoot?.querySelector('.base') as HTMLElement;

			base.click();

			expect(element.indeterminate).toBeFalsy();
		});

		it('should set off `indeterminate` on `checked` change by user keypress', async () => {

			element.indeterminate = true;

			const base = element.shadowRoot?.querySelector('.base') as HTMLElement;

			base.dispatchEvent(new KeyboardEvent('keypress', { key: ' ' }));

			expect(element.indeterminate).toBeFalsy();
		});
	});

	describe('form association', function () {
		it('should attach to closest form', async function () {
			const formWrapper = document.createElement('div');
			const formId = 'testFormId';
			const fieldName = 'testFieldName';
			const checked = 'on';
			const {form: formElement} = createFormHTML<Checkbox>({
				fieldName,
				formId,
				formWrapper,
				checked,
				componentTagName: COMPONENT_TAG
			});
			document.body.append(formWrapper);

			const submitPromise = listenToFormSubmission(formElement);
			formElement.requestSubmit();
			(await submitPromise).forEach((formDataValue: any, formDataKey: string) => {
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(checked);
			});
		});
	});
});
