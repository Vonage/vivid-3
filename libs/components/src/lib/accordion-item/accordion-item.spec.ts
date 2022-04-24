import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { AccordionItem } from './accordion-item';
import '.';

const COMPONENT_TAG = 'vwc-accordion-item';

describe('vwc-accordion-item', () => {
	let element: AccordionItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as AccordionItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-accordion-item', async () => {
			expect(element).toBeInstanceOf(AccordionItem);
			expect(element.open).toBeFalsy();
			expect(element.icon).toBeUndefined();
			expect(element.iconTrailing).toBeFalsy();
			expect(element.meta).toEqual('');
			expect(element.noIndicator).toBeFalsy();
			expect(element.heading).toEqual('');
			expect(element.headingLevel).toBeUndefined();
		});
	});

	describe('show', () => {
		it('should set "open" to true and add "open" class', async () => {
			expect(getControlElement(element).classList.contains('open')).toBeFalsy();

			element.open = true;
			await elementUpdated(element);
			expect(element.open).toBeTruthy();
			expect(getControlElement(element).classList.contains('open')).toBeTruthy();
		});
	});

	describe('hide', () => {
		it('should unset "open"', async () => {
			element.open = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('open')).toBeTruthy();

			element.open = false;
			await elementUpdated(element);
			expect(element.open).toBeFalsy();
			expect(getControlElement(element).classList.contains('open')).toBeFalsy();
		});
	});

	describe('toggle', () => {
		it('should toggle "open" state', async () => {
			const button: any = element.shadowRoot?.querySelector('.button');
			expect(getControlElement(element).classList.contains('open')).toBeFalsy();

			button.click();
			await elementUpdated(element);
			expect(element.open).toBeTruthy();
			expect(getControlElement(element).classList.contains('open')).toBeTruthy();

			button.click();
			await elementUpdated(element);
			expect(element.open).toBeFalsy();
			expect(getControlElement(element).classList.contains('open')).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should set icon class', async () => {
			expect(getControlElement(element).classList.contains('icon')).toBeFalsy();
			element.icon = 'chat-solid';
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('icon')).toBeTruthy();
		});
		it('should set iconTrailing', async () => {
			expect(getControlElement(element).classList.contains('icon-trailing')).toBeFalsy();
			element.icon = 'chat-solid';
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('icon-trailing')).toBeTruthy();
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator class', async () => {
			expect(getControlElement(element).classList.contains('no-indicator')).toBeFalsy();
			element.noIndicator = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('no-indicator')).toBeTruthy();
		});
	});

	describe('heading level', () => {
		it('should update heading level', async () => {
			expect(element.shadowRoot?.querySelector('.header')?.tagName).toEqual('H3');
			element.headingLevel = 4;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.header')?.tagName).toEqual('H4');
		});
	});
});
