import {elementUpdated, fixture } from '@vivid-nx/shared';
import {expect} from '@playwright/test';
import { Icon } from '../icon/icon';
import { Card } from './card';
import '.';

const COMPONENT_TAG = 'vwc-card';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-card', () => {
	let element: Card;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Card;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-card', async () => {
			expect(element).toBeInstanceOf(Card);
			expect(element.icon).toBeUndefined();
		});
	});

	describe( 'header', () => {
		it('should set headline property to header-title', async () => {
			const headline = 'card headline';
			element.headline = headline;
			await elementUpdated(element);

			const headerTitle = element.shadowRoot?.querySelector('.header-headline');
			expect(headerTitle?.textContent?.trim()).toEqual(headline);
		});

		it('should set subtitle property to .header-subtitle', async () => {
			const subtitle = 'card subtitle';
			element.subtitle = subtitle;
			await elementUpdated(element);

			const headerSubtitle = element.shadowRoot?.querySelector('.header-subtitle');
			expect(headerSubtitle?.textContent?.trim()).toEqual(subtitle);
		});

		it('should render headerContent if headline is set', async function () {
			element.headline = 'card title';
			await elementUpdated(element);

			const headerContent = element.shadowRoot?.querySelector('.header-content');
			expect(headerContent).toBeTruthy();
		});


		it('should render headerContent if subtitle is set', async function () {
			element.subtitle = 'card subtitle';
			await elementUpdated(element);

			const subtitleContent = element.shadowRoot?.querySelector('.header-content');
			expect(subtitleContent).toBeTruthy();
		});


		it('should add an icon to the card header', async () => {
			element.icon = 'chat-line';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.type).toEqual('chat-line');
		});

		it( 'should add class .hide-header to .base', async () => {
			element.icon = undefined;
			element.headline = undefined;
			element.subtitle = undefined;
			await elementUpdated(element);
			const baseElementHasNoHeader = element.shadowRoot?.
				querySelector('.base')?.classList.contains('hide-header');

			expect(baseElementHasNoHeader).toEqual(true);
		});

		it('should have slot name graphic with icon default', async() => {
			const graphicSlotElement = element.shadowRoot?.
				querySelector('.header slot[name="graphic"]');

			element.icon = 'home';
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(graphicSlotElement).toBeTruthy();
			expect(icon.parentElement).toEqual(graphicSlotElement);
		});


		it('should have meta slot ', async function () {
			const metaSlotElement = element.shadowRoot?.
				querySelector('.header-wrapper slot[name="meta"]');

			expect(metaSlotElement).toBeTruthy();
		});

		it('should remove hide-header class from .base if graphic is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'graphic';
			slottedElement.id = 'graphic';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasNoHeader = element.shadowRoot?.
				querySelector('.base')?.classList.contains('hide-header');

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

	describe( 'card footer', () => {
		it('should have footer slot ', async function () {
			const footerSlotElement = element.shadowRoot?.
				querySelector('.footer slot[name="footer"]');

			expect(footerSlotElement).toBeTruthy();
		});

		it('should remove hide-footer class from .base if footer is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'footer';
			slottedElement.id = 'footer';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const baseElementHasNoHeader = element.shadowRoot?.
				querySelector('.base')?.classList.contains('hide-footer');

			expect(baseElementHasNoHeader).toEqual(false);
		});
	});

	describe('card elevation', () => {

		it('should have default elevation', async function () {
			const defaultElevation = '4';

			const baseElevation = element.shadowRoot?.
				querySelector('vwc-elevation');

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
});
