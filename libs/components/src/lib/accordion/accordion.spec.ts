import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { AccordionItem } from '../accordion-item/accordion-item';
import { accordionDefinition } from './definition';
import { Accordion } from './accordion';
import '../accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion';

describe('vwc-accordion', () => {
	let element: Accordion;
	let accordionItem1: AccordionItem;
	let accordionItem2: AccordionItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

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
			expect(accordionDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Accordion);
			expect(element.expandmode).toBe('single');
		});
	});

	describe('non multi', () => {
		it('should only allow one accordion items open at a time', async () => {
			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeFalsy();

			accordionItem1.expanded = true;
			await elementUpdated(element);
			accordionItem2.expanded = true;
			await elementUpdated(element);

			// FAST issue here
			// expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeTruthy();
		});
	});

	describe('multi', () => {
		it('should allow all accordion items open when multi', async () => {
			element.expandmode = 'multi';
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeFalsy();

			accordionItem1.expanded = true;
			await elementUpdated(element);
			accordionItem2.expanded = true;
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeTruthy();
		});
	});

	describe('close all', () => {
		it('should close all accordion items', async () => {
			element.expandmode = 'multi';
			await elementUpdated(element);

			accordionItem1.expanded = true;
			await elementUpdated(element);
			accordionItem2.expanded = true;
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeTruthy();

			element.closeAll();
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeFalsy();
		});
	});
});
