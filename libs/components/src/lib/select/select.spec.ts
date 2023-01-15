import {elementUpdated, fixture} from '@vivid-nx/shared';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';

describe('vwc-select', () => {
	let element: Select;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Select;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-select', async () => {
			expect(element).toBeInstanceOf(Select);
			expect(element.open).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.shape).toEqual(undefined);
			expect(element.appearance).toEqual(undefined);
			expect(element.label).toEqual(undefined);
			expect(element.multiple).toBeUndefined();

		});
	});

	describe('label', function () {
		it('should set a select label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});
	});

	describe('disabled', function () {
		it('should set disabled class for select when disabled is true', async () => {
			const disableClassExistsWithDisabledFalse = Boolean(element.shadowRoot?.querySelector('.control.disabled'));

			element.toggleAttribute('disabled', true);
			await elementUpdated(element);

			expect(disableClassExistsWithDisabledFalse).toBeFalsy();
			expect(element.shadowRoot?.querySelector('.control.disabled')).toBeTruthy();
		});
	});

	describe('multiple', () => {
		it('should set multiple attribute on the element', async () => {
			const multipleAttributeExistsWithMultipleFalse = element.hasAttribute('multiple');

			element.multiple = true;
			await elementUpdated(element);

			expect(multipleAttributeExistsWithMultipleFalse).toBeFalsy();
			expect(element.hasAttribute('multiple')).toBeTruthy();
		});	

		it('should leave popup open when set', async function () {
			const popup = element.shadowRoot?.querySelector('.popup');

			element.multiple = true;
			element.open = true;
			await elementUpdated(element);
			expect(popup?.hasAttribute('open')).toBeTruthy();
		});
	});

	describe('open', function () {
		it('should set open when clicked', async () => {
			const openStateBeforeClick = element.open;

			element.click();
			await elementUpdated(element);

			expect(openStateBeforeClick).toEqual(false);
			expect(element.open).toEqual(true);
		});
	});

	describe('appearance', function () {
		it('should set the shape class on the root', async function () {
			const appearance = 'fieldset';
			element.setAttribute('appearance', appearance);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(control?.classList.contains(`appearance-${appearance}`))
				.toBeTruthy();
		});
	});

	describe('shape', function () {
		it('should set the shape appearance class on the base', async function () {
			const shape = 'pill';
			element.setAttribute('shape', shape);
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');

			expect(control?.classList.contains(`shape-${shape}`))
				.toBeTruthy();
		});
	});


	describe('validation', function () {
		function setValidityToError(errorMessage = 'error') {
			element.setValidity({badInput: true}, errorMessage);
			element.validate();
		}

		function setToBlurred() {
			element.dispatchEvent(new Event('blur'));
		}

		it('should set error message to empty string when pristine', async function () {
			setValidityToError();
			await elementUpdated(element);
			expect(element.errorValidationMessage)
				.toEqual('');
		});

		it('should validate after a blur', async function () {
			const errorMessage = 'Error Text';
			element.dirtyValue = true;
			setValidityToError(errorMessage);
			setToBlurred();
			await elementUpdated(element);
			expect(element.errorValidationMessage).toEqual(errorMessage);
		});
	});
});
