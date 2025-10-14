import {
	elementUpdated,
	fixture,
	getBaseElement,
	setProperty,
} from '@repo/shared';
import { Appearance } from '../enums';
import { Icon } from '../icon/icon';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Card } from './card';
import '.';

const COMPONENT_TAG = 'vwc-card';

describe('vwc-card', () => {
	let element: Card;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Card;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-card', async () => {
			expect(element).toBeInstanceOf(Card);
			expect(element.icon).toBeUndefined();
			expect(element.appearance).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('header', () => {
		it('should set headline property to header-title', async () => {
			const headline = 'card headline';
			element.headline = headline;
			await elementUpdated(element);

			const headerTitle = element.shadowRoot?.querySelector('.header-headline');
			expect(headerTitle?.textContent?.trim()).toEqual(headline);
			expect(headerTitle?.id).toBe('card-headline');
			expect(getBaseElement(element)?.getAttribute('aria-labelledby')).toBe(
				'card-headline'
			);
		});

		it('should set subtitle property to .header-subtitle', async () => {
			const subtitle = 'card subtitle';
			element.subtitle = subtitle;
			await elementUpdated(element);

			const headerSubtitle =
				element.shadowRoot?.querySelector('.header-subtitle');
			expect(headerSubtitle?.textContent?.trim()).toEqual(subtitle);
		});

		it('should render headerContent if headline is set', async function () {
			element.headline = 'card title';
			await elementUpdated(element);

			const headerContent =
				element.shadowRoot?.querySelector('.header-content');
			expect(headerContent).toBeTruthy();
		});

		it('should render headerContent if subtitle is set', async function () {
			element.subtitle = 'card subtitle';
			await elementUpdated(element);

			const subtitleContent =
				element.shadowRoot?.querySelector('.header-content');
			expect(subtitleContent).toBeTruthy();
		});

		it('should add an icon to the card header', async () => {
			element.icon = 'chat-line';
			await elementUpdated(element);

			const icon = element.shadowRoot!.querySelector('vwc-icon')!;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.name).toEqual('chat-line');
		});

		it('should add class .hide-header to .base', async () => {
			element.icon = undefined;
			element.headline = undefined;
			element.subtitle = undefined;
			await elementUpdated(element);
			const baseElementHasNoHeader = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('hide-header');

			expect(baseElementHasNoHeader).toEqual(true);
		});

		it('should have slot name graphic with icon default', async () => {
			const graphicSlotElement = element.shadowRoot?.querySelector(
				'.header slot[name="graphic"]'
			);

			element.icon = 'home';
			await elementUpdated(element);
			const icon = element.shadowRoot!.querySelector('vwc-icon')!;
			expect(graphicSlotElement).toBeTruthy();
			expect(icon.parentElement).toEqual(graphicSlotElement);
		});

		it('should have meta slot ', async function () {
			const metaSlotElement = element.shadowRoot?.querySelector(
				'.header-wrapper slot[name="meta"]'
			);

			expect(metaSlotElement).toBeTruthy();
		});

		it('should remove hide-header class from .base if graphic is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'graphic';
			slottedElement.id = 'graphic';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasNoHeader = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('hide-header');

			expect(baseElementHasNoHeader).toEqual(false);
		});
	});

	describe('card text', () => {
		it('should set text property to .text', async () => {
			const text = 'card text';
			element.text = text;
			await elementUpdated(element);
			const textNode = element.shadowRoot?.querySelector('.text');
			expect(textNode?.textContent?.trim()).toEqual(text);
		});
	});

	describe('card footer', () => {
		it('should have footer slot ', async function () {
			const footerSlotElement = element.shadowRoot?.querySelector(
				'.footer slot[name="footer"]'
			);

			expect(footerSlotElement).toBeTruthy();
		});

		it('should remove hide-footer class from .base if footer is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'footer';
			slottedElement.id = 'footer';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasNoHeader = element.shadowRoot
				?.querySelector('.base')
				?.classList.contains('hide-footer');

			expect(baseElementHasNoHeader).toEqual(false);
		});
	});

	describe('card appearance', function () {
		it('should have elevation element wrapper when as default appearance or elevated', async function () {
			const elevationTag = element.shadowRoot?.querySelector('vwc-elevation');

			expect(elevationTag).toBeTruthy();
			expect(elevationTag?.getAttribute('dp')).toEqual('4');
		});

		it('should have no elevation element wrapper when appearance is ghost', async function () {
			element.appearance = Appearance.Ghost;
			await elementUpdated(element);

			const elevationTag = element.shadowRoot?.querySelector('vwc-elevation');

			expect(elevationTag).toBeFalsy();
		});

		it('should have elevation element wrapper with dp="0" when appearance is outlined', async function () {
			element.appearance = Appearance.Outlined;
			await elementUpdated(element);

			const elevationTag = element.shadowRoot?.querySelector('vwc-elevation');

			expect(elevationTag).toBeTruthy();
			expect(elevationTag?.getAttribute('dp')).toEqual('0');
		});
	});

	describe('card elevation', () => {
		it('should have default elevation', async function () {
			const defaultElevation = '4';

			const baseElevation = element.shadowRoot?.querySelector('vwc-elevation');

			expect(baseElevation?.getAttribute('dp')).toEqual(defaultElevation);
		});

		it('should change the elevation dp when there is elevation property', async () => {
			const startingDP = 4;
			element.elevation = startingDP;
			await elementUpdated(element);

			const propertyValueBeforeChange = element.elevation;
			element.setAttribute('elevation', '16');

			expect(propertyValueBeforeChange).toEqual(startingDP);
			expect(element.elevation).toEqual('16');
		});
	});

	describe('clickable card: card as a link', () => {
		beforeEach(async () => {
			await setProperty(element, 'href', 'https://vivid.deno.dev');
		});

		it('should render a card with href attribute as anchor element', async function () {
			expect(getBaseElement(element)?.tagName).toEqual('A');
		});

		describe.each([
			'href',
			'hreflang',
			'download',
			'ping',
			'referrerpolicy',
			'rel',
			'target',
		] as const)('%s attribute', (attribute) => {
			it('should be forwarded to the anchor element', async () => {
				const text = 'link';
				await setProperty(element, attribute, text);

				expect(
					element.shadowRoot?.querySelector('a')?.getAttribute(attribute)
				).toEqual(text);
			});
		});

		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			['ariaLabel']
		);
	});

	describe('clickable card: card as a button', () => {
		beforeEach(async () => {
			await setProperty(element, 'clickableCard', true);
		});

		it('should render a card with clickable-card attribute as a button', async function () {
			expect(getBaseElement(element)?.tagName).toEqual('BUTTON');
			expect(getBaseElement(element)?.getAttribute('type')).toEqual('button');
		});

		it('should associate header with button using aria-labelledby', async () => {
			const headline = 'card headline';
			element.headline = headline;
			await elementUpdated(element);

			const headerTitle = element.shadowRoot?.querySelector('.header-headline');
			expect(headerTitle?.id).toBe('card-headline');
			expect(getBaseElement(element)?.getAttribute('aria-labelledby')).toBe(
				'card-headline'
			);
		});

		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			['ariaLabel']
		);
	});
});
