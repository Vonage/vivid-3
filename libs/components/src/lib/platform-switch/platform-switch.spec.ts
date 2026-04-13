import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { PlatformSwitch } from './platform-switch';
import '.';

const COMPONENT_TAG = 'vwc-platform-switch';

function isHidden(el: HTMLElement): boolean {
	return el.style.display === 'none';
}

describe('vwc-platform-switch', () => {
	let element: PlatformSwitch;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as PlatformSwitch;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-platform-switch', async () => {
			expect(element).toBeInstanceOf(PlatformSwitch);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('constraints', () => {
		it('should show the apple child on Apple and hide the fallback', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-keyboard="apple">Apple</span>
					<span>Fallback</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(false);
			expect(isHidden(children[1])).toBe(true);

			vi.restoreAllMocks();
		});

		it('should hide the apple child and show the fallback on non-Apple', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux x86_64');

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-keyboard="apple">Apple</span>
					<span>Fallback</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);
			expect(isHidden(children[1])).toBe(false);

			vi.restoreAllMocks();
		});

		it('should hide all children when none match', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux x86_64');

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-keyboard="apple">Apple</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);

			vi.restoreAllMocks();
		});

		it('should show only the first matching child when multiple match', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-keyboard="apple">First Apple</span>
					<span data-keyboard="apple">Second Apple</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(false);
			expect(isHidden(children[1])).toBe(true);

			vi.restoreAllMocks();
		});

		it('should update when children are added dynamically', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
			)) as PlatformSwitch;

			const span = document.createElement('span');
			span.dataset.keyboard = 'apple';
			span.textContent = 'Apple';
			element.appendChild(span);
			await elementUpdated(element);

			expect(isHidden(span)).toBe(false);

			vi.restoreAllMocks();
		});
	});
});
