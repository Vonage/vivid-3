import { fixture } from '@vivid-nx/shared';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Nav } from './nav';
import '.';

expect.extend(toHaveNoViolations);
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
	});

	describe('a11y', () => {
		it('should pass accessibility test', async () => {
			const children = Array.from(element.children)
				.map(({ shadowRoot }) => shadowRoot?.innerHTML).join('');

			const exposedHtmlString = element.shadowRoot?.innerHTML.replace('<slot></slot>', children) as string;
			const results = await axe(exposedHtmlString, {
				rules: {
					// components should not be tested as page content
					'region': { enabled: false }
				}
			});

			expect(results).toHaveNoViolations();
		});
	});
});
