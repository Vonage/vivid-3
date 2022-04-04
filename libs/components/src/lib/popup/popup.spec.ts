import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import * as floatingUI from '@floating-ui/dom';
import type { Button } from '../button/button';
import { Popup } from './popup';
import '.';


const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	let element: Popup;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: element.updatePosition,
			unobserve: element.remove,
			disconnect: element.disconnectedCallback
		}));

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Popup;
	});

	describe('viewport visibility transition', function () {

		const computePositionResult = {
			'x': -15,
			'y': 0,
			'placement': 'left',
			'strategy': 'fixed',
			'middlewareData': {
				'flip': {},
				'hide': {
					'referenceHiddenOffsets': {
						'top': 0,
						'right': 0,
						'bottom': 0,
						'left': 0
					},
					'referenceHidden': true
				},
				'inline': {},
				'arrow': {
					'y': 0,
					'centerOffset': 0
				},
				'offset': {
					'x': -12,
					'y': 0
				}
			}
		};

		beforeEach(function () {
			jest.spyOn(floatingUI, 'computePosition');
		});

		afterEach(function () {
			(floatingUI.computePosition as jest.MockedFunction<any>).mockRestore();
		});

		/**
		 *
		 */
		async function setupPopupToOpenWithAnchor() {
			await setPopupAndAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			element.open = true;
		}

		/**
		 * @param hidden
		 */
		async function makePopupHidden(hidden = true) {
			computePositionResult.middlewareData.hide.referenceHidden = hidden;
			(floatingUI.computePosition as jest.MockedFunction<any>).mockReturnValue(Promise.resolve(computePositionResult));
			await element.updatePosition();
		}

		it('should be hidden when not in viewport', async function () {
			await setupPopupToOpenWithAnchor();
			await makePopupHidden(true);

			expect(element.popupEl.style.visibility)
				.toEqual('hidden');
		});

		it('should be hidden when not in viewport', async function () {
			await setupPopupToOpenWithAnchor();
			await makePopupHidden(false);
			expect(element.popupEl.style.visibility)
				.toEqual('visible');
		});
	});

	describe('basic', () => {
		it('initializes as a vwc-popup', async () => {
			expect(element)
				.toBeInstanceOf(Popup);
			expect(element.open)
				.toBeFalsy();
			expect(element.arrow)
				.toBeFalsy();
			expect(element.dismissible)
				.toBeFalsy();
			expect(element.anchor)
				.toBeUndefined();
			expect(element.corner)
				.toEqual('left');
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

			expect(element.open)
				.toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;

			element.hide();
			element.updatePosition();
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('anchor', () => {
		it('should not set popup open if anchor element does not exist', async () => {
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.show();
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('render arrow', () => {
		it('should remove the arrow class on the container if arrow is false', async () => {
			expect(element.shadowRoot?.querySelector('.arrow'))
				.toBeNull();
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

			expect(element.shadowRoot?.querySelector('.arrow'))
				.not
				.toBeNull();
		});
	});

	describe('render dismiss', () => {
		it('should remove the dismiss class on the container if dismissible is false', async () => {
			expect(element.shadowRoot?.querySelector('.dismissible'))
				.toBeNull();
		});
		it('should set the dismiss class on the container if dismissible is true', async () => {
			element.dismissible = true;

			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.dismissible'))
				.not
				.toBeNull();
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

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('alternate', () => {
		it('should set to alternate', async () => {
			expect(getControlElement(element)
				.getAttribute('part'))
				.toEqual('');
			element.alternate = true;

			await elementUpdated(element);
			expect(getControlElement(element)
				.getAttribute('part'))
				.toEqual('vvd-theme-alternate');
		});
	});

	describe('accessibility', () => {
		it('should set aria-hidden', async () => {
			expect(getControlElement(element)
				.getAttribute('aria-hidden'))
				.toEqual('true');
			element.open = true;

			await elementUpdated(element);
			expect(getControlElement(element)
				.getAttribute('aria-hidden'))
				.toEqual('false');
		});
	});

	describe('disconnect element', () => {
		it('should disconnect the element', async () => {
			await setPopupAndAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.disconnectedCallback();
			expect(true).toBeTruthy();
		});
	});

	async function setPopupAndAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>') as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
