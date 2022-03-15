import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { Corner, Position } from '../enums';
import type { Button } from '../button/button';
import { Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}));


describe('vwc-popup', () => {
	let element: Popup;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Popup;
	});

	describe('basic', () => {
		it('initializes as a vwc-popup', async () => {
			expect(element).toBeInstanceOf(Popup);
			expect(element.open).toBeFalsy();
			expect(element.arrow).toBeFalsy();
			expect(element.dismissible).toBeFalsy();
			expect(element.anchor).toEqual('');
			expect(element.corner).toEqual(Corner.Left);
			expect(element.strategy).toEqual(Position.Fixed);
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			await setPopupAndAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.show();
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;
			element.hide();
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
		it('should render an arrow icon if arrow is true', async () => {
			// TODO
		});
		
		it('should not render an arrow icon if arrow is false', async () => {
			// TODO
		});
		
		it('should remove the arrow class on the container if arrow is false', () => {
		        const controlElement = element.shadowRoot?.querySelector('.control');
			expect(controlElement.classList.contains('.arrow')).toEqual(false);
		});
		
		it('should set the arrow class on the container if arrow is true', () => {
		        element.arrow = true;
			await elementUpdated(element);
			const controlElement = element.shadowRoot?.querySelector('.control');
			expect(controlElement.classList.contains('.arrow')).toEqual(true);
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
});
