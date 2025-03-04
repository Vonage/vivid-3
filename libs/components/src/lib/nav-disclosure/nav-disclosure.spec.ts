import {
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import { Connotation } from '@vonage/vivid';
import { Icon } from '../icon/icon';
import { NavDisclosure } from './nav-disclosure';
import '.';

const COMPONENT_TAG = 'vwc-nav-disclosure';
const ICON_SELECTOR = 'vwc-icon';

describe('vwc-nav-disclosure', () => {
	let element: NavDisclosure;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NavDisclosure;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-nav-disclosure', async () => {
			expect(element).toBeInstanceOf(NavDisclosure);
			expect(element.label).toEqual(undefined);
			expect(element.icon).toBeUndefined();
			expect(element.open).toBeFalsy();
			expect(element.ariaCurrent).toBeFalsy();
			expect(element.appearance).toBeUndefined();
			expect(element.connotation).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('aria-expanded', () => {
		it('should update aria-expanded when toggle open', async () => {
			expect(getControlElement(element).getAttribute('aria-expanded')).toEqual(
				'false'
			);

			element.open = true;
			await elementUpdated(element);
			expect(getControlElement(element).getAttribute('aria-expanded')).toEqual(
				'true'
			);
		});
	});

	describe('open', () => {
		it('should have open attribute when open', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} open></${COMPONENT_TAG}>`
			)) as NavDisclosure;

			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(true);

			element.open = false;
			await elementUpdated(element);
			expect(getBaseElement(element).hasAttribute('open')).toEqual(false);
		});
	});

	describe('label', () => {
		it('should set label property value as text content', async () => {
			const label = 'lorem';
			element.label = label;
			await elementUpdated(element);

			expect(getBaseElement(element).textContent?.trim()).toEqual(label);
		});
	});

	describe('toggle event', () => {
		it('should emit a toggle event that does not bubble when open/closed state is toggled', async function () {
			const spy = vi.fn();
			element.addEventListener('toggle', spy);

			element.details.dispatchEvent(new Event('toggle'));

			expect((spy as any).mock.calls.length).toEqual(1);
			expect((spy as any).mock.calls[0][0].bubbles).toBe(false);
		});
	});

	describe('icon', () => {
		it('should have an icon slot', async () => {
			expect(
				Boolean(element.shadowRoot?.querySelector('slot[name="icon"]'))
			).toEqual(true);
		});

		it('should have an icon when icon is set without slotted icon', async () => {
			element.icon = 'home';
			await elementUpdated(element);

			const icon = element.shadowRoot?.querySelector(ICON_SELECTOR) as Icon;
			expect(icon).toBeInstanceOf(Icon);
			expect(icon?.name).toEqual('home');
		});
	});

	describe('meta slot', () => {
		it('should have meta slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot[name="meta"]')
			).toBeTruthy();
		});
	});

	describe('a11y attributes', () => {
		describe('aria-current', function () {
			it('should not set aria-current on the nav-disclosure if opened', async function () {
				const ariaCurrent = 'true';
				element.open = true;
				element.ariaCurrent = ariaCurrent;
				await elementUpdated(element);
				expect(
					getControlElement(element).getAttribute('aria-current')
				).toBeNull();
			});

			it('should set aria-current on the nav-disclosure if closed', async function () {
				const ariaCurrent = 'true';
				element.setAttribute('aria-current', ariaCurrent);
				await elementUpdated(element);
				expect(
					getControlElement(element).getAttribute('aria-current')
				).not.toBeNull();
			});
		});
	});

	describe('nav-disclosure appearance', function () {
		it('should set the appearance class on the base', async function () {
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

	describe('connotation', function () {
		it('should set the connotation class on the base', async function () {
			const connotation = Connotation.CTA;

			element.connotation = connotation;
			await elementUpdated(element);

			expect(
				getControlElement(element).classList.contains(
					`connotation-${connotation}`
				)
			).toBeTruthy();
		});
	});
});
