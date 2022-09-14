import { fixture } from '@vivid-nx/shared';
import { Initials } from './initials';
import '.';

const COMPONENT_TAG = 'vwc-initials';

describe('vwc-initials', () => {
	let element: Initials;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Initials;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-initials', async () => {
			expect(element).toBeInstanceOf(Initials);
		});
	});
});
