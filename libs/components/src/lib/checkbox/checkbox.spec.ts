import { elementUpdated, fixture } from '@vivid-nx/shared';
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
	});
});
