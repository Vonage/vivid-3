import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getControlElement,
} from '@repo/shared/test-utils/fixture';
import { fireEvent } from '@testing-library/dom';
import type { Button } from '../button/button';
import type { Popup } from '../popup/popup';
import { Tooltip } from './tooltip';
import '.';
import '../kbd-key';
import '../kbd-shortcut';

const COMPONENT_TAG = 'vwc-tooltip';

describe('vwc-tooltip', () => {
	let element: Tooltip;
	let popup: Popup;
	let anchor: Button;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Tooltip;
		popup = getControlElement(element) as Popup;
		anchor = (await fixture(
			'<vwc-button id="anchor"></vwc-button>',
			ADD_TEMPLATE_TO_FIXTURE
		)) as Button;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tooltip', async () => {
			expect(element).toBeInstanceOf(Tooltip);
			expect(element.open).toBeFalsy();
			expect(element.anchor).toBeUndefined();
			expect(element.placement).toBeUndefined();
			expect(element.text).toEqual(undefined);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('open', () => {
		it.each([true, false])(
			'should forward open=%s to popup',
			async (isOpen) => {
				element.open = isOpen;
				await elementUpdated(element);

				expect(popup.hasAttribute('open')).toBe(isOpen);
			}
		);
	});

	describe('escape', () => {
		it('should disappear when Escape is pressed', () => {
			element.open = true;

			fireEvent(document, new KeyboardEvent('keydown', { key: 'Escape' }));

			expect(element.open).toEqual(false);
		});

		it('should disappear when Escape is pressed and tooltip is focused', () => {
			element.open = true;

			fireEvent(
				getControlElement(element),
				new KeyboardEvent('keydown', { key: 'Escape' })
			);

			expect(element.open).toEqual(false);
		});

		it('should allow propgation on escape key if closed', async () => {
			element.open = false;
			await elementUpdated(element);
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getControlElement(element).dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);
			await elementUpdated(element);
			expect(spy.mock.calls.length).toBe(1);
		});

		it('should stop propgation on escape key', async () => {
			element.open = true;
			await elementUpdated(element);
			const spy = vi.fn();
			element.parentElement!.addEventListener('keydown', spy);
			getControlElement(element).dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					bubbles: true,
					composed: true,
				})
			);
			await elementUpdated(element);
			expect(spy.mock.calls.length).toBe(0);
		});

		it('should enable default if Escape was pressed', async () => {
			element.open = true;
			await elementUpdated(element);
			const event = new KeyboardEvent('keydown', { key: 'Escape' });
			vi.spyOn(event, 'preventDefault');
			fireEvent(document, new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(0);
		});

		it('should enable default if key is not Escape', async () => {
			element.open = true;
			await elementUpdated(element);
			const event = new KeyboardEvent('keydown', { key: ' ' });
			vi.spyOn(event, 'preventDefault');
			fireEvent(document, new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);
			expect(event.preventDefault).toBeCalledTimes(0);
		});
	});

	describe('kbd-shortcut slot', () => {
		it('should render a kbd-shortcut slot inside the tooltip', async () => {
			const kbdShortcutSlot = element.shadowRoot?.querySelector(
				'slot[name="kbd-shortcut"]'
			);
			expect(kbdShortcutSlot).toBeTruthy();
		});

		it('should hide the wrapper when no content is slotted', async () => {
			const wrapper = element.shadowRoot?.querySelector(
				'.kbd-shortcut-wrapper'
			);
			expect(wrapper?.classList.contains('empty')).toBe(true);
		});

		it('should show parens when content is slotted', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} text="Copy">
					<span slot="kbd-shortcut">Control+C</span>
				</${COMPONENT_TAG}>`
			)) as Tooltip;
			await elementUpdated(element);
			await elementUpdated(element);

			const wrapper = element.shadowRoot?.querySelector(
				'.kbd-shortcut-wrapper'
			);
			expect(wrapper).toBeTruthy();
			expect(wrapper?.classList.contains('empty')).toBe(false);
			expect(wrapper?.textContent).toContain('(');
			expect(wrapper?.textContent).toContain(')');
		});

		it('should hide the wrapper when slotted content is hidden', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} text="Copy">
					<span slot="kbd-shortcut" style="display: none;">Hidden</span>
				</${COMPONENT_TAG}>`
			)) as Tooltip;
			await elementUpdated(element);
			await elementUpdated(element);

			const wrapper = element.shadowRoot?.querySelector(
				'.kbd-shortcut-wrapper'
			);
			expect(wrapper?.classList.contains('empty')).toBe(true);
		});
	});

	describe('aria-keyshortcuts', () => {
		it('should set aria-keyshortcuts on the anchor when a kbd-shortcut is slotted', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} text="Copy">
					<vwc-button slot="anchor" id="anchor-btn"></vwc-button>
					<vwc-kbd-shortcut slot="kbd-shortcut">
						<vwc-kbd-key name="Control"></vwc-kbd-key>
						<vwc-kbd-key name="C"></vwc-kbd-key>
					</vwc-kbd-shortcut>
				</${COMPONENT_TAG}>`
			)) as Tooltip;
			await elementUpdated(element);
			await elementUpdated(element);

			// Wait for Updates.enqueue to process
			await new Promise((r) => requestAnimationFrame(r));
			await elementUpdated(element);

			const anchorEl = (
				element.shadowRoot?.querySelector(
					'slot[name="anchor"]'
				) as HTMLSlotElement | null
			)?.assignedElements()[0] as HTMLElement | undefined;
			expect(anchorEl?.getAttribute('aria-keyshortcuts')).toBe('Control+C');
		});

		it('should remove aria-keyshortcuts from the old anchor when anchor changes', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} text="Copy">
					<vwc-button slot="anchor" id="anchor-btn"></vwc-button>
					<vwc-kbd-shortcut slot="kbd-shortcut">
						<vwc-kbd-key name="Control"></vwc-kbd-key>
						<vwc-kbd-key name="C"></vwc-kbd-key>
					</vwc-kbd-shortcut>
				</${COMPONENT_TAG}>`
			)) as Tooltip;
			await elementUpdated(element);
			await new Promise((r) => requestAnimationFrame(r));
			await elementUpdated(element);

			const oldAnchor = (
				element.shadowRoot?.querySelector(
					'slot[name="anchor"]'
				) as HTMLSlotElement | null
			)?.assignedElements()[0] as HTMLElement;

			// Remove the anchor
			oldAnchor.remove();
			await elementUpdated(element);

			expect(oldAnchor.hasAttribute('aria-keyshortcuts')).toBe(false);
		});

		it('should not set aria-keyshortcuts when no kbd-shortcut is slotted', async () => {
			element.anchor = anchor.id;
			await elementUpdated(element);
			await new Promise((r) => requestAnimationFrame(r));

			expect(anchor.hasAttribute('aria-keyshortcuts')).toBe(false);
		});
	});

	describe('anchor', () => {
		beforeEach(async () => {
			element.anchor = anchor.id;
			await elementUpdated(element);
		});

		it('should pass anchor to the popup as an element', () => {
			expect(popup.anchor).toBe(anchor);
		});

		it('should set aria-haspopup to true', () => {
			expect(anchor.ariaHasPopup).toBe('true');
		});

		describe.each([
			{ eventName: 'mouseover', openState: false, expectation: true },
			{ eventName: 'mouseout', openState: true, expectation: false },
			{ eventName: 'focusin', openState: false, expectation: true },
			{ eventName: 'focusout', openState: true, expectation: false },
		])('on $eventName of anchor', ({ eventName, openState, expectation }) => {
			beforeEach(() => {
				element.open = openState;
			});

			it(`should set "open" to ${expectation}`, () => {
				fireEvent(anchor, new Event(eventName));
				expect(element.open).toBe(expectation);
			});

			it(`should leave "open" as ${openState} after the anchor has been removed`, () => {
				element.anchor = undefined;
				fireEvent(anchor, new Event(eventName));
				expect(element.open).toBe(openState);
			});
		});
	});
});
