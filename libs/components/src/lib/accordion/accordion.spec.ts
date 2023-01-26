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

	describe('expandmode', () => {
		it('should allow only one accordion item expanded when set to "single"', async () => {
			element.expandmode = 'single';
			accordionItem1.expanded = true;

			accordionItem2.shadowRoot?.querySelector('button')?.click();
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeTruthy();
		});

		it('should allow expansions of multiple accordion items when set to "multi"', async () => {
			element.expandmode = 'multi';

			accordionItem2.shadowRoot?.querySelector('button')?.click();
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeTruthy();
		});

		it('should expand multiple items by child.expanded in single mode::DOCUMENTED BUG SHOULD FAIL ONCE FIXED IN FAST!', async () => {
			element.expandmode = 'single';
			accordionItem2.expanded = true;
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeTruthy();
		});

		it('should always open the first accordion-item::DOCUMENTED BUG SHOULD FAIL ONCE FIXED IN FAST! ', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG} expand-mode="single">
				<vwc-accordion-item heading="accordion item" id="item1"><p>content</p></vwc-accordion-item>
				<vwc-accordion-item heading="accordion item" id="item2" expanded><p>content</p></vwc-accordion-item>
			</${COMPONENT_TAG}>`
			)) as Accordion;
			await elementUpdated(element);

			expect(element.expandmode).toBe('single');
			expect((element.children[0] as AccordionItem).expanded).toBeTruthy();
			expect((element.children[1] as AccordionItem).expanded).toBeFalsy();
		});
	});

	describe('close all', () => {
		it('should close all accordion items', async () => {
			element.expandmode = 'multi';
			await elementUpdated(element);

			// opening all (2) accordion items
			accordionItem1.expanded = true;
			await elementUpdated(element);
			accordionItem2.expanded = true;
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeTruthy();

			// closing all accordion items
			element.closeAll();
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeFalsy();
		});
	});
});
