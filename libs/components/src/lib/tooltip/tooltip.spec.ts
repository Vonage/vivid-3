import {ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture, getControlElement} from '@vivid-nx/shared';
import { fireEvent } from '@testing-library/dom';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { Button } from '../button/button';
import type {Popup} from '../popup/popup';
import { Tooltip } from './tooltip';
import '.';
import { tooltipDefinition } from './definition';

const COMPONENT_TAG = 'vwc-tooltip';

describe('vwc-tooltip', () => {
	let element: Tooltip;

	global.ResizeObserver = jest.fn()
		.mockImplementation(() => ({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn()
		}));

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Tooltip;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-tooltip', async () => {
			expect(tooltipDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(Tooltip);
			expect(element.open)
				.toBeFalsy();
			expect(element.anchor)
				.toBeUndefined();
			expect(element.placement)
				.toBeUndefined();
			expect(element.text)
				.toEqual(undefined);
		});
	});

	describe('open', () => {
		it('should set "open" to true on mouseover', async () => {
			const anchor = await setAnchorInDOM();
			element.anchor = 'anchor';
			await elementUpdated(element);
			element.open = false;

			fireEvent(anchor, new MouseEvent('mouseover'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});

		it('should set "open" to true on focusin', async () => {
			const anchor = await setAnchorInDOM();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = false;

			fireEvent(anchor, new Event('focusin'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});

		it('should set "open" to false on mouseout', async () => {
			const anchor = await setAnchorInDOM();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = true;
			fireEvent(anchor, new MouseEvent('mouseout'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});

		it('should set "open" to false on focusout', async () => {
			const anchor = await setAnchorInDOM();
			element.anchor = 'anchor';
			await elementUpdated(element);

			element.open = true;
			fireEvent(anchor, new Event('focusout'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('escape', () => {
		it('should disappear when Escape is pressed', async () => {
			const anchor = await setAnchorInDOM();
			element.anchor = anchor;
			await elementUpdated(element);

			element.open = true;

			fireEvent(document, new KeyboardEvent('keydown', {key: 'Escape'}));
			await elementUpdated(element);
			const openStateAfterEscape = element.open;

			expect(openStateAfterEscape)
				.toEqual(false);
		});
	});

	describe('anchor', () => {
		it('should reflect the anchor when given a string', async function () {
			element.anchor = 'button1';
			await elementUpdated(element);
			const anchorAttributeValueWithString = element.getAttribute('anchor');

			expect(anchorAttributeValueWithString)
				.toEqual('button1');
		});

		it('should reflect the anchor to element.toString when given an element', async function () {
			const anchor = document.createElement('div');

			element.anchor = anchor;
			await elementUpdated(element);
			const anchorAttributeValueWithElement = element.getAttribute('anchor');

			expect(anchorAttributeValueWithElement)
				.toEqual(anchor.toString());

		});

		it('should set the anchor on the popup by id', async function () {
			const anchorEl = await setAnchorInDOM();
			const id = 'anchor';
			const popup = getControlElement(element) as Popup;

			element.anchor = id;
			await elementUpdated(element);


			expect(popup.anchor).toBe(id);
			expect(popup.anchorEl).toEqual(anchorEl);
		});

		it('should set the anchor on the popup by element', async function () {
			const anchorEl = await setAnchorInDOM();
			const popup = getControlElement(element) as Popup;

			element.anchor = anchorEl;
			await elementUpdated(element);

			expect(popup.anchorEl)
				.toEqual(anchorEl);
		});

		it.each([
			{eventName: 'mouseover', openState: false, expectation: false},
			{eventName: 'mouseout', openState: true, expectation: true},
			{eventName: 'focusin', openState: false, expectation: false},
			{eventName: 'focusout', openState: true, expectation: true},
		])
		( 'should remove event $eventName from the old anchor',
			async function ({eventName, openState, expectation}) {
				const oldAnchorEl = await setAnchorInDOM('old-anchor');
				element.anchor = 'old-anchor';
				await elementUpdated(element);

				await setAnchorInDOM('new-anchor');
				element.anchor = 'new-anchor';
				await elementUpdated(element);

				element.open = openState;
				fireEvent(oldAnchorEl, new MouseEvent(eventName));
				expect(element.open).toEqual(expectation);
			});
	});

	/**
	 *
	 */
	async function setAnchorInDOM(id = 'anchor'): Promise<Button> {
		const anchorEl = await fixture(`<vwc-button id="${id}"></vwc-button>`, ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
