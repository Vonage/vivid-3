import { axe, fixture } from '@vivid-nx/shared';
import { Nav } from './nav';
import '.';

const COMPONENT_TAG = 'vwc-nav';

describe('vwc-nav', () => {
	const navItemsTemplate = `
	<vwc-nav-item href="#" text="Profile"></vwc-nav-item>
	<vwc-nav-item href="#" text="GitHub" aria-current="page"></vwc-nav-item>
	<vwc-nav-item href="#" text="lorem ipsum"></vwc-nav-item>
	`;

	let element: Nav;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>${navItemsTemplate}</${COMPONENT_TAG}>`
		)) as Nav;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-nav', async () => {
			expect(element).toBeInstanceOf(Nav);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			const exposedHtmlString = element.shadowRoot?.innerHTML.replace(
				'<slot></slot>',
				navItemsTemplate
			) as string;
			expect(await axe(exposedHtmlString)).toHaveNoViolations();
		});
	});
});
