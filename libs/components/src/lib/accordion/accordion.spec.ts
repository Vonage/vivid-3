import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { AccordionItem } from '../accordion-item/accordion-item';
import { Accordion } from './accordion';
import '.';

const COMPONENT_TAG = 'vwc-accordion';

describe('vwc-accordion', () => {
	let element: Accordion;
	let accordionItem1: AccordionItem;
	let accordionItem2: AccordionItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-accordion-item id="item1"></vwc-accordion-item>
				<vwc-accordion-item id="item2"></vwc-accordion-item>
			</${COMPONENT_TAG}>`
		)) as Accordion;
		await elementUpdated(element);

		accordionItem1 = element.querySelector('#item1') as AccordionItem;
		accordionItem2 = element.querySelector('#item2') as AccordionItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion', async () => {
			expect(element).toBeInstanceOf(Accordion);
			expect(element.multi).toBeFalsy();
		});
	});

	describe('accordion visibility', () => {
		it('should only allow one expansion panel open at a time', async () => {
			console.log(accordionItem1.open);
			console.log(accordionItem2.open);

			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeFalsy();

			accordionItem1.open = true;
			accordionItem2.open = true;
			await elementUpdated(element);

			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeTruthy();
		});
	});
});
