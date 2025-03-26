import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import * as floatingUI from '@floating-ui/dom';
import type { Button } from '../button/button';
import { PlacementStrategy, Popup } from './popup';
import '.';

const COMPONENT_TAG = 'vwc-popup';

vi.mock('@floating-ui/dom', async (getModule) => {
	return {
		// Allow spying on exported functions
		...(await getModule()),
	};
});

describe('vwc-popup', () => {
	let element: Popup;
	let anchor: Button;

	async function setupPopupToOpenWithAnchor() {
		element.anchor = anchor;
		element.open = true;
		await elementUpdated(element);
		return anchor;
	}

	function getPopupWrapper() {
		return element.shadowRoot?.querySelector('.popup-wrapper') as HTMLElement;
	}

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Popup;
		anchor = (await fixture(
			'<vwc-button id="anchor"></vwc-button>',
			ADD_TEMPLATE_TO_FIXTURE
		)) as Button;
	});

	afterEach(function () {
		// Ensure floating-ui is cleaned up and will make no more callbacks
		element.remove();
		vi.clearAllTimers();

		vi.restoreAllMocks();
	});

	it('should allow being created via createElement', () => {
		// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
		// This is because only createElement performs checks for custom element constructor requirements
		// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
		expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
	});

	describe('cleanup autoUpdate', () => {
		let cleanupMock: vi.Mock;
		beforeEach(() => {
			cleanupMock = vi.fn();
			vi.spyOn(floatingUI, 'autoUpdate').mockReturnValue(cleanupMock);
		});

		it('should cleanup autoUpdate when element is removed', async function () {
			await setupPopupToOpenWithAnchor();
			element.remove();
			expect(cleanupMock).toHaveBeenCalled();
		});

		it('should cleanup autoUpdate when popup is closed', async function () {
			await setupPopupToOpenWithAnchor();
			element.open = false;
			expect(cleanupMock).toHaveBeenCalled();
		});

		it('should cleanup autoUpdate when anchor is removed', async function () {
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
			vi.spyOn(floatingUI, 'computePosition');
		});

		function resetPosition(hidden = true) {
			computePositionResult.middlewareData.hide.referenceHidden = hidden;
			(floatingUI.computePosition as vi.MockedFunction<any>).mockReturnValue(
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
			// FIXME: when removing the elementUpdate, breaks because arrowEl not available
			await elementUpdated(element);
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
			vi.spyOn(floatingUI, 'autoUpdate');
			vi.spyOn(floatingUI, 'computePosition');
		});

		it('should hide control if not set', async () => {
			expect(getControlElement(element).classList).not.toContain('open');
		});

		it('should show control if set', async () => {
			element.open = true;
			await elementUpdated(element);

			expect(getControlElement(element).classList).toContain('open');
		});

		it('should ensure that the popup is visible when calling computePosition', async function () {
			let popupVisibleWhenComputePositionIsCalled = false;
			vi.mocked(floatingUI.computePosition).mockImplementationOnce(
				(...args: [any, any, any]) => {
					popupVisibleWhenComputePositionIsCalled =
						getControlElement(element).classList.contains('open');
					return floatingUI.computePosition(...args);
				}
			);

			await setupPopupToOpenWithAnchor();

			expect(popupVisibleWhenComputePositionIsCalled).toBe(true);
		});
	});

	describe('show', () => {
		it('should set "open" to true', async () => {
			element.show();

			expect(element.open).toEqual(true);
		});

		it('should show the popup synchronously', async () => {
			const popoverEl = element.shadowRoot!.querySelector(
				'[popover]'
			) as HTMLElement;
			popoverEl.showPopover = vi.fn();

			element.show();

			expect(getControlElement(element).classList).toContain('open');
			expect(popoverEl.showPopover).toHaveBeenCalled();
		});

		it('should wait until position has been updated before resolving', async () => {
			element.anchor = anchor;
			let isPositionUpdated = false;
			Object.defineProperty(element.popupEl.style, 'left', {
				set() {
					isPositionUpdated = true;
				},
			});

			await element.show();

			expect(isPositionUpdated).toBe(true);
		});

		it('should fire vwc-popup:open event', async function () {
			const spyOpen = vi.fn();
			element.addEventListener('vwc-popup:open', spyOpen);

			await element.show();

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
			const spyClose = vi.fn();
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

			const dismissButton = element.shadowRoot!.querySelector('vwc-button')!;
			dismissButton.click();
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
			vi.spyOn(floatingUI, 'computePosition');
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
			vi.spyOn(element, property).mockReset();
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
			vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
				...clientRect,
				...overrides,
			});
		}

		let rAFStub: vi.MockInstance;

		beforeEach(async () => {
			element.anchor = anchor;
			await elementUpdated(element);
			rAFStub = vi.spyOn(window, 'requestAnimationFrame');
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

	describe('strategy', () => {
		it('should have `fixed` class on popover-wrapper default', async () => {
			await elementUpdated(element);

			expect(getPopupWrapper().classList).toContain('fixed');
		});

		it('should have `absolute` class on popup-wrapper if strategy is set to absolute', async () => {
			element.strategy = 'absolute';

			await elementUpdated(element);

			expect(getPopupWrapper().classList).toContain('absolute');
		});
	});

	describe('showPopover', () => {
		it('should have popover attribute equal to manual by default. same as its positioned fixed by default', async () => {
			await elementUpdated(element);

			expect(getPopupWrapper().getAttribute('popover')).toEqual('manual');
		});

		it('should not have popover attribute if strategy is absolute', async () => {
			element.strategy = 'absolute';
			await elementUpdated(element);

			expect(getPopupWrapper().getAttribute('popover')).toBe(null);
		});

		it('should activate showPopover when strategy is fixed and popup is opened', async () => {
			element.strategy = 'fixed';
			element.open = true;
			await elementUpdated(element);

			expect(getPopupWrapper().showPopover).toHaveBeenCalled();
		});

		it('should not activate showPopover when strategy is absolute and popup is opened', async () => {
			element.strategy = 'absolute';
			element.open = true;
			await elementUpdated(element);

			expect(getPopupWrapper().showPopover).not.toHaveBeenCalled();
		});

		it('should activate hidePopover when strategy is fixed and popup is closed', async () => {
			element.strategy = 'fixed';
			element.open = true;
			await elementUpdated(element);

			element.open = false;
			await elementUpdated(element);

			expect(getPopupWrapper().hidePopover).toHaveBeenCalled();
		});

		it('should active showPopover when strategy is changed to fixed', async () => {
			element.strategy = 'absolute';
			element.open = true;
			await elementUpdated(element);

			element.strategy = 'fixed';
			await elementUpdated(element);

			expect(getPopupWrapper().showPopover).toHaveBeenCalled();
		});
	});

	describe('a11y attributes', () => {
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
