import { fixture } from '@vivid-nx/shared';
import { SidenavItem } from './sidenav-item';
import '.';

const COMPONENT_TAG = 'vwc-sidenav-item';

describe('vwc-sidenav-item', () => {
	let element: SidenavItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as SidenavItem;
	});

	it('should be initialized as a vwc-sidenav-item', async () => {
		expect(element).toBeInstanceOf(SidenavItem);
	});
});
