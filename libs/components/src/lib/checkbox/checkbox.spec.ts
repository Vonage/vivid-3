import { fixture } from '@vivid-nx/shared';
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
});
