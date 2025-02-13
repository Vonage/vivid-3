import {
	ADD_TEMPLATE_TO_FIXTURE,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import { fireEvent } from '@testing-library/dom';
import type { Button } from '../button/button';
import { Popup } from '../popup/popup.ts';
import { Tooltip } from './tooltip';
import '.';

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

	describe('anchor', () => {
		beforeEach(async () => {
			element.anchor = anchor.id;
			await elementUpdated(element);
		});

		it('should pass anchor to the popup as an element', () => {
			expect(popup.anchor).toBe(anchor);
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
