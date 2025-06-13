import { axe, fixture } from '@repo/shared';
import { Nav } from './nav';
import '.';

const COMPONENT_TAG = 'vwc-nav';

describe('a11y: vwc-nav', () => {
	const navItemsTemplate = `
  <vwc-nav-item href="#" text="Profile"></vwc-nav-item>
  <vwc-nav-item href="#" text="GitHub" aria-current="page"></vwc-nav-item>
  <vwc-nav-item href="#" text="lorem ipsum"></vwc-nav-item>
  `;

	let element: Nav;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>${navItemsTemplate}</${COMPONENT_TAG}>`
		)) as Nav;
	});

	it('should pass html a11y test', async () => {
		const exposedHtmlString = element.shadowRoot?.innerHTML.replace(
			'<slot></slot>',
			navItemsTemplate
		) as string;
		expect(await axe(exposedHtmlString)).toHaveNoViolations();
	});
});
