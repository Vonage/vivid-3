import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { Elevation } from './../elevation/elevation';
import { Header } from './header';
import '.';

const COMPONENT_TAG = 'vwc-header';
const ELEVATION_SELECTOR = 'vwc-elevation';

describe('vwc-header', () => {
	let element: Header;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Header;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-header', async () => {
			expect(element).toBeInstanceOf(Header);
			expect(element.elevationShadow).toBeFalsy();
			expect(element.alternate).toBeFalsy();
		});
	});

	describe('elevation shadow', () => {
		it('should default elevation to no-shadow', async () => {
			const elevation = element.shadowRoot?.querySelector(ELEVATION_SELECTOR) as Elevation;

			expect(elevation.noShadow).toBeTruthy();
		});

		it('should set elevation with shadow ', async () => {
			element.elevationShadow = true;
			await elementUpdated(element);

			const elevation = element.shadowRoot?.querySelector(ELEVATION_SELECTOR) as Elevation;

			expect(elevation.noShadow).toBeFalsy();
		});
	});

	describe('alternate', () => {
		it('should add "alternate" class to base and part to container', async () => {
			element.alternate = true;
			await elementUpdated(element);

			const container = element.shadowRoot?.querySelector('.container') as HTMLElement;

			expect(container.getAttribute('part')).toEqual('vvd-theme-alternate');
		});
	});
});
