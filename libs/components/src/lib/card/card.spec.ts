import {elementUpdated, fixture} from '@vivid-nx/shared';
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
		it('should set heading property to header-title', async () => {
			const heading = 'card heading';
			element.heading = heading;
			await elementUpdated(element);

			const headerTitle = element.shadowRoot?.querySelector('.header-title');
			expect(headerTitle?.textContent?.trim()).toEqual(heading);
		});

		it('should set subheading property to .header-subheading', async () => {
			const subheading = 'card subheading';
			element.subheading = subheading;
			await elementUpdated(element);

			const headerSubheading = element.shadowRoot?.querySelector('.header-subheading');
			expect(headerSubheading?.textContent?.trim()).toEqual(subheading);
		});

		it('should render headerContent if heading is set', async function () {
			element.heading = 'card title';
			await elementUpdated(element);

			const headerContent = element.shadowRoot?.querySelector('.header-content');
			expect(headerContent).toBeTruthy();
		});


		it('should render headerContent if subheading is set', async function () {
			element.subheading = 'card subheading';
			await elementUpdated(element);

			const subheadingContent = element.shadowRoot?.querySelector('.header-content');
			expect(subheadingContent).toBeTruthy();
		});


		it('should add an icon to the card header', async () => {
			element.icon = 'chat-line';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.type).toEqual('chat-line');
		});

		it( 'should add class .hide-header to .control', async () => {
			element.icon = '';
			element.heading = '';
			element.subheading = '';
			await elementUpdated(element);
			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('hide-header');

			expect(controlElementHasNoHeader).toEqual(true);
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
				querySelector('.content-container slot[name="meta"]');

			expect(metaSlotElement).toBeTruthy();
		});

		it('should remove hide-header class from .control if graphic is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'graphic';
			slottedElement.id = 'graphic';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('hide-header');

			expect(controlElementHasNoHeader).toEqual(false);
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

		it('should remove hide-footer class from .control if footer is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'footer';
			slottedElement.id = 'footer';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('hide-footer');

			expect(controlElementHasNoHeader).toEqual(false);
		});
	});


});


