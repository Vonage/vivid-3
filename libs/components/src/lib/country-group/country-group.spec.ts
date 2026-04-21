import { elementUpdated, fixture } from '@repo/shared';
import { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('vwc-country-group', () => {
	let element: CountryGroup;
	let originalRaf: typeof requestAnimationFrame | undefined;

	const createCountryGroup = async (countriesMarkup?: string) => {
		const el = (await fixture(
			`<${COMPONENT_TAG} style="width: 280px">
				${
					countriesMarkup ??
					`
					<vwc-country code="uk"></vwc-country>
					<vwc-country code="NO" label="Norway"></vwc-country>
					<vwc-country code="US"></vwc-country>
				`
				}
			</${COMPONENT_TAG}>`
		)) as CountryGroup;
		await elementUpdated(el);

		// jsdom doesn't reliably run the `slotted()` directive; populate explicitly
		// so badge/overflow behavior is testable.
		el.countryItems = Array.from(
			el.querySelectorAll('vwc-country')
		) as unknown as CountryGroup['countryItems'];
		el.countryItemsChanged();
		await elementUpdated(el);

		return el;
	};

	const immediateRaf = () => {
		originalRaf = globalThis.requestAnimationFrame;
		// Run RAF callbacks synchronously to make measurement deterministic in jsdom.
		const patched = globalThis as unknown as {
			requestAnimationFrame: (cb: FrameRequestCallback) => number;
		};
		patched.requestAnimationFrame = (cb: FrameRequestCallback) => {
			cb(performance.now());
			return 0 as unknown as number;
		};
	};

	const restoreRaf = () => {
		if (!originalRaf) {
			return;
		}
		globalThis.requestAnimationFrame = originalRaf;
	};

	beforeEach(async () => {
		element = await createCountryGroup();
	});

	afterEach(() => {
		if (originalRaf) {
			restoreRaf();
		}
	});

	describe('Basics', () => {
		it('creates the component', () => {
			expect(element).toBeInstanceOf(CountryGroup);
		});

		it('sets host role and tabindex for accessibility', () => {
			expect(element.getAttribute('role')).toBe('group');
			expect(element.getAttribute('tabindex')).toBe('0');
		});
	});

	describe('ARIA Label', () => {
		it('builds aria-label from slotted countries (code + label)', async () => {
			await elementUpdated(element);
			const label = element.getAttribute('aria-label');
			expect(label).toContain('UK');
			expect(label).toContain('Norway');
			expect(label).toContain('US');
		});

		it('skips empty country labels', async () => {
			const empty = document.createElement('vwc-country');
			element.appendChild(empty);

			// Simulate the slotted directive update (jsdom won't run layout).
			element.countryItems = Array.from(
				element.querySelectorAll('vwc-country')
			) as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			const label = element.getAttribute('aria-label');
			expect(label).toContain('UK');
			expect(label).toContain('Norway');
			expect(label).toContain('US');
			expect(label).not.toContain('undefined');
		});
	});

	describe('Overflow Popover', () => {
		it('computes overflowCount from visibleCount', async () => {
			expect(element.overflowCount).toBe(0);

			element.visibleCount = 1;
			await elementUpdated(element);

			expect(element.overflowCount).toBe(2);
		});

		it('opens and closes the popover on hover when overflowing', async () => {
			element.visibleCount = 1;
			await elementUpdated(element);

			const badge = element.shadowRoot?.querySelector('vwc-badge');
			expect(badge).toBeTruthy();

			element.handleMouseEnter();
			await elementUpdated(element);

			expect(element.popupOpen).toBe(true);

			element.handleMouseLeave();
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('does not open the popover when there is no overflow', async () => {
			element.visibleCount = element.countryItems.length;
			await elementUpdated(element);

			expect(element.overflowCount).toBe(0);

			element.handleMouseEnter();
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('closes the popover on Escape (component keydown)', async () => {
			element.visibleCount = 1;
			element.popupOpen = true;
			await elementUpdated(element);

			element.popupKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('keeps the popover open on non-Escape (component keydown)', async () => {
			element.popupOpen = true;
			await elementUpdated(element);

			element.popupKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(true);
		});

		it('closes the popover on Escape (document listener)', async () => {
			// Ensure popupOpenChanged adds the document listener (oldValue must be defined).
			element.popupOpen = true;
			await elementUpdated(element);

			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('keeps the popover open on non-Escape (document listener)', async () => {
			element.popupOpen = true;
			await elementUpdated(element);

			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(true);
		});

		it('ignores initial popupOpenChanged call (oldValue undefined)', () => {
			expect(() => element.popupOpenChanged(undefined)).not.toThrow();
		});

		it('handles template mouse and keyboard events', async () => {
			// Force overflow so the popup and badge exist in the DOM.
			element.visibleCount = 1;
			await elementUpdated(element);

			const root = element.shadowRoot?.querySelector(
				'.hover-root'
			) as HTMLElement;
			expect(root).toBeTruthy();

			root.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
			await elementUpdated(element);
			expect(element.popupOpen).toBe(true);

			const popup = element.shadowRoot?.querySelector(
				'vwc-popup'
			) as HTMLElement;
			expect(popup).toBeTruthy();

			popup.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
			);
			await elementUpdated(element);
			expect(element.popupOpen).toBe(false);

			root.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
			await elementUpdated(element);
			expect(element.popupOpen).toBe(false);
		});
	});

	describe('Layout', () => {
		it('sets visibleCount=0 when there are no items', async () => {
			immediateRaf();

			element.countryItems = [] as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBe(0);
		});

		it('does not throw if rowEl reference is missing', async () => {
			immediateRaf();

			(element as unknown as { rowEl?: HTMLElement }).rowEl = undefined;
			element.countryItems = Array.from(
				element.querySelectorAll('vwc-country')
			) as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).not.toBeUndefined();
		});

		// Row limiting via max-rows is intentionally not part of the public API.
	});
});
