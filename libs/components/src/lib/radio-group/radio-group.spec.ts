import { fixture } from '@vivid-nx/shared';
import { RadioGroup } from './radio-group';
import '.';

const COMPONENT_TAG = 'vwc-radio-group';

describe('vwc-radio-group', () => {
	let element: RadioGroup;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RadioGroup;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio-group', async () => {
			expect(element).toBeInstanceOf(RadioGroup);
		});
	});
});
