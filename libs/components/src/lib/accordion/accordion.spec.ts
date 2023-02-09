import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { AccordionItem } from '../accordion-item/accordion-item';
import { accordionDefinition } from './definition';
import { Accordion } from './accordion';
import '../accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion';

describe('vwc-accordion', () => {
	function triggerAccordionUpdate() {
		const newItem = document.createElement('vwc-accordion-item') as AccordionItem;
		element.appendChild(newItem);
	}
	function toggleAccordionItem(accordionItem: AccordionItem) {
		accordionItem.expandbutton.click();
	}

	let element: Accordion;
	let accordionItem1: AccordionItem;
	let accordionItem2: AccordionItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} id="tested">
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

			toggleAccordionItem(accordionItem2);
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeTruthy();
		});

		it('should allow expansions of multiple accordion items when set to "multi"', async () => {
			element.expandmode = 'multi';

			toggleAccordionItem(accordionItem2);
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

			accordionItem1.expanded = true;
			await elementUpdated(element);
			accordionItem2.expanded = true;
			await elementUpdated(element);

			element.closeAll();
			await elementUpdated(element);

			expect(accordionItem1.expanded).toBeFalsy();
			expect(accordionItem2.expanded).toBeFalsy();
		});
	});

	describe('accordion-item keydown', () => {

		function addTwoMoreItems() {
			const anotherAccordionItem1 = document.createElement('vwc-accordion-item') as AccordionItem;
			const anotherAccordionItem2 = document.createElement('vwc-accordion-item') as AccordionItem;
			element.insertBefore(anotherAccordionItem1, accordionItem2);
			element.insertBefore(anotherAccordionItem2, accordionItem2);
			return anotherAccordionItem2;
		}

		it('should focus on next item when downkey is pressed', async () => {
			toggleAccordionItem(accordionItem1);
			accordionItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should set focus on the first element when downkey is pressed on last element', async () => {
			toggleAccordionItem(accordionItem2);
			accordionItem2.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on former item when upkey is pressed', async () => {
			toggleAccordionItem(accordionItem2);
			accordionItem2.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should set focus on the last element when upkey is pressed on first element', async () => {
			toggleAccordionItem(accordionItem1);
			accordionItem1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on the first element when home is pressed', async () => {
			const anotherAccordionItem2 = addTwoMoreItems();
			toggleAccordionItem(anotherAccordionItem2);
			accordionItem2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on the last element when end is pressed', async () => {
			const anotherAccordionItem2 = addTwoMoreItems();
			toggleAccordionItem(anotherAccordionItem2);
			accordionItem2.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});
	});

	describe('accordion-item focus', () => {
		it('should set focused element as the active item', async function () {

			element.expandmode = 'single';
			toggleAccordionItem(accordionItem2);
			const item2ExpandedBeforeFocus = accordionItem2.expanded;
			const item1ExpandedBeforeFocus = accordionItem1.expanded;

			accordionItem1.dispatchEvent(new FocusEvent('focus'));
			triggerAccordionUpdate();
			await elementUpdated(element);

			expect(item1ExpandedBeforeFocus).toBeFalsy();
			expect(item2ExpandedBeforeFocus).toBeTruthy();

			expect(accordionItem1.expanded).toBeTruthy();
			expect(accordionItem2.expanded).toBeFalsy();
		});
	});

	it('should set aria-disabled on active item in single mode', async function () {
		element.expandmode = 'single';
		toggleAccordionItem(accordionItem2);
		await elementUpdated(element);
		expect(accordionItem2.hasAttribute('aria-disabled')).toBe(true);
	});
});
