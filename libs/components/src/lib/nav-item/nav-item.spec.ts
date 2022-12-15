import { elementUpdated, fixture } from '@vivid-nx/shared';
import { Icon } from '../icon/icon';
import { NavItem } from './nav-item';
import '.';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';

const COMPONENT_TAG = 'vwc-nav-item';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-nav-item', () => {
	let element: NavItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NavItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-nav-item', async () => {
			expect(navItemDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(NavItem);
			expect(element.text).toEqual(undefined);
			expect(element.icon).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should add an icon to the nav item', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon)
				.toBeInstanceOf(Icon);
			expect(icon?.name)
				.toEqual('home');
		});
	});

	describe('icon-only', () => {
		it('should set correct internal icon-only style', async () => {
			const getControlIconOnly = () => element.shadowRoot?.querySelector('.control.icon-only');
			const controlIconOnlyBefore = getControlIconOnly();

			element.icon = 'home';
			await elementUpdated(element);

			const controlIconOnlyAfter = getControlIconOnly();
			expect(controlIconOnlyBefore).toBeNull();
			expect(controlIconOnlyAfter).toBeInstanceOf(Element);
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.textContent?.trim())
				.toEqual(text);
		});
	});
});
/**
 *
 */
function navItemDefinition(): any {
	throw new Error('Function not implemented.');
}

