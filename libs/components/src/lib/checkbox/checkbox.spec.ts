import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	listenToFormSubmission
} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
import { Checkbox } from './checkbox';
import '.';
import { checkboxDefinition } from './definition';

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
			expect(checkboxDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Checkbox);
			expect(element.checked).toBeFalsy();
			expect(element.value).toEqual('on');
			expect(element.indeterminate).toBeFalsy();
			expect(element.readOnly).toBeFalsy();
			expect(element.disabled).toBeFalsy();
			expect(element.label).toBeUndefined();
			expect(element.connotation).toBeUndefined();
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

		it('should not add hide-label class to .base if label', async function () {
			element.setAttribute('label', 'lorem');
			await elementUpdated(element);
			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).not.toContain('hide-label');
		});

		it('should add hide-label class to .base if no label and no slot', async function () {
			await elementUpdated(element);
			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).toContain('hide-label');
		});
	});

	describe('checked', () => {
		it('should set checked class when checked is true', async () => {
			element.toggleAttribute('checked', true);
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('checked')).toBeTruthy();
		});
	});

	describe('disabled', function () {
		it('should set disabled class when disabled is true', async () => {
			expect(element.shadowRoot?.querySelector('.disabled')).toBeFalsy();
			element.toggleAttribute('disabled', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.disabled')).toBeTruthy();
		});
	});

	describe('readonly', function () {
		it('should set readonly class when readonly is true', async () => {
			expect(element.shadowRoot?.querySelector('.readonly')).toBeFalsy();
			element.toggleAttribute('readonly', true);
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.readonly')).toBeTruthy();
		});
	});

	describe('indeterminate', () => {
		it('should set checked class when indeterminate is true', async () => {
			element.indeterminate = true;

			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.checked')).toBeTruthy();
		});

		it('should set `indeterminate` to false when `checked` by click', async () => {
			element.indeterminate = true;
			getBaseElement(element).click();

			expect(element.indeterminate).toBeFalsy();
			expect(element.shadowRoot?.querySelector('.checked')).toBeFalsy();
		});

		it('should set `indeterminate` to false when `checked` by keypress', async () => {
			element.indeterminate = true;
			getBaseElement(element).dispatchEvent(new KeyboardEvent('keypress', { key: ' ' }));

			expect(element.indeterminate).toBeFalsy();
		});
	});

	describe('connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			(element as any).connotation = 'cta';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.base')
				?.classList
				.contains(`connotation-${connotation}`))
				.toEqual(true);
		});
	});

	describe('helper text', function () {
		it('should render the helper text when attribute is set on checkbox', async function () {
			const helperTextElementWithoutText = element.shadowRoot?.querySelector('.helper-text');
			const helperText = 'Helper Text';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(helperTextElementWithoutText)
				.toBeNull();
			expect(element.shadowRoot?.querySelector('.helper-message')
				?.textContent
				?.trim())
				.toEqual(helperText);
		});
	});

	describe('success Text', () => {
		it('should add success class to base when successText is set', async function () {
			(element as any).successText = 'success';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('success')).toBeTruthy();
		});

		it('should show success text when successText is set', async function () {
			(element as any).successText = 'success';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.success-message')?.textContent?.trim()).toEqual('success');
		});

		it('should remove success text when undefined', async function () {
			(element as any).successText = 'success';
			await elementUpdated(element);
			(element as any).successText = undefined;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.success-message')).toBeNull();
		});
	});

	describe('error Text', () => {
		it('should add error class to base when errorText is set', async function () {
			(element as any).errorText = 'error';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('error')).toBeTruthy();
		});

		it('should show error text when errorText is set', async function () {
			(element as any).errorText = 'error';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.error-message')?.textContent?.trim()).toEqual('error');
		});

		it('should remove error text when undefined', async function () {
			(element as any).errorText = 'error';
			await elementUpdated(element);
			(element as any).errorText = undefined;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.error-message')).toBeNull();
		});

	});

	describe('form association', function () {
		it('should attach to closest form', async function () {
			const formWrapper = document.createElement('div');
			const formId = 'testFormId';
			const fieldName = 'testFieldName';
			const checked = 'on';
			const { form: formElement } = createFormHTML<Checkbox>({
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

	describe('slot', function () {
		it('should have a slot', async () => {
			await elementUpdated(element);
			expect(Boolean(element.shadowRoot?.querySelector('slot'))).toEqual(true);
		});

		beforeEach(async () => {
			element = (await fixture(`<${COMPONENT_TAG} 
			label="I agree to" error-text="You need to accept the Terms of service"
				aria-label="I agree to Vonage Terms of Service">
				<a href="https://www.vonage.com/legal/" target="_blank">Vonage Terms of Service</a>
			</${COMPONENT_TAG}>`
			)) as Checkbox;
			await elementUpdated(element);
		});

		it('should check the checkbox when clicked outside the anchor', async () => {
			element.querySelector('a')?.click();
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('checked')).toBeFalsy();

			getBaseElement(element).click();
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('checked')).toBeTruthy();
		});

		it('should check the checkbox when keypressed outside the anchor', async () => {
			await elementUpdated(element);

			element.querySelector('a')?.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, composed: true, key: 'Enter' }));
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('checked')).toBeFalsy();

			getBaseElement(element)?.dispatchEvent(new KeyboardEvent('keypress', { key: ' ' }));
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('checked')).toBeTruthy();
		});

		it('should not add hide-label class to .base if slotted', async function () {
			await elementUpdated(element);
			const baseElementClasses = getBaseElement(element)?.classList;

			expect(baseElementClasses).not.toContain('hide-label');
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Checkbox label';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		it('should render the correct a11y attributes', async () => {
			element.ariaLabel = 'Label';
			element.ariaLabelledby = 'heading1';
			element.ariaDescribedby = 'paragraph1';
			await elementUpdated(element);
			const baseElement = getBaseElement(element);
			
			expect(baseElement?.getAttribute('role')).toBe('checkbox');
			expect(baseElement?.getAttribute('aria-label')).toBe('Label');
			expect(baseElement?.getAttribute('aria-labelledby')).toBe('heading1');
			expect(baseElement?.getAttribute('aria-describedby')).toBe('paragraph1');
		});
	});
});
