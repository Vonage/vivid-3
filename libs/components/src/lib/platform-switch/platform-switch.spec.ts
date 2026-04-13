import { elementUpdated, fixture } from '@repo/shared';
import { detectOS, PlatformSwitch } from './platform-switch';
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
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('detectOS', () => {
		const originalUserAgent = navigator.userAgent;

		afterEach(() => {
			Object.defineProperty(navigator, 'userAgent', {
				value: originalUserAgent,
				configurable: true,
			});
		});

		it.each([
			['Macintosh; Intel Mac OS X 10_15_7', 'apple'],
			['iPhone; CPU iPhone OS 15_0', 'apple'],
			['iPad; CPU OS 15_0', 'apple'],
			['Windows NT 10.0; Win64; x64', 'windows'],
			['Linux x86_64', 'linux'],
			['Android 12; Mobile', 'android'],
			['CrOS x86_64 14526.89.0', 'chromeos'],
		])('should detect "%s" as "%s"', (userAgent, expected) => {
			Object.defineProperty(navigator, 'userAgent', {
				value: userAgent,
				configurable: true,
			});
			expect(detectOS()).toBe(expected);
		});
	});

	describe('filtering', () => {
		it('should show the first matching child and hide the rest', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">Apple</span>
					<span data-os="windows">Windows</span>
					<span>Fallback</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(false);
			expect(isHidden(children[1])).toBe(true);
			expect(isHidden(children[2])).toBe(true);

			vi.restoreAllMocks();
		});

		it('should show a child with no data attributes as a fallback', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux x86_64');

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">Apple</span>
					<span data-os="windows">Windows</span>
					<span>Fallback</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);
			expect(isHidden(children[1])).toBe(true);
			expect(isHidden(children[2])).toBe(false);

			vi.restoreAllMocks();
		});

		it('should hide all children when none match', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux x86_64');

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">Apple</span>
					<span data-os="windows">Windows</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);
			expect(isHidden(children[1])).toBe(true);

			vi.restoreAllMocks();
		});

		it('should hide the host element when no child matches', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Linux x86_64');

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">Apple</span>
					<span data-os="windows">Windows</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			expect(isHidden(element)).toBe(true);

			vi.restoreAllMocks();
		});

		it('should not hide the host element when a child matches', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">Apple</span>
					<span data-os="windows">Windows</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			expect(isHidden(element)).toBe(false);

			vi.restoreAllMocks();
		});

		it('should show the first matching child when multiple match', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple">First Apple</span>
					<span data-os="apple">Second Apple</span>
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
			span.dataset.os = 'apple';
			span.textContent = 'Apple';
			element.appendChild(span);
			await elementUpdated(element);

			expect(isHidden(span)).toBe(false);

			vi.restoreAllMocks();
		});

		it('should handle children with no data attributes when it is the first child', async () => {
			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span>Default</span>
					<span data-os="apple">Apple</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			// The first child has no filters, so it matches
			expect(isHidden(children[0])).toBe(false);
			expect(isHidden(children[1])).toBe(true);
		});

		it('should ignore text nodes', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			element = (await fixture(
				`<${COMPONENT_TAG}>
					Some text
					<span data-os="apple">Apple</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const span = element.querySelector('span')!;
			expect(isHidden(span)).toBe(false);

			vi.restoreAllMocks();
		});
	});

	describe('custom resolvers', () => {
		afterEach(() => {
			PlatformSwitch.resolvers = {};
		});

		it('should support custom resolvers', async () => {
			PlatformSwitch.resolvers = {
				theme: () => 'dark',
			};

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-theme="light">Light</span>
					<span data-theme="dark">Dark</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);
			expect(isHidden(children[1])).toBe(false);
		});

		it('should allow custom resolvers to override built-in resolvers', async () => {
			PlatformSwitch.resolvers = {
				os: () => 'custom-os',
			};

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="custom-os">Custom</span>
					<span data-os="apple">Apple</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(false);
			expect(isHidden(children[1])).toBe(true);
		});

		it('should require all filters to match', async () => {
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(
				'Macintosh; Intel Mac OS X'
			);

			PlatformSwitch.resolvers = {
				theme: () => 'dark',
			};

			element = (await fixture(
				`<${COMPONENT_TAG}>
					<span data-os="apple" data-theme="light">Apple Light</span>
					<span data-os="apple" data-theme="dark">Apple Dark</span>
				</${COMPONENT_TAG}>`
			)) as PlatformSwitch;
			await elementUpdated(element);

			const children = element.querySelectorAll('span');
			expect(isHidden(children[0])).toBe(true);
			expect(isHidden(children[1])).toBe(false);

			vi.restoreAllMocks();
		});
	});
});
