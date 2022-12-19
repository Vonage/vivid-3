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

	describe('show', () => {
		it('should set "open" to true', async () => {
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			await elementUpdated(element);

			fireEvent(anchor, new MouseEvent('mouseover'));
			await elementUpdated(element);

			expect(element.open)
				.toEqual(true);
		});
	});

	describe('hide', () => {
		it('should set "open" to false', async () => {
			const anchor = await setAnchor();
			element.anchor = 'anchor';
			element.open = true;
			await elementUpdated(element);

			fireEvent(anchor, new MouseEvent('mouseout'));
			await elementUpdated(element);

			expect(element.open)
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
