import {elementUpdated, fixture} from '@vivid-nx/shared';
import {Textfield} from './textfield';
import '.';

const COMPONENT_TAG = 'vwc-textfield';

fdescribe('vwc-textfield', () => {
	let element: Textfield;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Textfield;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-textfield', async () => {
			expect(element)
				.toBeInstanceOf(Textfield);
		});
	});

	describe('label', function () {
		it('should set a label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeTruthy();
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label only if label is set', async function() {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
		});
	});

	describe(`properties and attributes`, function () {

	});
	
	describe(`form association`, function () {

	});
});
