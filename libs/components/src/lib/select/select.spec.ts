import { fixture } from '@vivid-nx/shared';
import { Select } from './select';
import '.';

const COMPONENT_TAG = 'vwc-select';

describe('vwc-select', () => {
	let element: Select;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Select;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-select', async () => {
			expect(element).toBeInstanceOf(Select);
		});
	});
});
