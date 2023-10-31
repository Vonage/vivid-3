import { axe, elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { SideDrawer } from './side-drawer';
import '.';
import { sideDrawerDefinition } from './definition';

const COMPONENT_TAG = 'vwc-side-drawer';

describe('vwc-side-drawer', () => {
	let element: SideDrawer;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}>
								</${COMPONENT_TAG}>`) as SideDrawer;
		await elementUpdated(element);
	});

	describe('basic', () => {
		it('initializes as a vwc-side-drawer', async () => {
			expect(sideDrawerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(SideDrawer);
			expect(element.open).toBeFalsy();
			expect(element.alternate).toBeFalsy();
			expect(element.trailing).toBeFalsy();
			expect(element.modal).toBeFalsy();
		});

		it('should render the inert attribute on the control element', async () => {
			const control = getControlElement(element);
			expect(control.hasAttribute('inert')).toBe(true);
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

		it('should fire open event', async function () {
			const spy = jest.fn();
			element.addEventListener('open', spy);
			element.open = true;
			await elementUpdated(element);
			expect(spy)
				.toHaveBeenCalled();
		});

		it("should not bubble 'open' event", async () => {
			const spy = jest.fn();
			element.parentElement?.addEventListener('open', spy);
			element.open = true;
			await elementUpdated(element);
			expect(spy).not.toBeCalled();
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

		it('should fire close event', async function () {
			element.open = true;
			await elementUpdated(element);

			const spy = jest.fn();
			element.addEventListener('close', spy);
			element.open = false;
			await elementUpdated(element);

			expect(spy)
				.toHaveBeenCalled();
		});

		it("should not bubble 'close' event", async () => {
			element.modal = true;
			element.open = true;
			const spy = jest.fn();
			element.parentElement?.addEventListener('close', spy);
			element.open = false;
			
			await elementUpdated(element);
			expect(spy).not.toBeCalled();
		});
	});

	describe('open', () => {
		it('should not render inert attribute on the control element', async () => {
			element.open = true;
			await elementUpdated(element);
			const control = getControlElement(element);
			expect(control.hasAttribute('inert')).toBe(false);
		});

		it('should not render inert attribute on app content element when not a modal', async () => {
			element.open = true;
			await elementUpdated(element);

			const appContent = element.shadowRoot?.querySelector('.side-drawer-app-content');
			expect(appContent?.hasAttribute('inert')).toBe(false);
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
		it('should set "alternate" on part', async () => {
			element.alternate = true;
			await elementUpdated(element);

			const controlWithPartAlternate = element.shadowRoot?.querySelector('[part~=vvd-theme-alternate]');
			expect(controlWithPartAlternate).toBeInstanceOf(HTMLElement);
		});
	});

	describe('trailing', () => {
		it('should change the side and add "trailing" class', async () => {
			const control = getControlElement(element);
			let hasClassTrailing = control.classList.contains('trailing');
			element.trailing = true;
			await elementUpdated(element);
			expect(hasClassTrailing).toEqual(false);

			hasClassTrailing = control.classList.contains('trailing');
			expect(hasClassTrailing).toEqual(true);
		});
	});

	describe('modal', () => {
		it('should not render inert attribute on app content element when close', async () => {
			element.modal = true;
			await elementUpdated(element);

			const appContent = element.shadowRoot?.querySelector('.side-drawer-app-content');
			expect(appContent?.hasAttribute('inert')).toBe(false);
		});

		it('should render inert attribute on app content element when open', async () => {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);

			const appContent = element.shadowRoot?.querySelector('.side-drawer-app-content');
			expect(appContent?.hasAttribute('inert')).toBe(true);
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

	describe('keydown', () => {
		let control: HTMLElement;
		
		beforeEach(async () => {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);
			control = getControlElement(element);
		});

		it('should close after keydown on Escape', async () => {
			control.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should leave open after keydown that is not Escape', async () => {
			control.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
			expect(element.open).toEqual(true);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.modal = true;
			element.open = true;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
