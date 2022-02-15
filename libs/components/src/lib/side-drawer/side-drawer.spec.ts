import { elementUpdated, fixture } from '@vivid-nx/shared';
import { POSITION, SideDrawer } from './side-drawer';
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
			expect(element.hasTopBar).toBeFalsy();
			expect(element.position).toBeUndefined();
			expect(element.modal).toBeFalsy();
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			const control = getControlElement();
			expect(control.classList.toString()).toEqual('control');
			element.show();
			await elementUpdated(element);
			expect(element.open).toEqual(true);
			expect(control.classList.toString()).toEqual('control open');
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;
			await elementUpdated(element);
			const control = getControlElement();
			expect(control.classList.toString()).toEqual('control open');
			element.hide();
			await elementUpdated(element);
			expect(element.open).toEqual(false);
			expect(control.classList.toString()).toEqual('control');
		});
	});

	describe('modal', () => {
		it('should set "modal" to true', async () => {
			const control = getControlElement();
			expect(control.classList.toString()).toEqual('control');
			element.modal = true;
			await elementUpdated(element);
			expect(control.classList.toString()).toEqual('control modal');
		});
	});

	describe('alternate', () => {
		it('should set "alternate" to true', async () => {
			const control = getControlElement();
			expect(control.classList.toString()).toEqual('control');
			element.alternate = true;
			await elementUpdated(element);
			expect(control.classList.toString()).toEqual('control alternate');
		});
	});

	describe('position', () => {
		it('should set "position" to "end"', async () => {
			const control = getControlElement();
			expect(control.classList.toString()).toEqual('control');
			element.position = POSITION.End;
			await elementUpdated(element);
			expect(control.classList.toString()).toEqual('control end');
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

	/**
	 *
	 */
	function getControlElement(): HTMLElement {
		return element.shadowRoot?.querySelector('.control') as HTMLElement;
	}
});