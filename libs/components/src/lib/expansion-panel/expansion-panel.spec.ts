import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { ExpansionPanel } from './expansion-panel';
import '.';

const COMPONENT_TAG = 'vwc-expansion-panel';

describe('vwc-expansion-panel', () => {
	let element: ExpansionPanel;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as ExpansionPanel;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-expansion-panel', async () => {
			expect(element).toBeInstanceOf(ExpansionPanel);
			expect(element.open).toBeFalsy();
			expect(element.dense).toBeFalsy();
			expect(element.icon).toEqual('');
			expect(element.iconTrailing).toBeFalsy();
			expect(element.meta).toEqual('');
			expect(element.noIndicator).toBeFalsy();
			expect(element.heading).toEqual('');
			expect(element.headingLevel).toEqual(3);
		});
	});

	describe('show', () => {
		it('should set "open" to true and add "open" class', async () => {
			const control = getControlElement(element);
			const hasClassOpenBeforeShow = control.classList.contains('open');

			element.show();
			await elementUpdated(element);
			const hasClassOpenAfterShow = control.classList.contains('open');

			expect(element.open).toEqual(true);
			expect(hasClassOpenBeforeShow).toEqual(false);
			expect(hasClassOpenAfterShow).toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false and remove "open" class', async () => {
			element.open = true;
			await elementUpdated(element);
			const control = getControlElement(element);
			const hasClassOpenBeforeHide = control.classList.contains('open');

			element.hide();
			await elementUpdated(element);
			const hasClassOpenAfterHide = control.classList.contains('open');

			expect(hasClassOpenBeforeHide).toEqual(true);
			expect(hasClassOpenAfterHide).toEqual(false);
		});
	});

	describe('toggle', () => {
		it('should toggle when open attribute changes', async () => {
			const control = getControlElement(element);
			const button: any = element.shadowRoot?.querySelector('.expansion-panel-button');
			const hasClassOpenBeforeToggle = control.classList.contains('open');

			button.click();
			await elementUpdated(element);
			const hasClassOpenAfterToggle = control.classList.contains('open');

			expect(element.open).toEqual(true);
			expect(hasClassOpenBeforeToggle).toEqual(false);
			expect(hasClassOpenAfterToggle).toEqual(true);

			button.click();
			await elementUpdated(element);
			const hasClassOpenAfterSecondToggle = control.classList.contains('open');

			expect(element.open).toEqual(false);
			expect(hasClassOpenAfterSecondToggle).toEqual(false);
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
			expect(getControlElement(element).classList.toString()).toEqual('control icon iconTrailing');
		});
	});

	describe('no-indicator', () => {
		it('should remove indicator class', async () => {
			expect(getControlElement(element).classList.toString()).toEqual('control');
			element.noIndicator = true;
			await elementUpdated(element);
			expect(getControlElement(element).classList.toString()).toEqual('control noIndicator');
		});
	});
});
