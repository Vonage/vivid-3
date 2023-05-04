import { ADD_TEMPLATE_TO_FIXTURE, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { Button } from '../button/button';
import { Toggletip } from './toggletip';
import '../button';
import '.';
import { toggletipDefinition } from './definition';

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

	describe('open/close', () => {
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

		it('should close when clicked outside', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});

		it('should close when Escape is pressed', async () => {
			element.anchor = 'anchorButton';
			element.open = true;
			await elementUpdated(element);

			document.body.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(false);
		});
	
	});

	describe('anchor', () => {
		it('should accept an HTMLElement as anchor', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);

			expect(element.open).toEqual(true);
		});

		it('should open correctly when its anchor is changed', async () => {
			const anchor2 = fixture(
				'<vwc-button id="anchorButton2"></vwc-button>', ADD_TEMPLATE_TO_FIXTURE
			) as Button;
	
			element.anchor = 'anchorButton';
			await elementUpdated(element);

			element.anchor = 'anchorButton2';
			await elementUpdated(element);
			expect(element.open).toEqual(false);

			anchor.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(false);

			anchor2.dispatchEvent(new MouseEvent('click', {bubbles: true}));
			await elementUpdated(element);
			expect(element.open).toEqual(true);
		});

		it('should update the anchor aria-label when none is set', async () => {
			element.anchor = anchor;
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(' ; Show more information');

			element.anchor = '';
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual('');
		});

		it('should update the anchor aria-label when it already has one', async () => {
			const initialLabel = 'some existing label';
			
			anchor.ariaLabel = initialLabel;
			element.anchor = anchor;
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(initialLabel + ' ; Show more information');

			element.anchor = '';
			await elementUpdated(element);

			expect(anchor.ariaLabel).toEqual(initialLabel);
		});
	});

	describe('headline', () => {
		it('should have an headline element only when set', async () => {
			expect(element.shadowRoot?.querySelectorAll('header.headline')).toHaveLength(0);

			element.headline = 'A title!';
			await elementUpdated(element);

			expect(element.shadowRoot?.querySelectorAll('header.headline')).toHaveLength(1);
		});
	});
});
