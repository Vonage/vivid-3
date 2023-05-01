import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import { fireEvent } from '@testing-library/dom';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { Button } from '../button/button';
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
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			await element.anchorUpdated;
			element.open = false;

			fireEvent(anchor, new MouseEvent('mouseover'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});

		it('should set "open" to true on focusin', async () => {
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			await element.anchorUpdated;
			element.open = false;

			fireEvent(anchor, new Event('focusin'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});

		it('should set "open" to false on mouseout', async () => {
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			await element.anchorUpdated;
			element.open = true;
			fireEvent(anchor, new MouseEvent('mouseout'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});

		it('should set "open" to false on focusout', async () => {
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);
			await element.anchorUpdated;
			element.open = true;
			fireEvent(anchor, new Event('focusout'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(false);
		});
	});

	describe('escape', () => {
		it('should disappear when Escape is pressed', async () => {
			const anchor = await setAnchor();
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

	/**
	 *
	 */
	async function setAnchor() {
		const anchorEl = await fixture('<vwc-button id="anchor"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE) as Button;
		await elementUpdated(anchorEl);
		return anchorEl;
	}
});
