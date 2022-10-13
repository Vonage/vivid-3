import { createFormHTML, elementUpdated, fixture, getBaseElement, listenToFormSubmission } from '@vivid-nx/shared';
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
		let base: HTMLElement;
		beforeEach(() => base = getBaseElement(element));
		
		it('should set the element property and the base class when the attribute is set', async () => {
			const classes = await setBoolAttributeOn(element, 'checked');
			expect(element.checked).toBeTruthy();
			expect(classes.contains('checked')).toBeTruthy();
		});

		it('should set the element attribute and the base class when the property is set', async () => {
			element.checked = true;
			await elementUpdated(element);
			expect(base.classList.contains('checked')).toBeTruthy();
			expect(element.checked).toBeTruthy();
		});

		const sendEventAndVerifyChecked = async (e: Event) => {
			base.dispatchEvent(e);
			await elementUpdated(element);
			expect(element.checked).toBeTruthy();
		};

		it('should switch to checked when clicked',
			async () => await sendEventAndVerifyChecked(new MouseEvent('click')));

		it('should switch to checked when space is pressed',
			async () => await sendEventAndVerifyChecked(new KeyboardEvent('keypress', { key: ' ' })));
	});

	describe('disabled', () => {
		it('should set disabled class when disabled is true', async () => {
			const classes = await setBoolAttributeOn(element, 'disabled');
			expect(classes.contains('disabled')).toBeTruthy();
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
				expect(formDataKey)
					.toEqual(fieldName);
				expect(formDataValue)
					.toEqual(checked);
			});
		});
	});	
});
