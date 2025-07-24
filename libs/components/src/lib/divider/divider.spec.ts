import { elementUpdated, fixture } from '@repo/shared';
import { Appearance } from '../enums.js';
import { Divider } from './divider';
import '.';

const COMPONENT_TAG = 'vwc-divider';

describe('vwc-divider', () => {
	let element: Divider;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Divider;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-divider', async () => {
			expect(element).toBeInstanceOf(Divider);
			expect(element.role).toBe('separator');
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('orientation', function () {
		it('should set the orientation class', async function () {
			const base = element.shadowRoot?.querySelector('.base');
			const orientation = 'vertical';
			element.orientation = orientation;
			await elementUpdated(element);

			expect(base?.classList.contains(`${orientation}`)).toBeTruthy();
		});

		it('should set the aria-orientation attribute if role is separator', async () => {
			const orientation = 'vertical';
			element.orientation = orientation;
			element.role = 'separator';
			await elementUpdated(element);

			expect(element.getAttribute('aria-orientation')).toBe('vertical');
		});

		it('should NOT set the aria-orientation attribute if role is presentation', async () => {
			const orientation = 'vertical';
			element.orientation = orientation;
			element.role = 'presentation';
			await elementUpdated(element);

			expect(element.getAttribute('aria-orientation')).toBe(null);
		});
	});

	describe('appearance', function () {
		it('should set the appearance class', async function () {
			const base = element.shadowRoot?.querySelector('.base');
			const appearance = 'subtle';
			element.appearance = Appearance.Subtle;
			await elementUpdated(element);

			expect(base?.classList.contains(`appearance-${appearance}`)).toBeTruthy();
		});
	});

	describe('a11y attributes', () => {
		it('should keep default role of separator when role is removed', async () => {
			(element as any).role = undefined;
			await elementUpdated(element);

			expect(element.getAttribute('role')).toEqual('separator');
		});
	});
});
