import { fixture } from '@vivid-nx/shared';
import { MenuItem } from './menu-item';
import '.';

const COMPONENT_TAG = 'vwc-menu-item';

describe('vwc-menu-item', () => {
	let element: MenuItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as MenuItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu-item', async () => {
			expect(element).toBeInstanceOf(MenuItem);
		});
	});


});
