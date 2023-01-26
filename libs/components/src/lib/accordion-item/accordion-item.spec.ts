import { elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {AccordionItem} from './accordion-item';
import '.';
import { accordionItemDefinition } from './definition';

const COMPONENT_TAG = 'vwc-accordion-item';

describe('vwc-accordion-item', () => {
	let element: AccordionItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as AccordionItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion-item', async () => {
			expect(accordionItemDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AccordionItem);
			expect(element.expanded).toBeFalsy();
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.meta).toEqual(undefined);
			expect(element.noIndicator).toBeFalsy();
			expect(element.heading).toEqual(undefined);
			expect(element.headinglevel).toBe(2);
		});
	});

	describe('click', () => {
		it('should open/close on click', async () => {
			const itemHeaderButton = element.shadowRoot?.querySelector('.heading-button') as HTMLButtonElement;

			const initExpandState = element.expanded;
			itemHeaderButton.click();
			const isOpenAfterFirstClick = element.expanded;
			itemHeaderButton.click();
			const isClosedAfterSecondClick = element.expanded;

			expect(initExpandState).toBeFalsy();
			expect(isOpenAfterFirstClick).toBeTruthy();
			expect(isClosedAfterSecondClick).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should render an icon when the icon property is set', async () => {
			const headerSecondChild = () => element.shadowRoot?.querySelector('.heading-button :nth-child(2)') as HTMLSpanElement;

			const secondChildBefore = headerSecondChild();
			element.icon = 'chat-solid';
			await elementUpdated(element);
			const secondChildAfter = headerSecondChild();

			expect(secondChildBefore.classList).toContain('heading-content');
			expect(secondChildBefore.classList).not.toContain('icon');
			expect(secondChildAfter.classList).not.toContain('heading-content');
			expect(secondChildAfter.classList).toContain('icon');
			expect(secondChildAfter.querySelector('vwc-icon')?.getAttribute('name')).toBe('chat-solid');
		});

		it('should render a trailing icon when the iconTrailing property is set', async () => {
			const headerLastIcon = () => element.shadowRoot?.querySelector('vwc-icon:last-of-type') as HTMLElement;

			const lastIconBefore = headerLastIcon();
			element.icon = 'chat-solid';
			element.iconTrailing = true;
			await elementUpdated(element);
			const lastIconAfter = headerLastIcon();

			expect(lastIconBefore.getAttribute('name')).toBe('chevron-down-solid');
			expect(lastIconAfter.getAttribute('name')).toBe('chat-solid');
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator', async () => {
			const indicatorExistsOnInit = !!element.shadowRoot?.querySelector('.icon');
			element.noIndicator = true;
			await elementUpdated(element);

			expect(indicatorExistsOnInit).toBeDefined();
			expect(element.shadowRoot?.querySelector('.icon')).toBeNull();
		});
	});

	describe('heading level', () => {
		it('should update heading level', async () => {
			const headerTag = () => element.shadowRoot?.querySelector(':first-child')?.tagName as string;
			const headerTagOnInit = headerTag();

			element.headinglevel = 4;
			await elementUpdated(element);

			expect(headerTagOnInit).toEqual('H2');
			expect(headerTag()).toEqual('H4');
		});
	});

	describe('aria expanded', () => {
		it('should set aria-expanded to false', async () => {
			const button = element.shadowRoot?.querySelector('.heading-button');
			expect(button?.getAttribute('aria-expanded')).toEqual('false');
		});
	});

	describe('meta', function () {
		it('should render meta', async function() {
			const metaText = 'Some meta text';
			element.meta = metaText;
			await elementUpdated(element);
			const metaWrapper = element.shadowRoot?.querySelector('.meta');
			const actualMetaText = metaWrapper?.textContent?.trim();
			expect(actualMetaText).toEqual(metaText);
		});
	});
});
