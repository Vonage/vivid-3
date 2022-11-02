import { fixture } from '@vivid-nx/shared';
import { Switch } from './switch';
import '.';

const COMPONENT_TAG = 'vwc-switch';

describe('vwc-switch', () => {
	let element: Switch;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Switch;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-switch', async () => {
			expect(element).toBeInstanceOf(Switch);
		});
	});
});
