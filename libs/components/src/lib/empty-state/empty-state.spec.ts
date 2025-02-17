import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import type { Icon } from '../icon/icon';
import { EmptyState } from './empty-state';
import '.';

const COMPONENT_TAG = 'vwc-empty-state';

describe('vwc-empty-state', () => {
	let element: EmptyState;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as EmptyState;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-empty-state', async () => {
			expect(element).toBeInstanceOf(EmptyState);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('headline', () => {
		it('should not render a headline by default', () => {
			expect(element.shadowRoot?.querySelector('header')).toBeNull();
		});

		it('should render a headline when headline attribute is set', async () => {
			const headlineText = 'headline';
			element.setAttribute('headline', headlineText);
			await elementUpdated(element);
			expect(
				element.shadowRoot?.querySelector('header')?.textContent?.trim()
			).toEqual(headlineText);
		});
	});

	describe('icon', () => {
		it('should not render an icon by default', () => {
			expect(element.shadowRoot?.querySelector('vwc-icon')).toBeNull();
		});

		it('should allows setting the icon name with the icon attribute', async () => {
			element.setAttribute('icon', 'user-line');
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector('vwc-icon') as Icon;
			expect(icon.name).toBe('user-line');
		});
	});

	describe('default slot', () => {
		it('should should have a default slot', () => {
			expect(
				element.shadowRoot?.querySelector('slot:not([name])')
			).toBeTruthy();
		});
	});

	describe('graphic slot', () => {
		it('should should have a graphic slot that is empty by default', () => {
			const slot = element.shadowRoot?.querySelector('slot[name=graphic]');
			expect(slot).toBeTruthy();
			expect(slot?.childElementCount).toBe(0);
		});

		it('should place icon inside the graphic slot when using icon attribute', async () => {
			element.setAttribute('icon', 'user-line');
			await elementUpdated(element);
			const slot = element.shadowRoot?.querySelector('slot[name=graphic]');
			expect(slot?.querySelector('.icon-container')).toBeTruthy();
		});
	});

	describe('action-items slot', () => {
		it('should should have an action-items slot without fallback content', () => {
			const slot = element.shadowRoot?.querySelector('slot[name=action-items]');
			expect(slot).toBeTruthy();
			expect(slot?.childNodes.length).toBe(0);
		});

		it('should have no-actions class if slot is not occupied', () => {
			expect(getBaseElement(element).classList.contains('no-action')).toBe(
				false
			);
		});

		it('should not have no-actions class if slot is occupied', async () => {
			const slotted = document.createElement('div');
			slotted.slot = 'action-items';
			element.appendChild(slotted);
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('no-action')).toBe(
				false
			);
		});
	});
});
