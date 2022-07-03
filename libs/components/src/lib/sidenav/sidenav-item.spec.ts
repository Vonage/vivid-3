import { fixture } from '@vivid-nx/shared';
import { Sidenav } from './sidenav';
import '.';

const COMPONENT_TAG = 'vwc-sidenav';

describe('vwc-sidenav', () => {
	let element: Sidenav;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Sidenav;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-sidenav', async () => {
			expect(element).toBeInstanceOf(Sidenav);
		});
	});
});
