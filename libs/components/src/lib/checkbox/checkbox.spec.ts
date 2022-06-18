import {createFormHTML, fixture, listenToFormSubmission} from '@vivid-nx/shared';
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
