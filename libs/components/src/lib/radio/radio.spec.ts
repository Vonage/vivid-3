import { fixture } from '@vivid-nx/shared';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';

describe('vwc-radio', () => {
	let element: Radio;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Radio;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-radio', async () => {
			expect(element).toBeInstanceOf(Radio);
		});
	});
});
