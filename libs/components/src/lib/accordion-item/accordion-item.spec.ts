import { elementUpdated, fixture } from '@repo/shared';
import { AccordionItem } from './accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion-item';

describe('vwc-accordion-item', () => {
	let element: AccordionItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}><div>Accordion content</div></${COMPONENT_TAG}>`
		)) as AccordionItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion-item', async () => {
			expect(element).toBeInstanceOf(AccordionItem);
			expect(element.expanded).toBeFalsy();
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.meta).toEqual(undefined);
			expect(element.noIndicator).toBeFalsy();
			expect(element.heading).toEqual(undefined);
			expect(element.headinglevel).toBe(2);
			expect(element.size).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('click', () => {
		let itemHeaderButton: HTMLButtonElement;
		beforeEach(function () {
			itemHeaderButton = element.shadowRoot?.querySelector(
				'.heading-button'
			) as HTMLButtonElement;
		});

		it('should expand a closed item on click', async () => {
			element.expanded = false;
			itemHeaderButton.click();
			expect(element.expanded).toBe(true);
		});

		it('should close and expanded item on click', function () {
			element.expanded = true;
			itemHeaderButton.click();
			expect(element.expanded).toBe(false);
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});

		it('should render an icon when the icon property is set', async () => {
			const secondChildWithoutIcon = element.shadowRoot?.querySelector(
				'.heading-button :nth-child(2)'
			) as HTMLSpanElement;
			element.icon = 'chat-solid';
			await elementUpdated(element);
			const secondChildWithIcon = element.shadowRoot?.querySelector(
				'.heading-button :nth-child(1)'
			) as HTMLSpanElement;

			expect(secondChildWithoutIcon.classList).toContain('heading-content');
			expect(secondChildWithoutIcon.classList).not.toContain('icon');
			expect(secondChildWithIcon.classList).not.toContain('heading-content');
			expect(
				secondChildWithIcon.querySelector('vwc-icon')?.getAttribute('name')
			).toBe('chat-solid');
		});

		it('should render a trailing icon when the iconTrailing property is set', async () => {
			const headerLastIcon = () =>
				element.shadowRoot?.querySelector(
					'vwc-icon:last-of-type'
				) as HTMLElement;

			const lastIconWithDefaultIcon = headerLastIcon();
			element.icon = 'chat-solid';
			element.iconTrailing = true;
			await elementUpdated(element);
			const lastIconWithIconSet = headerLastIcon();

			expect(lastIconWithDefaultIcon.getAttribute('name')).toBe(
				'chevron-down-line'
			);
			expect(lastIconWithIconSet.getAttribute('name')).toBe('chat-solid');
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator', async () => {
			const indicatorExistsOnInit =
				!!element.shadowRoot?.querySelector('.icon');
			element.noIndicator = true;
			await elementUpdated(element);

			expect(indicatorExistsOnInit).toBe(true);
			expect(element.shadowRoot?.querySelector('.icon')).toBeNull();
		});
	});

	describe('heading level', () => {
		it('should update heading level', async () => {
			const headerTag = () =>
				element.shadowRoot?.querySelector(':first-child')?.tagName as string;
			const headerTagOnInit = headerTag();

			element.headinglevel = 4;
			await elementUpdated(element);

			expect(headerTagOnInit).toEqual('H2');
			expect(headerTag()).toEqual('H4');
		});
	});

	describe('heading', () => {
		it('should have a heading slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="heading"]')
			).toBeTruthy();
		});
	});

	describe('meta', function () {
		it('should render meta text when meta is set', async function () {
			const metaText = 'Some meta text';
			element.meta = metaText;
			await elementUpdated(element);
			const metaWrapper = element.shadowRoot?.querySelector('.meta');
			const actualMetaText = metaWrapper?.textContent?.trim();
			expect(actualMetaText).toEqual(metaText);
		});

		it('should have a meta slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="meta"]')
			).toBeTruthy();
		});
	});

	describe('size', () => {
		it('sets correct internal size style', async () => {
			const size = 'condensed';
			element.size = size;
			await elementUpdated(element);

			const accordionButton =
				element.shadowRoot?.querySelector('.heading-button');
			const accordionRegion = element.shadowRoot?.querySelector('.region');

			expect(accordionButton?.classList.contains(`size-${size}`)).toBeTruthy();
			expect(accordionRegion?.classList.contains(`size-${size}`)).toBeTruthy();
		});
	});

	describe('a11y attributes', () => {
		it('should link the header button and content region using aria', async () => {
			const TEST_ID = 'test';
			element.id = TEST_ID;
			element.heading = 'Accordion item heading';
			await elementUpdated(element);

			const accordionButton = element.shadowRoot?.getElementById(TEST_ID);
			const accordionRegion = element.shadowRoot?.getElementById(
				`${TEST_ID}-panel`
			);

			expect(accordionButton?.getAttribute('aria-controls')).toBe(
				`${TEST_ID}-panel`
			);
			expect(accordionRegion?.getAttribute('aria-labelledby')).toBe(TEST_ID);
		});

		it('should set aria-expanded to false when closed', async () => {
			const button = element.shadowRoot?.querySelector('.heading-button');
			expect(button?.getAttribute('aria-expanded')).toEqual('false');
		});

		it('should set aria-expanded to true when expanded', async () => {
			element.expanded = true;
			await elementUpdated(element);

			const button = element.shadowRoot?.querySelector('.heading-button');

			expect(button?.getAttribute('aria-expanded')).toEqual('true');
		});
	});
});
