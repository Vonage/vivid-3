import {elementUpdated, fixture} from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { Card } from './card';
import '.';
import {expect} from '@playwright/test';

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

		it('should set subtitle property to .header-subtitle', async () => {
			const subtitle = 'card subtitle';
			element.subtitle = subtitle;
			await elementUpdated(element);

			const headerSubtitle = element.shadowRoot?.querySelector('.header-subtitle');
			expect(headerSubtitle?.textContent?.trim()).toEqual(subtitle);
		});

		it('should add an icon to the card header', async () => {
			element.icon = 'chat-line';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon.type).toEqual('chat-line');
		});

		it( 'should add class .no-header to .control', async () => {
			element.icon = '';
			element.heading = '';
			element.subtitle = '';
			await elementUpdated(element);
			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('no-header');

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
				querySelector('.header slot[name="meta"]');

			expect(metaSlotElement).toBeTruthy();
		});

		it('should remove no-header class from .control if graphic is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'graphic';
			slottedElement.id = 'graphic';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('no-header');

			expect(controlElementHasNoHeader).toEqual(false);
		});

		it('should remove no-header class from .control if meta is slotted', async function () {
			const slottedElement = document.createElement('div');
			slottedElement.slot = 'meta';
			slottedElement.id = 'meta';
			element.appendChild(slottedElement);
			await elementUpdated(element);

			const controlElementHasNoHeader = element.shadowRoot?.
				querySelector('.control')?.classList.contains('no-header');

			expect(controlElementHasNoHeader).toEqual(false);
		});

	});

	describe('card content', () => {
		it('should set text property to .text', async () => {
			const text = 'card text';
			element.text = text;
			await elementUpdated(element);
			const textNode = element.shadowRoot?.querySelector('.text');
			expect(textNode?.textContent?.trim()).toEqual(text);

		});
	});


});


