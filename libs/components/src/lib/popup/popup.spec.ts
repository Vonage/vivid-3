import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getControlElement
} from '@vivid-nx/shared';
import * as floatingUI from '@floating-ui/dom';
import type { Button } from '../button/button';
import { Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	/**
	 *
	 */
	async function setupPopupToOpenWithAnchor() {
		const anchor = await setAnchor();
		element.anchor = 'anchor';
		await elementUpdated(element);
		element.open = true;
		return anchor;
	}

	let element: Popup;

	beforeEach(async () => {
		element = await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Popup;
		global.ResizeObserver = jest.fn()
			.mockImplementation(() => ({
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn()
			}));
	});

	afterEach(function () {
		jest.clearAllMocks();
	});

	describe('clean observable', () => {
		it('should clean observable on disconnectedCallback', async function () {
			const cleanupMock = jest.fn();
			jest.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
			await setupPopupToOpenWithAnchor();
			element.disconnectedCallback();
			expect(cleanupMock).toHaveBeenCalled();
		});

		it('should clean observable when anchor is undefined', async function () {
			const cleanupMock = jest.fn();
			jest.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
			await setupPopupToOpenWithAnchor();
			element.anchor = '';
			await elementUpdated(element);
			expect(cleanupMock).toHaveBeenCalled();
		});
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
			expect(element.lightDismiss)
				.toBeFalsy();
			expect(element.anchor)
				.toBeUndefined();
			expect(element.placement)
				.toBeUndefined();
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = true;
			element.updatePosition();
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;

			element.open = false;
			element.updatePosition();
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

			await setAnchor();
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
			await setAnchor();
			element.anchor = 'anchor';
			element.dismissible = true;
			await elementUpdated(element);

			element.open = true;
			const openStateBeforeEsc = element.open;

			await elementUpdated(element);
			const dismissButton = element.shadowRoot?.querySelector('vwc-button');
			(dismissButton as HTMLElement).click();
			await elementUpdated(element);

			expect(openStateBeforeEsc)
				.toEqual(true);
			expect(element.open)
				.toEqual(false);
		});
	});

	describe('handle light dismiss', () => {
		it('should hide when clicked outside of the popup', async () => {
			const element = await fixture('<vwc-popup light-dismiss open></vwc-popup>', ADD_TEMPLATE_TO_FIXTURE) as Popup;
			await elementUpdated(element);

			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			const buttonEl = await fixture('<vwc-button id="button"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
			await elementUpdated(buttonEl);
			
			const openStateBeforeLightDismiss = element.open;

			const button = document.querySelector('vwc-button#button');
			(button as HTMLElement).click();
			await elementUpdated(element);

			expect(openStateBeforeLightDismiss)
				.toEqual(true);
			expect(element.open)
				.toEqual(false);
		});

		it('should not hide when clicked on the popup', async () => {
			const element = await fixture('<vwc-popup light-dismiss></vwc-popup>', ADD_TEMPLATE_TO_FIXTURE) as Popup;
			await elementUpdated(element);

			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = true;
			const openStateBeforeLightDismiss = element.open;

			(element as HTMLElement).click();
			await elementUpdated(element);

			expect(openStateBeforeLightDismiss)
				.toEqual(true);
			expect(element.open)
				.toEqual(true);
		});

		it('should not hide when clicked on the anchor', async () => {
			const element = await fixture('<vwc-popup light-dismiss open></vwc-popup>', ADD_TEMPLATE_TO_FIXTURE) as Popup;
			await elementUpdated(element);

			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			
			const openStateBeforeLightDismiss = element.open;

			const dismissButton = document.querySelector('vwc-button#anchor');
			(dismissButton as HTMLElement).click();
			
			await elementUpdated(element);

			expect(openStateBeforeLightDismiss)
				.toEqual(true);
			expect(element.open)
				.toEqual(true);
		});

		it('should stay closed when clicked outside of the popup', async () => {
			const element = await fixture('<vwc-popup light-dismiss></vwc-popup>', ADD_TEMPLATE_TO_FIXTURE) as Popup;
			await elementUpdated(element);

			await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			const buttonEl = await fixture('<vwc-button id="button"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
			await elementUpdated(buttonEl);
			
			const openStateBeforeLightDismiss = element.open;

			const button = document.querySelector('vwc-button#button');
			(button as HTMLElement).click();
			await elementUpdated(element);

			expect(openStateBeforeLightDismiss)
				.toEqual(false);
			expect(element.open)
				.toEqual(false);
		});
	});

	describe('handle keydown', () => {
		it('should hide on escape key', async () => {
			const anchor = await setupPopupToOpenWithAnchor();
			const openStateBeforeEsc = element.open;

			await elementUpdated(element);
			anchor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);

			expect(openStateBeforeEsc)
				.toEqual(true);
			expect(element.open)
				.toEqual(false);
		});

		it('should remove keydown listener after disconnection', async function () {
			const anchor = await setupPopupToOpenWithAnchor();
			const openStateBeforeEsc = element.open;

			await elementUpdated(element);
			element.disconnectedCallback();
			await elementUpdated(element);
			anchor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

			expect(openStateBeforeEsc)
				.toEqual(true);
			expect(element.open)
				.toEqual(true);
		});

		it('should remove keydown listener after changing anchor', async function () {
			const anchor = await setupPopupToOpenWithAnchor();
			const openStateBeforeEsc = element.open;

			await elementUpdated(element);
			element.anchor = 'new-anchor';
			await elementUpdated(element);
			anchor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

			expect(openStateBeforeEsc)
				.toEqual(true);
			expect(element.open)
				.toEqual(true);
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

	/**
	 *
	 */
	async function setAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
