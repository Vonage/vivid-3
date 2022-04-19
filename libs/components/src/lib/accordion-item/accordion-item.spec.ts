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
			const control = getControlElement(element);
			const hasClassOpenBeforeShow = control.classList.contains('open');

			element.open = true;
			await elementUpdated(element);
			const hasClassOpenAfterShow = control.classList.contains('open');

			expect(element.open).toBeTruthy();
			expect(hasClassOpenBeforeShow).toBeFalsy();
			expect(hasClassOpenAfterShow).toBeTruthy();
		});
	});

	describe('hide', () => {
		it('should unset "open"', async () => {
			element.open = true;
			await elementUpdated(element);
			const control = getControlElement(element);
			const hasClassOpenBeforeHide = control.classList.contains('open');

			element.open = false;
			await elementUpdated(element);
			const hasClassOpenAfterHide = control.classList.contains('open');

			expect(hasClassOpenBeforeHide).toBeTruthy();
			expect(hasClassOpenAfterHide).toBeFalsy();
		});
	});

	describe('toggle', () => {
		it('should toggle "open" state', async () => {
			const control = getControlElement(element);
			const button: any = element.shadowRoot?.querySelector('.button');
			const hasClassOpenBeforeToggle = control.classList.contains('open');

			button.click();
			await elementUpdated(element);
			const hasClassOpenAfterToggle = control.classList.contains('open');

			expect(element.open).toBeTruthy();
			expect(hasClassOpenBeforeToggle).toBeFalsy();
			expect(hasClassOpenAfterToggle).toBeTruthy();

			button.click();
			await elementUpdated(element);
			const hasClassOpenAfterSecondToggle = control.classList.contains('open');

			expect(element.open).toBeFalsy();
			expect(hasClassOpenAfterSecondToggle).toBeFalsy();
		});
	});

	describe('icon', () => {
		it('should set icon class', async () => {
			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.icon = 'chat-solid';
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual('control icon');
		});
		it('should set iconTrailing', async () => {
			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.icon = 'chat-solid';
			element.iconTrailing = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual('control icon icon-trailing');
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator class', async () => {
			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.noIndicator = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual('control no-indicator');
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
