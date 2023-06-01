import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import {fireEvent} from '@testing-library/dom';
import type { Button } from '../button/button';
import { Toggletip } from './toggletip';
import { toggletipDefinition } from './definition';
import '../button';
import '.';

const COMPONENT_TAG = 'vwc-toggletip';

describe('vwc-toggletip', () => {
	let element: Toggletip;
	let anchor: Button;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		) as Toggletip;

		anchor = fixture(
			'<vwc-button id="anchorButton"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
		) as Button;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-toggletip', async () => {
			expect(toggletipDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Toggletip);

			expect(element.open).toBe(false);
			expect(element.alternate).toBe(false);
			expect(element.headline).toBeUndefined();
			expect(element.placement).toBe('right');
		});
	});

	describe('open', () => {
		it('should open when its anchor is clicked', async () => {
			element.anchor = 'anchorButton';
			await elementUpdated(element);

			expect(element.open).toBe(false);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remain open when clicked inside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should set open to false when clicked outside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		it('should set open to false when Escape is pressed', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

	});

	describe('anchor', () => {

		describe('observer cleanup', function () {
			let disconnectionFunc: any;
			let mutationObserverSpy: any;
			beforeEach(function () {
				const mockMutationObserver = jest.fn(function(this: any, callback) {
					this.observe = jest.fn();
					disconnectionFunc = this.disconnect = jest.fn();
					callback();
				});
				mutationObserverSpy = jest.spyOn(window, 'MutationObserver')
					.mockImplementation(mockMutationObserver as any);
			});

			afterEach(function () {
				mutationObserverSpy.mockRestore();
			});

			it('should remove observer when element is removed from the DOM', async function () {
				element.anchor = 'nonExistentAnchor';
				element.remove();
				expect(disconnectionFunc).toHaveBeenCalled();
			});
		});

		it('should accept an anchor before anchor element is added to the DOM', async () => {
			const newAnchor = document.createElement('vwc-button');
			newAnchor.id = 'anchorButton2';
			element.anchor = 'anchorButton2';

			element.parentElement?.appendChild(newAnchor);

			await elementUpdated(element);

			fireEvent(newAnchor, new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
			newAnchor.remove();
		});

		it('should accept an HTMLElement as anchor', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should remove the previous anchor\'s listener when anchor is changed', async () => {
			fixture(
				'<vwc-button id="anchorButton2"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
			) as Button;

			element.anchor = 'anchorButton';
			await elementUpdated(element);

			element.anchor = 'anchorButton2';
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(false);
		});

		it('should set the new anchor\'s listener when anchor is changed', async () => {
			const anchor2 = fixture(
				'<vwc-button id="anchorButton2"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
			) as Button;

			element.anchor = 'anchorButton';
			await elementUpdated(element);

			element.anchor = 'anchorButton2';
			await elementUpdated(element);

			anchor2.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should remove the aria-label from old anchor when changed', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			element.anchor = 'anchor2';
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual('');
		});

		it('should set the aria-label on anchor', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(' ; Show more information');
		});

		it('should update the anchor aria-label', async () => {
			const initialLabel = 'some existing label';
			anchor.ariaLabel = initialLabel;

			element.anchor = anchor;
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(initialLabel + ' ; Show more information');
		});

		it('should revert the aria-label on anchor when toggletip is removed', async () => {
			const initialLabel = 'some existing label';
			anchor.ariaLabel = initialLabel;
			element.anchor = anchor;
			await elementUpdated(element);

			element.anchor = '';
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(initialLabel);
		});
	});

	describe('headline', () => {
		it('should set the headline', async () => {
			element.headline = 'A title!';
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('header.headline')?.textContent?.trim()).toEqual(element.headline);
		});

		it('should remove headline element when headline is undefined', async () => {
			element.headline = 'A title!';
			await elementUpdated(element);
			element.headline = undefined;
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelector('header.headline')).toBeNull();
		});
	});
});

//TODO:: test for removal of observer when removed from DOM
