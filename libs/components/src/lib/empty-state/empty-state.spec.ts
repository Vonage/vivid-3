import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { Icon } from '../icon/icon';
import { EmptyState } from './empty-state';
import { emptyStateDefinition } from './definition';
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
			expect(emptyStateDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(EmptyState);
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
			expect(element.shadowRoot?.querySelector('header')?.textContent?.trim()).toEqual(headlineText);
		});
	});

	describe('icon', () => {
		it('should render an inbox-line icon by default', () => {
			const icon = element.shadowRoot?.querySelector('vwc-icon') as Icon;
			expect(icon.name).toBe('inbox-line');
		});

		it('should allows setting the icon name with the icon attribute', async () => {
			element.setAttribute('icon', 'user-line');
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector('vwc-icon') as Icon;
			expect(icon.name).toBe('user-line');
		});
	});

	describe('default slot', () => {
		it('should should have a default slot with "Nothing to show." as fallback content', () => {
			expect(element.shadowRoot?.querySelector('slot:not([name])')?.textContent?.trim()).toEqual('Nothing to show.');
		});
	});

	describe('graphic slot', () => {
		it('should should have a graphic slot that contains an icon-container by default', () => {
			const slot = element.shadowRoot?.querySelector('slot[name=graphic]');
			expect(slot).toBeTruthy();
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
			expect(getBaseElement(element).classList.contains('no-action')).toBe(false);
		});

		it('should not have no-actions class if slot is occupied', async () => {
			const slotted = document.createElement('div');
			slotted.slot = 'action-items';
			element.appendChild(slotted);
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('no-action')).toBe(false);
		});
	});
});
