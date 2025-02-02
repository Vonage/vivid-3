import {
	ADD_TEMPLATE_TO_FIXTURE,
	axe,
	elementUpdated,
	fixture,
	getControlElement,
} from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { type Popup } from '../popup/popup.ts';
import { Toggletip } from './toggletip';
import '../button';
import '.';

const COMPONENT_TAG = 'vwc-toggletip';
const ANCHOR_ARIA_LABEL = 'anchor aria label';

describe('vwc-toggletip', () => {
	let element: Toggletip;
	let popup: Popup;
	let anchor: Button;

	beforeEach(async () => {
		element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Toggletip;
		popup = getControlElement(element) as Popup;

		anchor = fixture(
			`<vwc-button id="anchorButton" aria-label="${ANCHOR_ARIA_LABEL}"></vwc-button>`,
			ADD_TEMPLATE_TO_FIXTURE
		) as Button;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-toggletip', async () => {
			expect(element).toBeInstanceOf(Toggletip);

			expect(element.open).toBe(false);
			expect(element.alternate).toBe(false);
			expect(element.headline).toBeUndefined();
			expect(element.placement).toBe('right');
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

		it('should remain open when clicked inside', async () => {
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should set open to false when clicked outside', async () => {
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		it('should set open to false when clicking on slotted anchor', async () => {
			const anchor = document.createElement('div');
			anchor.slot = 'anchor';
			element.appendChild(anchor);
			element.open = true;
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		function pressEscapeKey() {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					key: 'Escape',
					composed: true,
					bubbles: true,
				})
			);
		}
		it('should set open to false when Escape is pressed', async () => {
			element.open = true;
			await elementUpdated(element);

			pressEscapeKey();

			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		it('should allow propgation on escape key if closed', async () => {
			element.open = false;
			await elementUpdated(element);
			const spy = jest.fn();
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
			const spy = jest.fn();
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
	});

	describe('anchor', () => {
		beforeEach(async () => {
			element.anchor = anchor.id;
			await elementUpdated(element);
		});

		it('should pass anchor to the popup as an element', () => {
			expect(popup.anchor).toBe(anchor);
		});

		it('should set aria-label on anchor', async () => {
			element.anchor = document.createElement('div');
			expect(element.anchor.ariaLabel).toEqual(' ; Show more information');
		});

		it('should append to an existing aria-label on anchor', async () => {
			expect(anchor.ariaLabel).toEqual(
				`${ANCHOR_ARIA_LABEL} ; Show more information`
			);
		});

		it('should open when anchor is clicked', async () => {
			anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			await elementUpdated(element);

			expect(element.open).toBe(true);
		});

		describe('when anchor is removed', () => {
			beforeEach(async () => {
				element.anchor = undefined;
				await elementUpdated(element);
			});

			it('should revert the aria-label from anchor', async () => {
				expect(anchor.ariaLabel).toEqual(ANCHOR_ARIA_LABEL);
			});

			it('should no longer open when anchor is clicked', async () => {
				anchor.dispatchEvent(new MouseEvent('click', { bubbles: true }));
				await elementUpdated(element);

				expect(element.open).toBe(false);
			});
		});
	});

	describe('headline', () => {
		it('should set the headline', async () => {
			element.headline = 'A title!';
			await elementUpdated(element);

			expect(
				element.shadowRoot
					?.querySelector('header.headline')
					?.textContent?.trim()
			).toEqual(element.headline);
		});

		it('should remove headline element when headline is undefined', async () => {
			element.headline = 'A title!';
			await elementUpdated(element);
			element.headline = undefined;
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('header.headline')).toBeNull();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			element.innerHTML = 'Test content';
			element.headline = 'Headline';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
