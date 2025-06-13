import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import {
	allAriaPropertiesExcept,
	itShouldDelegateAriaAttributes,
} from '../../shared/aria/should-delegate-aria.spec';
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

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('elevation shadow', () => {
		it('should default elevation to no-shadow', async () => {
			const elevation = element.shadowRoot?.querySelector(
				ELEVATION_SELECTOR
			) as Elevation;

			expect(elevation.noShadow).toEqual(true);
		});

		it('should set elevation with shadow ', async () => {
			element.elevationShadow = true;
			await elementUpdated(element);

			const elevation = element.shadowRoot?.querySelector(
				ELEVATION_SELECTOR
			) as Elevation;

			expect(elevation.noShadow).toBeFalsy();
		});
	});

	describe('alternate', () => {
		it('should add "alternate" class to base and part to container', async () => {
			element.alternate = true;
			await elementUpdated(element);

			const container = element.shadowRoot?.querySelector(
				'.container'
			) as HTMLElement;

			expect(container.getAttribute('part')).toEqual('vvd-theme-alternate');
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			allAriaPropertiesExcept([])
		);
	});
});
