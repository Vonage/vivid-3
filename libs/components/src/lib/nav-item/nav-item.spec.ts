import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { NavDisclosureConnotation } from '../nav-disclosure/nav-disclosure';
import { Icon } from '../icon/icon';
import { NavItem } from './nav-item';
import '.';
import { navItemDefinition } from './definition';

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
			expect(element.appearance).toBeUndefined();
			expect(element.connotation).toBeUndefined();
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="icon"]')
			).toBeTruthy();
		});

		it('should add an icon to the nav item', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
		});
	});

	describe('icon-only', () => {
		it('should set correct internal icon-only style', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			expect(
				element.shadowRoot?.querySelector('.control.icon-only')
			).toBeInstanceOf(Element);
		});
	});

	describe('text', () => {
		it('should set text property value as text content', async () => {
			const text = 'lorem';
			element.text = text;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('.control');
			expect(control?.textContent?.trim()).toEqual(text);
		});
	});

	describe('nav-item appearance', function () {
		it('should set the appearance class on the control', async function () {
			const appearance = 'ghost-light';

			(element as any).appearance = appearance;
			await elementUpdated(element);

			expect(
				element?.shadowRoot
					?.querySelector('.control')
					?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('nav-item connotation', function () {
		it('should set the connotation class on control', async function () {
			const connotation = 'cta' as NavDisclosureConnotation;

			(element as any).connotation = connotation;
			await elementUpdated(element);

			expect(
				element?.shadowRoot
					?.querySelector('.control')
					?.classList.contains(`connotation-${connotation}`)
			).toBeTruthy();
		});
	});

	describe('meta slot', () => {
		it('should have a meta slot', async () => {
			expect(element.shadowRoot?.querySelector('slot[name=meta]')).toBeTruthy();
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.ariaCurrent = 'page';
			element.text = 'lorem';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});

		describe('aria-current', function () {
			it('should set aria-current on the nav-item if set', async () => {
				const ariaCurrent = 'page';
				element.ariaCurrent = ariaCurrent;
				await elementUpdated(element);
				expect(element.getAttribute('aria-current')).toEqual(ariaCurrent);
			});
		});
	});
});
