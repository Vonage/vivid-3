import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { AccordionItem } from '../accordion-item/accordion-item';
import { Accordion } from './accordion';
import '.';
import '../accordion-item';

const COMPONENT_TAG = 'vwc-accordion';

describe('vwc-accordion', () => {
	let element: Accordion;
	let accordionItem1: AccordionItem;
	let accordionItem2: AccordionItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-accordion-item heading="accordion item" id="item1"><p>content</p></vwc-accordion-item>
				<vwc-accordion-item heading="accordion item" id="item2"><p>content</p></vwc-accordion-item>
			</${COMPONENT_TAG}>`
		)) as Accordion;
		await elementUpdated(element);

		accordionItem1 = element.querySelector('#item1') as AccordionItem;
		accordionItem2 = element.querySelector('#item2') as AccordionItem;
		await elementUpdated(accordionItem1);
		await elementUpdated(accordionItem2);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion', async () => {
			expect(element).toBeInstanceOf(Accordion);
			expect(element.multi).toBeFalsy();
		});
	});

	describe('non multi', () => {
		it('should only allow one accordion items open at a time', async () => {
			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeFalsy();

			accordionItem1.open = true;
			await elementUpdated(element);
			accordionItem2.open = true;
			await elementUpdated(element);

			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeTruthy();
		});
	});

	describe('multi', () => {
		it('should allow all accordion items open when multi', async () => {
			element.multi = true;
			await elementUpdated(element);

			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeFalsy();

			accordionItem1.open = true;
			await elementUpdated(element);
			accordionItem2.open = true;
			await elementUpdated(element);

			expect(accordionItem1.open).toBeTruthy();
			expect(accordionItem2.open).toBeTruthy();
		});
	});


	describe('close all', () => {
		it('should close all accordion items', async () => {
			element.multi = true;
			await elementUpdated(element);

			accordionItem1.open = true;
			await elementUpdated(element);
			accordionItem2.open = true;
			await elementUpdated(element);

			expect(accordionItem1.open).toBeTruthy();
			expect(accordionItem2.open).toBeTruthy();

			element.closeAll();
			await elementUpdated(element);

			expect(accordionItem1.open).toBeFalsy();
			expect(accordionItem2.open).toBeFalsy();
		});
	});
});
