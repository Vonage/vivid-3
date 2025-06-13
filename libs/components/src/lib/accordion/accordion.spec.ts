import { elementUpdated, fixture } from '@repo/shared';
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

const EMPTY_COMPONENT_HTML = `<${COMPONENT_TAG} id="tested"></${COMPONENT_TAG}>`;

describe('vwc-accordion', () => {
	function triggerAccordionUpdate() {
		const newItem = document.createElement(
			'vwc-accordion-item'
		) as AccordionItem;
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
		element = (await fixture(COMPONENT_HTML)) as Accordion;
		await elementUpdated(element);

		accordionItem1 = element.querySelector('#item1') as AccordionItem;
		accordionItem2 = element.querySelector('#item2') as AccordionItem;
		await elementUpdated(accordionItem1);
		await elementUpdated(accordionItem2);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion', async () => {
			expect(element).toBeInstanceOf(Accordion);
			expect(element.expandmode).toBe('single');
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('empty', () => {
		it('should not set the accordionIds property', async () => {
			element = (await fixture(EMPTY_COMPONENT_HTML)) as Accordion;
			await elementUpdated(element);
			expect(element.accordionIds).toBe(undefined);
		});

		it('should handle all accordion items being removed without error', async () => {
			expect(() => {
				accordionItem1.remove();
				accordionItem2.remove();
			}).not.toThrow();
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

		it('should open the first accordion-item if none of the others are set to expanded', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG} expand-mode="single">
				<vwc-accordion-item heading="accordion item" id="item1"><p>content</p></vwc-accordion-item>
				<vwc-accordion-item heading="accordion item" id="item2"><p>content</p></vwc-accordion-item>
			</${COMPONENT_TAG}>`
			)) as Accordion;
			await elementUpdated(element);

			expect(element.expandmode).toBe('single');
			expect((element.children[0] as AccordionItem).expanded).toBeTruthy();
			expect((element.children[1] as AccordionItem).expanded).toBeFalsy();
		});

		it('should open the accordion-item with expanded set', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG} expand-mode="single">
				<vwc-accordion-item heading="accordion item" id="item1"><p>content</p></vwc-accordion-item>
				<vwc-accordion-item heading="accordion item" id="item2" expanded><p>content</p></vwc-accordion-item>
			</${COMPONENT_TAG}>`
			)) as Accordion;
			await elementUpdated(element);

			expect(element.expandmode).toBe('single');
			expect((element.children[0] as AccordionItem).expanded).toBeFalsy();
			expect((element.children[1] as AccordionItem).expanded).toBeTruthy();
		});

		it('should open the first accordion-item with expanded set', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG} expand-mode="single">
				<vwc-accordion-item heading="accordion item" id="item1" expanded><p>content</p></vwc-accordion-item>
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
			const anotherAccordionItem1 = document.createElement(
				'vwc-accordion-item'
			) as AccordionItem;
			const anotherAccordionItem2 = document.createElement(
				'vwc-accordion-item'
			) as AccordionItem;
			element.insertBefore(anotherAccordionItem1, accordionItem2);
			element.insertBefore(anotherAccordionItem2, accordionItem2);
			return anotherAccordionItem2;
		}

		it('should focus on next item when downkey is pressed', async () => {
			toggleAccordionItem(accordionItem1);
			accordionItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown' })
			);
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should set focus on the first element when downkey is pressed on last element', async () => {
			toggleAccordionItem(accordionItem2);
			accordionItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowDown' })
			);
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on former item when upkey is pressed', async () => {
			toggleAccordionItem(accordionItem2);
			accordionItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowUp' })
			);
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should set focus on the last element when upkey is pressed on first element', async () => {
			toggleAccordionItem(accordionItem1);
			accordionItem1.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowUp' })
			);
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on the first element when home is pressed', async () => {
			const anotherAccordionItem2 = addTwoMoreItems();
			toggleAccordionItem(anotherAccordionItem2);
			accordionItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Home' })
			);
			expect(accordionItem1.contains(document.activeElement)).toBeTruthy();
		});

		it('should focus on the last element when end is pressed', async () => {
			const anotherAccordionItem2 = addTwoMoreItems();
			toggleAccordionItem(anotherAccordionItem2);
			accordionItem2.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'End' })
			);
			expect(accordionItem2.contains(document.activeElement)).toBeTruthy();
		});

		it('should ignore key presses on accordion item slotted content', async () => {
			const button = document.createElement('button');
			accordionItem1.appendChild(button);
			button.focus();

			button.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'End', bubbles: true })
			);

			expect(document.activeElement).toBe(button);
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

	it('should ignore change events bubbled up from slotted accordion item content', () => {
		const input = document.createElement('button');
		accordionItem2.appendChild(input);

		input.dispatchEvent(new Event('change', { bubbles: true }));

		expect(element.activeid).toBe('item1');
	});

	describe('a11y attributes', () => {
		it('should set aria-disabled on active item in single mode', async function () {
			element = (await fixture(`
				<${COMPONENT_TAG} id="tested">
					<vwc-accordion-item heading="accordion item 1" id="item1"><p>content</p></vwc-accordion-item>
					<vwc-accordion-item heading="accordion item 2" expanded id="item2"><p>content</p></vwc-accordion-item>
				</${COMPONENT_TAG}>`)) as Accordion;
			await elementUpdated(element);
			accordionItem1 = element.querySelector('#item2') as AccordionItem;

			expect(accordionItem1.hasAttribute('aria-disabled')).toBe(true);
		});
	});
});
