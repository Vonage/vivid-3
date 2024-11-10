import {
	ADD_TEMPLATE_TO_FIXTURE,
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import * as floatingUI from '@floating-ui/dom';
import type { Button } from '../button/button';
import { PlacementStrategy, Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

describe('vwc-popup', () => {
	let element: Popup;
	let anchor: Button;

	async function setupPopupToOpenWithAnchor() {
		element.anchor = anchor;
		element.open = true;
		await elementUpdated(element);
		return anchor;
	}

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Popup;
		anchor = (await fixture(
			'<vwc-button id="anchor"></vwc-button>',
			ADD_TEMPLATE_TO_FIXTURE
		)) as Button;

		HTMLElement.prototype.showPopover = jest.fn();
	});

	afterEach(function () {
		jest.clearAllMocks();
	});

	describe('cleanup autoUpdate', () => {
		it('should cleanup autoUpdate when element is removed', async function () {
			const cleanupMock = jest.fn();
			jest.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
			await setupPopupToOpenWithAnchor();
			element.remove();
			expect(cleanupMock).toHaveBeenCalled();
		});

		it('should cleanup autoUpdate when popup is closed', async function () {
			const cleanupMock = jest.fn();
			jest.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
			await setupPopupToOpenWithAnchor();
			element.open = false;
			expect(cleanupMock).toHaveBeenCalled();
		});

		it('should cleanup autoUpdate when anchor is removed', async function () {
			const cleanupMock = jest.fn();
			jest.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
			await setupPopupToOpenWithAnchor();
			element.anchor = undefined;
			expect(cleanupMock).toHaveBeenCalled();
		});
	});

	describe('updatePosition', function () {
		const computePositionResult = {
			x: -15,
			y: 0,
			placement: 'left',
			strategy: 'fixed',
			middlewareData: {
				flip: {},
				hide: {
					referenceHiddenOffsets: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					},
					referenceHidden: true,
				},
				inline: {},
				arrow: {
					y: 0,
					centerOffset: 0,
				},
				offset: {
					x: -12,
					y: 0,
				},
			},
		};

		beforeEach(function () {
			jest.spyOn(floatingUI, 'computePosition');
		});

		afterEach(function () {
			(floatingUI.computePosition as jest.MockedFunction<any>).mockRestore();
		});

		function resetPosition(hidden = true) {
			computePositionResult.middlewareData.hide.referenceHidden = hidden;
			(floatingUI.computePosition as jest.MockedFunction<any>).mockReturnValue(
				Promise.resolve(computePositionResult)
			);
		}

		it('should be hidden when not in viewport', async function () {
			await setupPopupToOpenWithAnchor();
			await resetPosition(true);
			await element.updatePosition();

			expect(element.popupEl.style.visibility).toEqual('hidden');
		});

		it('should be visible when in viewport', async function () {
			await setupPopupToOpenWithAnchor();
			await resetPosition(false);

			await element.updatePosition();
			expect(element.popupEl.style.visibility).toEqual('visible');
		});

		it('should set the arrow in a position according to middleware', async function () {
			element.arrow = true;
			await setupPopupToOpenWithAnchor();
			(computePositionResult.middlewareData.arrow as any) = { x: 5, y: 10 };
			await resetPosition(false);
			await element.updatePosition();
			expect(element.arrowEl.style.left).toEqual('5px');
			expect(element.arrowEl.style.top).toEqual('10px');
		});

		it('should not compute position if popup is not open', async function () {
			await element.updatePosition();
			expect(floatingUI.computePosition).not.toHaveBeenCalled();
		});

		it('should not compute position if there is no anchor', async function () {
			element.open = true;
			await element.updatePosition();
			expect(floatingUI.computePosition).not.toHaveBeenCalled();
		});
	});

	describe('basic', () => {
		it('initializes as a vwc-popup', async () => {
			expect(element).toBeInstanceOf(Popup);
			expect(element.open).toBeFalsy();
			expect(element.arrow).toBeFalsy();
			expect(element.dismissible).toBeFalsy();
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBeUndefined();
			expect(element.placementStrategy).toBe(PlacementStrategy.Flip);
			expect(element.animationFrame).toBe(false);
			expect(element.strategy).toEqual('fixed');
		});
	});

	describe('open', () => {
		beforeEach(() => {
			jest.spyOn(floatingUI, 'autoUpdate');
		});

		afterEach(() => {
			jest.mocked(floatingUI.autoUpdate).mockRestore();
		});

		it('should hide control if not set', async () => {
			expect(getControlElement(element).classList).not.toContain('open');
		});

		it('should show control if set', async () => {
			element.open = true;
			await elementUpdated(element);

			expect(getControlElement(element).classList).toContain('open');
		});

		it('should begin to auto update after DOM is updated', async function () {
			element.anchor = anchor;
			element.open = true;
			const updateCallsBeforeDOMUpdate = jest.mocked(floatingUI.autoUpdate).mock
				.calls.length;
			await elementUpdated(element);
			expect(updateCallsBeforeDOMUpdate).toBe(0);
			expect(floatingUI.autoUpdate).toHaveBeenCalledTimes(2);
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			element.show();

			expect(element.open).toEqual(true);
		});

		it('should fire vwc-popup:open event', async function () {
			const spyOpen = jest.fn();
			element.addEventListener('vwc-popup:open', spyOpen);

			element.show();

			expect(spyOpen).toHaveBeenCalled();
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			element.open = true;

			element.hide();

			expect(element.open).toEqual(false);
		});

		it('should fire "vwc-popup:close" event', async function () {
			element.open = true;
			const spyClose = jest.fn();
			element.addEventListener('vwc-popup:close', spyClose);

			element.hide();

			expect(spyClose).toHaveBeenCalled();
		});
	});

	describe('arrow', () => {
		it('should remove the arrow class on the container if arrow is false', async () => {
			expect(element.shadowRoot?.querySelector('.arrow')).toBeNull();
		});

		it('should set the arrow class on the container if arrow is true', async () => {
			element.arrow = true;
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('.arrow')).not.toBeNull();
		});
	});

	describe('dismissible', () => {
		it('should remove the dismiss class on the container if dismissible is false', async () => {
			expect(element.shadowRoot?.querySelector('.dismissible')).toBeNull();
		});

		it('should set the dismiss class on the container if dismissible is true', async () => {
			element.dismissible = true;

			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.dismissible')).not.toBeNull();
		});

		it('should hide when dismiss button is clicked', async () => {
			element.dismissible = true;
			await elementUpdated(element);

			element.open = true;
			const openStateBeforeEsc = element.open;
			await elementUpdated(element);

			const dismissButton = element.shadowRoot?.querySelector('vwc-button');
			(dismissButton as HTMLElement).click();
			await elementUpdated(element);

			expect(openStateBeforeEsc).toEqual(true);
			expect(element.open).toEqual(false);
		});
	});

	describe('alternate', () => {
		it('should set to alternate', async () => {
			const partValueWithoutAlternate =
				getControlElement(element).getAttribute('part');

			element.alternate = true;
			await elementUpdated(element);
			const partValueWithAlternate =
				getControlElement(element).getAttribute('part');

			expect(partValueWithoutAlternate).toEqual('');
			expect(partValueWithAlternate).toEqual('vvd-theme-alternate');
		});
	});

	describe('placementStrategy', () => {
		beforeEach(() => {
			jest.spyOn(floatingUI, 'computePosition');
		});

		afterEach(() => {
			jest.mocked(floatingUI.computePosition).mockRestore();
		});

		it('should use placementStrategy to compute position', async () => {
			element.placementStrategy = PlacementStrategy.AutoPlacementHorizontal;

			await setupPopupToOpenWithAnchor();
			await element.updatePosition();

			expect(floatingUI.computePosition).toHaveBeenLastCalledWith(
				expect.anything(),
				expect.anything(),
				expect.objectContaining({
					middleware: expect.arrayContaining([
						expect.objectContaining({
							name: 'autoPlacement',
						}),
					]),
				})
			);
		});
	});

	describe('animationFrame', () => {
		function resetMethodCallCount(property: any) {
			jest.spyOn(element, property).mockReset();
		}

		async function openPopup() {
			element.open = true;
			await elementUpdated(element);
		}

		function getLastFrameCallback() {
			return rAFStub.mock.lastCall[0];
		}

		function callLastFrameCallback() {
			getLastFrameCallback()();
		}

		function setElementClientRect(overrides = {}) {
			const clientRect = {
				x: 4,
				y: 4,
				width: 1,
				height: 1,
				top: 1,
				right: 1,
				bottom: 1,
				left: 1,
			} as DOMRect;
			jest
				.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
				.mockReturnValue({ ...clientRect, ...overrides });
		}

		let rAFStub: any;

		beforeEach(async () => {
			element.anchor = anchor;
			await elementUpdated(element);
			rAFStub = jest.spyOn(window, 'requestAnimationFrame');
		});

		afterEach(() => {
			jest.mocked(window.requestAnimationFrame).mockRestore();
		});

		it('should disable recursive calls to requestAnimationFrame when false', async () => {
			await openPopup();
			const cb = getLastFrameCallback();
			rAFStub.mockReset();
			cb();

			expect(rAFStub).toHaveBeenCalledTimes(0);
		});

		it('should call rAF recursively when true', async () => {
			element.animationFrame = true;
			await openPopup();
			const cb = getLastFrameCallback();
			rAFStub.mockReset();
			cb();
			cb();
			expect(rAFStub).toHaveBeenCalledTimes(2);
			expect(getLastFrameCallback()).toBe(cb);
		});

		it("should prevent call to updatePosition if position or size didn't change", async () => {
			setElementClientRect({ width: 100, top: 100 });
			element.animationFrame = true;
			await openPopup();
			resetMethodCallCount('updatePosition');

			callLastFrameCallback();

			expect(element.updatePosition).toBeCalledTimes(0);
		});

		it('should updatePosition if size changes', async () => {
			setElementClientRect({ width: 300 });
			element.animationFrame = true;
			await openPopup();
			resetMethodCallCount('updatePosition');
			setElementClientRect({ width: 400 });

			callLastFrameCallback();

			expect(element.updatePosition).toBeCalledTimes(1);
		});

		it('should updatePosition on next frame if position changes', async () => {
			setElementClientRect({ top: 100 });
			element.animationFrame = true;
			await openPopup();
			resetMethodCallCount('updatePosition');
			setElementClientRect({ top: 200 });

			callLastFrameCallback();

			expect(element.updatePosition).toBeCalledTimes(1);
		});
	});

	describe('popover', () => {
		it('it should have popover attribute equal to manual', async () => {

			element.strategy = 'fixed';
			await elementUpdated(element);

			const popupWrapper = element.shadowRoot?.querySelector('.popup-wrapper');

			expect(popupWrapper?.getAttribute('popover')).toBe('manual');
		});

		it('it should not have popover attribute', async () => {
			element.strategy = 'absolute';
			await elementUpdated(element);

			const popupWrapper = element.shadowRoot?.querySelector('.popup-wrapper');

			expect(popupWrapper?.getAttribute('popover')).toBe(null);
		});

	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.open = true;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		it('should set aria-hidden', async () => {
			expect(getControlElement(element).getAttribute('aria-hidden')).toEqual(
				'true'
			);

			element.open = true;
			await elementUpdated(element);

			expect(getControlElement(element).getAttribute('aria-hidden')).toEqual(
				'false'
			);
		});
	});
});
