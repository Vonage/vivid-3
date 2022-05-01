import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { SideDrawer } from './side-drawer';
import '.';

const COMPONENT_TAG = 'vwc-side-drawer';

describe('vwc-side-drawer', () => {
	let element: SideDrawer;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}>
								</${COMPONENT_TAG}>`) as SideDrawer;
	});

	describe('basic', () => {
		it('initializes as a vwc-side-drawer', async () => {
			expect(element).toBeInstanceOf(SideDrawer);
			expect(element.open).toBeFalsy();
			expect(element.alternate).toBeFalsy();
			expect(element.position).toBeUndefined();
			expect(element.modal).toBeFalsy();
		});
	});

	describe('show', () => {
		it('should set "open" to true and add "open" class', async () => {
			const control = getControlElement(element);
			const hasClassOpenBeforeShow = control.classList.contains('open');

			element.open = true;
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

			element.open = false;
			await elementUpdated(element);
			const hasClassOpenAfterHide = control.classList.contains('open');

			expect(hasClassOpenBeforeHide).toEqual(true);
			expect(hasClassOpenAfterHide).toEqual(false);
		});
	});

	describe('modal', () => {
		it('should set "modal" to true and add "modal" class', async () => {
			const control = getControlElement(element);
			let hasClassModal = control.classList.contains('modal');
			element.modal = true;
			await elementUpdated(element);
			expect(hasClassModal).toEqual(false);

			hasClassModal = control.classList.contains('modal');
			expect(hasClassModal).toEqual(true);
		});
	});

	describe('alternate', () => {
		it('should set "alternate" to true and add "alternate" class', async () => {
			const control = getControlElement(element);
			let hasClassAlternate = control.classList.contains('alternate');
			element.alternate = true;
			await elementUpdated(element);
			expect(hasClassAlternate).toEqual(false);

			hasClassAlternate = control.classList.contains('alternate');
			expect(hasClassAlternate).toEqual(true);
		});
	});

	describe('position', () => {
		it('should set "position" to "end" and add "position" class', async () => {
			const control = getControlElement(element);
			let hasClassPosition = control.classList.contains('end');
			element.position = 'end';
			await elementUpdated(element);
			expect(hasClassPosition).toEqual(false);

			hasClassPosition = control.classList.contains('end');
			expect(hasClassPosition).toEqual(true);
		});
	});

	describe('scrim', () => {
		it('should close after clicking on scrim', async () => {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);
			const scrim: any = element.shadowRoot?.querySelector('.scrim');
			scrim?.click();
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});
	});

	describe('escape', () => {
		it('should close after keydown on Escape', async () => {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);
			const aside: any = element.shadowRoot?.querySelector('aside');
			aside?.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});
	});
});