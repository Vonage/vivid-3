import { fixture, elementUpdated, getBaseElement, createFormHTML, listenToFormSubmission } from '@vivid-nx/shared';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';

async function setBoolAttributeOn(el: Radio, attr: string): Promise<DOMTokenList> {
	el.toggleAttribute(attr, true);
	await elementUpdated(el);
	return getBaseElement(el).classList;
}

describe('vwc-radio', () => {
	let element: Radio;

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Radio;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio', async () => {
			expect(element).toBeInstanceOf(Radio);
			expect(element.checked).toBeFalsy();
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
			const classes = await setBoolAttributeOn(element, 'checked');
			expect(classes.contains('checked')).toBeTruthy();
		});
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			const classes = await setBoolAttributeOn(element, 'disabled');
			expect(classes.contains('disabled')).toBeTruthy();
		});
	});

	describe('readonly', () => {
		it('should set read only class when readonly is true', async () => {
			const classes = await setBoolAttributeOn(element, 'readonly');
			expect(classes.contains('readonly')).toBeTruthy();
		});
	});

	describe('form association', function () {
		it('should attach to closest form', async function () {
			const formWrapper = document.createElement('div');
			const formId = 'testFormId';
			const fieldName = 'testRadio';
			const checked = 'on';
			const {form: formElement} = createFormHTML<Radio>({
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
				console.log(formDataKey, formDataValue);
				
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(checked);
			});
		});
	});	
});
