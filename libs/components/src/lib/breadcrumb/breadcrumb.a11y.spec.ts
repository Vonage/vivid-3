import { axe } from '@repo/shared/test-utils/axe';
import { fixture } from '@repo/shared/test-utils/fixture';
import type { Breadcrumb } from './breadcrumb';
import '../breadcrumb-item';
import '.';

const COMPONENT_TAG = 'vwc-breadcrumb';

describe('a11y: vwc-breadcrumb', () => {
	let element: Breadcrumb;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = fixture(`
      <${COMPONENT_TAG}>
        <vwc-breadcrumb-item href='#' text='breadcrumb'></vwc-breadcrumb-item>
        <vwc-breadcrumb-item text='...'></vwc-breadcrumb-item>
        <vwc-breadcrumb-item href='#' text='breadcrumb'></vwc-breadcrumb-item>
        <vwc-breadcrumb-item text='breadcrumb'></vwc-breadcrumb-item>
      </${COMPONENT_TAG}>
    `) as Breadcrumb;
	});

	it('should pass html a11y test', async () => {
		const children = Array.from(element.children)
			.map(({ shadowRoot }) => shadowRoot?.innerHTML)
			.join('');
		const exposedHtmlString = element.shadowRoot?.innerHTML.replace(
			'<slot></slot>',
			children
		) as string;

		expect(await axe(exposedHtmlString)).toHaveNoViolations();
	});
});
