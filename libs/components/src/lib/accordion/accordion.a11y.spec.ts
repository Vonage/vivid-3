import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import type { AccordionItem } from '../accordion-item/accordion-item';
import { Accordion } from './accordion';
import '../accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion';

const COMPONENT_HTML = `
	<${COMPONENT_TAG} id="tested">
		<vwc-accordion-item heading="accordion item 1" id="item1"><p>content</p></vwc-accordion-item>
		<vwc-accordion-item heading="accordion item 2" id="item2"><p>content</p></vwc-accordion-item>
	</${COMPONENT_TAG}>
`;

describe('a11y: vwc-accordion', () => {
	let element: Accordion;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(COMPONENT_HTML)) as Accordion;
		await elementUpdated(element);
		const accordionItem1 = element.querySelector('#item1') as AccordionItem;
		const accordionItem2 = element.querySelector('#item2') as AccordionItem;
		await elementUpdated(accordionItem1);
		await elementUpdated(accordionItem2);
	});

	it('should pass HTML a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
