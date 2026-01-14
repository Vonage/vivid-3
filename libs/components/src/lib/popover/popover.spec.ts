import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@repo/shared';
import * as floatingUI from '@floating-ui/dom';
import type { ComputePositionReturn } from '@floating-ui/dom';
import type { Button } from '../button/button';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { Popover } from './popover';
import '.';

const COMPONENT_TAG = 'vwc-popover';

vi.mock('@floating-ui/dom', async (getModule) => {
	return {
		...(await getModule()),
	};
});

describe('vwc-popover', () => {
	let element: Popover;
	let anchor: Button;

	beforeAll(() => {
		const dispatchToggle = (el: HTMLElement, newState: string) => {
			const event = new Event('toggle');
			(event as any).newState = newState;
			(event as any).oldState = newState === 'open' ? 'closed' : 'open';
			el.dispatchEvent(event);
		};

		HTMLElement.prototype.showPopover = function (this: HTMLElement) {
			if (this.hasAttribute('_popover-open')) return;
			this.setAttribute('_popover-open', '');
			dispatchToggle(this, 'open');
		};

		HTMLElement.prototype.hidePopover = function (this: HTMLElement) {
			if (!this.hasAttribute('_popover-open')) return;
			this.removeAttribute('_popover-open');
			dispatchToggle(this, 'closed');
		};

		HTMLElement.prototype.togglePopover = function (this: HTMLElement) {
			if (this.hasAttribute('_popover-open')) {
				this.hidePopover();
				return false;
			} else {
				this.showPopover();
				return true;
			}
		} as any;

		const originalMatches = HTMLElement.prototype.matches;
		HTMLElement.prototype.matches = function (
			this: HTMLElement,
			selector: string
		) {
			if (selector === ':popover-open') {
				return this.hasAttribute('_popover-open');
			}
			return originalMatches.call(this, selector);
		} as any;
	});

	async function setupPopoverToOpenWithAnchor() {
		element.anchor = anchor;
		element.open = true;
		await elementUpdated(element);
		return anchor;
	}

	function getCloseButton() {
		return element.shadowRoot?.querySelector(
			'.dismiss-button'
		) as HTMLButtonElement;
	}

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Popover;
		anchor = (await fixture(
			'<vwc-button id="anchor"></vwc-button>',
			ADD_TEMPLATE_TO_FIXTURE
		)) as Button;
	});

	afterEach(function () {
		element.remove();
		vi.restoreAllMocks();
	});

	describe('basic', () => {
		it('should be initialized as a vwc-popover', async () => {
			expect(element).toBeInstanceOf(Popover);
			expect(element.open).toBeFalsy();
			expect(element.manual).toBeFalsy();
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBe('bottom');
			expect(element.arrow).toBeFalsy();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should have role="dialog" and correct a11y attributes on the base element', async () => {
			const base = getBaseElement(element);
			expect(base.getAttribute('role')).toBe('dialog');
			expect(base.getAttribute('aria-modal')).toBe('false');
			expect(base.getAttribute('tabindex')).toBe('-1');
			expect(base.hasAttribute('autofocus')).toBe(true);
		});
	});

	describe('open', () => {
		beforeEach(() => {
			vi.spyOn(floatingUI, 'autoUpdate');
			vi.spyOn(floatingUI, 'computePosition');
		});

		it('should call showPopover when set to true', async () => {
			const base = getBaseElement(element);
			vi.spyOn(base, 'showPopover');

			element.open = true;
			await elementUpdated(element);

			expect(base.showPopover).toHaveBeenCalled();
		});

		it('should show popover and start autoUpdate immediately when initialized with open attribute and anchor', async () => {
			const openPopover = (await fixture(
				`<${COMPONENT_TAG} open>
					<button slot="anchor"></button>
				</${COMPONENT_TAG}>`
			)) as Popover;

			const base = getBaseElement(openPopover);
			expect(base.hasAttribute('_popover-open')).toBe(true);
			expect(floatingUI.autoUpdate).toHaveBeenCalled();
		});

		it('should detect open state via matches(:popover-open) if event.newState is missing', async () => {
			const base = getBaseElement(element);
			base.setAttribute('_popover-open', '');

			const event = new Event('toggle');
			base.dispatchEvent(event);

			await elementUpdated(element);

			expect(element.open).toBe(true);
		});

		it('should call hidePopover when set to false', async () => {
			const base = getBaseElement(element);
			vi.spyOn(base, 'hidePopover');

			element.open = true;
			await elementUpdated(element);

			element.open = false;
			await elementUpdated(element);

			expect(base.hidePopover).toHaveBeenCalled();
		});

		it('should fire "open" event', async () => {
			const spy = vi.fn();
			element.addEventListener('open', spy);

			element.open = true;
			await elementUpdated(element);

			expect(spy).toHaveBeenCalled();
		});

		it('should fire "close" event', async () => {
			element.open = true;
			await elementUpdated(element);

			const spy = vi.fn();
			element.addEventListener('close', spy);

			element.open = false;
			await elementUpdated(element);

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('alternate', () => {
		it('should add "alternate" part to the control element', async () => {
			element.alternate = true;
			await elementUpdated(element);

			expect(getControlElement(element).getAttribute('part')).toEqual(
				'vvd-theme-alternate'
			);
		});
	});

	describe('manual', () => {
		it('should not show close button by default (auto)', async () => {
			expect(getCloseButton()).toBeNull();
		});

		it('should show close button when manual is true', async () => {
			element.manual = true;
			await elementUpdated(element);
			expect(getCloseButton()).not.toBeNull();
		});

		it('should have type="button" on the close button', async () => {
			element.manual = true;
			await elementUpdated(element);
			const btn = getCloseButton();
			expect(btn?.getAttribute('type')).toBe('button');
		});

		it('should close the popover when close button is clicked', async () => {
			element.manual = true;
			element.open = true;
			await elementUpdated(element);

			const btn = getCloseButton();
			btn?.click();
			await elementUpdated(element);

			expect(element.open).toBe(false);
		});

		it('should set the popover attribute to "manual" on base', async () => {
			element.manual = true;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('popover')).toBe('manual');
		});
	});

	describe('anchoring', () => {
		it('should set aria-haspopup="dialog" on a vwc-button anchor', async () => {
			element.anchor = anchor;
			await elementUpdated(element);
			expect(getControlElement(anchor).getAttribute('aria-haspopup')).toBe(
				'dialog'
			);
		});

		it('should use click listeners for non-native button anchors (vwc-button)', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			const base = getBaseElement(element);
			vi.spyOn(base, 'togglePopover');

			anchor.click();
			expect(base.togglePopover).toHaveBeenCalled();
		});

		it('should use popoverTargetElement for native button anchors', async () => {
			const nativeBtn = document.createElement('button');
			element.anchor = nativeBtn;
			await elementUpdated(element);

			expect(nativeBtn.popoverTargetElement).toBe(getBaseElement(element));
		});

		it('should cleanup anchor attributes when anchor changes', async () => {
			element.anchor = anchor;
			await elementUpdated(element);
			const removeSpy = vi.spyOn(anchor, 'removeAttribute');

			const newAnchor = document.createElement('button');
			element.anchor = newAnchor;
			await elementUpdated(element);

			expect(removeSpy).toHaveBeenCalledWith('aria-haspopup');
			expect(newAnchor.getAttribute('aria-haspopup')).toBe('dialog');
		});

		it('should support slotted anchor', async () => {
			const slottedAnchor = document.createElement('button');
			slottedAnchor.slot = 'anchor';
			element.appendChild(slottedAnchor);
			await elementUpdated(element);

			expect(slottedAnchor.getAttribute('aria-haspopup')).toBe('dialog');
		});
	});

	describe('positioning', () => {
		const computePositionResult = {
			x: 100,
			y: 200,
			placement: 'bottom',
			strategy: 'fixed',
			middlewareData: {
				hide: { referenceHidden: false },
				arrow: { x: 5, y: 5 },
			},
		};

		beforeEach(() => {
			vi.spyOn(floatingUI, 'computePosition').mockReturnValue(
				Promise.resolve(
					computePositionResult as unknown as ComputePositionReturn
				)
			);
		});

		it('should update position styles on the base element', async () => {
			await setupPopoverToOpenWithAnchor();
			await element.updatePosition();

			const base = getBaseElement(element);
			expect(base.style.left).toBe('100px');
			expect(base.style.top).toBe('200px');
		});

		it('should set visibility to hidden if reference is hidden', async () => {
			vi.spyOn(floatingUI, 'computePosition').mockReturnValue(
				Promise.resolve({
					...computePositionResult,
					middlewareData: { hide: { referenceHidden: true } },
				} as unknown as ComputePositionReturn)
			);

			await setupPopoverToOpenWithAnchor();
			await element.updatePosition();

			expect(getBaseElement(element).style.visibility).toBe('hidden');
		});
	});

	describe('arrow', () => {
		it('should not render arrow by default', async () => {
			expect(element.shadowRoot?.querySelector('.arrow')).toBeNull();
		});

		it('should render arrow when arrow is true', async () => {
			element.arrow = true;
			await elementUpdated(element);
			expect(element.shadowRoot?.querySelector('.arrow')).not.toBeNull();
		});

		it('should position arrow correctly', async () => {
			element.arrow = true;
			const computeSpy = vi
				.spyOn(floatingUI, 'computePosition')
				.mockReturnValue(
					Promise.resolve({
						x: 0,
						y: 0,
						placement: 'top',
						strategy: 'fixed',
						middlewareData: {
							hide: {},
							arrow: { x: 10, y: 0 },
						},
					} as unknown as ComputePositionReturn)
				);

			await setupPopoverToOpenWithAnchor();
			await element.updatePosition();

			const arrowEl = element.shadowRoot?.querySelector(
				'.arrow'
			) as HTMLElement;

			expect(arrowEl.style.left).toBe('10px');

			const call = computeSpy.mock.lastCall![2];
			expect(JSON.stringify(call?.middleware)).toContain('arrow');
		});

		it('should position arrow correctly for side placements', async () => {
			element.arrow = true;
			const computeSpy = vi
				.spyOn(floatingUI, 'computePosition')
				.mockReturnValue(
					Promise.resolve({
						x: 0,
						y: 0,
						placement: 'left',
						strategy: 'fixed',
						middlewareData: {
							hide: {},
							arrow: { y: 15 },
						},
					} as unknown as ComputePositionReturn)
				);

			await setupPopoverToOpenWithAnchor();
			await element.updatePosition();

			const arrowEl = element.shadowRoot?.querySelector(
				'.arrow'
			) as HTMLElement;

			expect(arrowEl.style.top).toBe('15px');
			expect(arrowEl.style.left).toBe('calc(100% - 4px)');

			const call = computeSpy.mock.lastCall![2];
			expect(JSON.stringify(call?.middleware)).toContain('arrow');
		});
	});

	describe('methods', () => {
		describe('show', () => {
			it('should set open to true', async () => {
				element.open = false;
				await element.show();
				expect(element.open).toBe(true);
			});
		});

		describe('toggle', () => {
			it('should toggle open state from false to true', () => {
				element.open = false;
				element.toggle();
				expect(element.open).toBe(true);
			});

			it('should toggle open state from true to false', () => {
				element.open = true;
				element.toggle();
				expect(element.open).toBe(false);
			});
		});

		describe('hide', () => {
			it('should set open to false', () => {
				element.open = true;
				element.hide();
				expect(element.open).toBe(false);
			});
		});
	});

	describe('accessibility', () => {
		describe('ARIA delegation', () => {
			itShouldDelegateAriaAttributes(
				() => element,
				() => getBaseElement(element),
				['ariaLabel']
			);
		});
	});
});
