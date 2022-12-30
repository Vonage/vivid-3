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
			expect(element.expanded).toBeFalsy();
			element.shadowRoot?.querySelector('button')?.click();
			expect(element.expanded).toBeTruthy();
			element.shadowRoot?.querySelector('button')?.click();
			expect(element.expanded).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should set icon', async () => {
			expect(element.shadowRoot?.querySelector('button :nth-child(2)')?.classList).not.toContain('icon');
			element.icon = 'chat-solid';
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('button :nth-child(2)')?.classList).toContain('icon');
			expect(element.shadowRoot?.querySelector('button :nth-child(2) > vwc-icon')?.getAttribute('name')).toBe('chat-solid');
		});
		it('should set trailing icon', async () => {
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('button :last-child > vwc-icon')?.getAttribute('name')).toBe('chevron-down-solid');
			element.icon = 'chat-solid';
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('button :last-child > vwc-icon')?.getAttribute('name')).toBe('chat-solid');
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator', async () => {
			expect(element.shadowRoot?.querySelector('.icon')).toBeDefined();
			element.noIndicator = true;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.icon')).toBeNull();
		});
	});

	describe('heading level', () => {
		it('should update heading level', async () => {
			expect(element.shadowRoot?.querySelector(':first-child')?.tagName).toEqual('H2');
			element.headinglevel = 4;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector(':first-child')?.tagName).toEqual('H4');
		});
	});

	describe('aria expanded', () => {
		it('should set aria-expanded to false', async () => {
			const button = element.shadowRoot?.querySelector('button');
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
