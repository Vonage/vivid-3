import { fixture } from '@vivid-nx/shared';
import { Menu } from './menu';
import '.';

const COMPONENT_TAG = 'vwc-menu';

describe('vwc-menu', () => {
	let element: Menu;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Menu;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-menu', async () => {
			expect(element).toBeInstanceOf(Menu);
		});
	});
});
