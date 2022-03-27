import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	let element: Popup;

	global.ResizeObserver = jest.fn().mockImplementation(() => ({
		observe: element.updatePosition,
		unobserve: element.cleanup,
		disconnect: element.cleanup,
	}));

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Popup;
		element.cleanup = cleanup;
	});

	describe('basic', () => {
		it('initializes as a vwc-popup', async () => {
			expect(element).toBeInstanceOf(Popup);
			expect(element.open).toBeFalsy();
			expect(element.arrow).toBeFalsy();
			expect(element.dismissible).toBeFalsy();
			expect(element.anchor).toEqual('');
			expect(element.corner).toEqual('left');
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			await setPopupAndAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.show();
			element.updatePosition();
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;

			element.hide();
			element.updatePosition();
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});
	});

	describe('anchor', () => {
		it('should not set popup open if anchor element does not exist', async () => {
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.show();
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});
	});

	describe('render arrow', () => {
		it('should remove the arrow class on the container if arrow is false', async () => {
			expect(element.shadowRoot?.querySelector('.arrow')).toBeNull();
		});
		it('should set the arrow class on the container if arrow is true', async () => {
			element.arrow = true;
			element.open = true;
			await elementUpdated(element);

			await setPopupAndAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.arrowEl = element.shadowRoot?.querySelector('.arrow') as HTMLElement;
			element.updatePosition();
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('.arrow')).not.toBeNull();
		});
	});


	describe('render dismiss', () => {
		it('should remove the dismiss class on the container if dismissible is false', async () => {
			expect(element.shadowRoot?.querySelector('.dismissible')).toBeNull();
		});
		it('should set the dismiss class on the container if dismissible is true', async () => {
			element.dismissible = true;

			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.dismissible')).not.toBeNull();
		});
	});

	describe('handle dismiss', () => {
		it('should hide when dismiss button is clicked', async () => {
			await setPopupAndAnchor();
			element.anchor = 'anchor';
			element.dismissible = true;
			await elementUpdated(element);

			element.show();
			await elementUpdated(element);
			element.handleDismissClick();
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});
	});

	describe('alternate', () => {
		it('should set to alternate', async () => {
			expect(getControlElement(element).getAttribute('part')).toEqual('');
			element.alternate = true;

			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('part')).toEqual('vvd-theme-alternate');
		});
	});

	describe('accessibility', () => {
		it('should set aria-hidden', async () => {
			expect(getControlElement(element).getAttribute('aria-hidden')).toEqual('true');
			element.open = true;

			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('aria-hidden')).toEqual('false');
		});
	});

	/**
	 *
	 */
	async function setPopupAndAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>') as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}

	/**
	 *
	 */
	function cleanup() { 
		return null;
	}
});
