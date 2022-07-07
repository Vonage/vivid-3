import { fixture } from '@vivid-nx/shared';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Sidenav } from './sidenav';
import '.';

expect.extend(toHaveNoViolations);
const COMPONENT_TAG = 'vwc-sidenav';

describe('vwc-sidenav', () => {
	const sidenavItemsTemplate = `
	<vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
	<vwc-sidenav-item href="#" text="GitHub" aria-current="page"></vwc-sidenav-item>
	<vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
	`;

	let element: Sidenav;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>${sidenavItemsTemplate}</${COMPONENT_TAG}>`
		)) as Sidenav;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-sidenav', async () => {
			expect(element).toBeInstanceOf(Sidenav);
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
