import { elementUpdated, fixture, getControlElement } from '@repo/shared';
import { Icon } from '../icon/icon';
import { itShouldDelegateAriaAttributes } from '../../shared/aria/should-delegate-aria.spec';
import { NavItem, type NavItemConnotation } from './nav-item';
import '.';

const COMPONENT_TAG = 'vwc-nav-item';
describe('vwc-nav-item', () => {
	let element: NavItem;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NavItem;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-nav-item', async () => {
			expect(element).toBeInstanceOf(NavItem);
			expect(element.text).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.appearance).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.current).toBeFalsy();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

			const icon = element.shadowRoot?.querySelector('vwc-icon');
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

			element.appearance = appearance;
			await elementUpdated(element);

			expect(
				element?.shadowRoot
					?.querySelector('.control')
					?.classList.contains(`appearance-${appearance}`)
			).toBeTruthy();
		});
	});

	describe('connotation', function () {
		it('should set the connotation class on control', async function () {
			const connotation = 'cta' as NavItemConnotation;

			element.connotation = connotation;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeTruthy();
		});
	});

	describe('meta slot', () => {
		it('should have a meta slot', async () => {
			expect(element.shadowRoot?.querySelector('slot[name=meta]')).toBeTruthy();
		});
	});

	describe('current', () => {
		it('should properly update aria-current when current attribute is set', async () => {
			element.current = true;
			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('aria-current')).toEqual(
				'page'
			);
		});

		it('should ensure backwards compatibility with aria-current attribute', async () => {
			element.ariaCurrent = 'page';
			await elementUpdated(element);
			expect(element.current).toBe(true);
			expect(
				getControlElement(element).classList.contains('current')
			).toBeTruthy();
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getControlElement(element),
			[
				'ariaAtomic',
				'ariaBusy',
				'ariaCurrent',
				'ariaDisabled',
				'ariaExpanded',
				'ariaHasPopup',
				'ariaHidden',
				'ariaInvalid',
				'ariaKeyShortcuts',
				'ariaLabel',
				'ariaLive',
				'ariaRelevant',
				'ariaRoleDescription',
			]
		);
	});
});
