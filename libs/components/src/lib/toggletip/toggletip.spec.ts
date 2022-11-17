import { fixture } from '@vivid-nx/shared';
import { Toggletip } from './toggletip';
import '.';

const COMPONENT_TAG = 'vwc-toggletip';

describe('vwc-toggletip', () => {
	let element: Toggletip;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Toggletip;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-toggletip', async () => {
			expect(element).toBeInstanceOf(Toggletip);
		});
	});
});
