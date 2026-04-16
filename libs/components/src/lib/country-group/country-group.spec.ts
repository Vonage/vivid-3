import { elementUpdated, fixture } from '@repo/shared';
import { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('vwc-country-group', () => {
	let element: CountryGroup;
	let originalRaf: typeof requestAnimationFrame | undefined;
	let originalResizeObserver: typeof ResizeObserver | undefined;

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

	const restoreResizeObserver = () => {
		if (!originalResizeObserver) {
			return;
		}
		globalThis.ResizeObserver = originalResizeObserver;
	};

	const setReadonlyNumber = (obj: object, key: string, value: number) => {
		Object.defineProperty(obj, key, {
			value,
			configurable: true,
		});
	};

	beforeEach(async () => {
		element = await createCountryGroup();
	});

	afterEach(() => {
		if (originalRaf) {
			restoreRaf();
		}
		if (originalResizeObserver) {
			restoreResizeObserver();
		}
	});

	describe('Accessibility', () => {
		it('creates a Country Group element instance', () => {
			expect(element).toBeInstanceOf(CountryGroup);
		});

		it('applies accessible host attributes (role + tabindex)', () => {
			expect(element.getAttribute('role')).toBe('group');
			expect(element.getAttribute('tabindex')).toBe('0');
		});

		it('derives an aria-label from the slotted countries (code + label)', async () => {
			await elementUpdated(element);
			const label = element.getAttribute('aria-label');
			expect(label).toContain('UK');
			expect(label).toContain('Norway');
			expect(label).toContain('US');
		});

		it('omits empty country labels when building aria-label', async () => {
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

	describe('Overflow + Popup', () => {
		it('computes overflowCount from visibleCount', async () => {
			expect(element.overflowCount).toBe(0);

			element.visibleCount = 1;
			await elementUpdated(element);

			expect(element.overflowCount).toBe(2);
		});

		it('shows an overflow badge and toggles the popup via hover handlers', async () => {
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

		it('closes the popup on Escape (component keydown handler)', async () => {
			element.visibleCount = 1;
			element.popupOpen = true;
			await elementUpdated(element);

			element.popupKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('closes the popup on Escape (document listener)', async () => {
			// Ensure popupOpenChanged adds the document listener (oldValue must be defined).
			element.popupOpen = true;
			await elementUpdated(element);

			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			await elementUpdated(element);

			expect(element.popupOpen).toBe(false);
		});

		it('ignores the initial popupOpenChanged call (oldValue undefined)', () => {
			expect(() => element.popupOpenChanged(undefined)).not.toThrow();
		});

		it('wires template events (mouseenter / mouseleave / keydown) to component logic', async () => {
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

	describe('Layout Measurement', () => {
		it('measures layout and calculates visibleCount', async () => {
			immediateRaf();

			// Provide stable DOM metrics for measurement code paths.
			const rowEl = element.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 200);
			setReadonlyNumber(rowEl, 'offsetHeight', 10);

			const items = Array.from(
				element.querySelectorAll('vwc-country')
			) as HTMLElement[];
			expect(items.length).toBe(3);

			// Put all items on the same "row" and give them widths so badge doesn't fit.
			// k=3 should fit (no badge), k=2 should require badge and not fit => best=2.
			for (const it of items) {
				setReadonlyNumber(it, 'offsetTop', 0);
				setReadonlyNumber(it, 'offsetWidth', 80);
			}

			// Simulate slotted update and trigger the measurement pipeline.
			element.countryItems = items as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBeGreaterThan(0);
		});

		it('falls back to showing at least one item when nothing fits', async () => {
			immediateRaf();

			const solo = await createCountryGroup(
				'<vwc-country code="UK"></vwc-country>'
			);

			const rowEl = solo.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 100);
			setReadonlyNumber(rowEl, 'offsetHeight', 10);

			const items = Array.from(
				solo.querySelectorAll('vwc-country')
			) as HTMLElement[];
			expect(items.length).toBe(1);
			setReadonlyNumber(items[0], 'offsetTop', 0);
			setReadonlyNumber(items[0], 'offsetWidth', 2000);

			solo.countryItems = items as unknown as CountryGroup['countryItems'];
			solo.countryItemsChanged();
			await elementUpdated(solo);

			// Ensures the best===0 path is hit and normalized to 1.
			expect(solo.visibleCount).toBe(1);
		});

		it('treats a full fit as valid (no overflow badge required)', async () => {
			immediateRaf();

			const rowEl = element.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 1000);
			setReadonlyNumber(rowEl, 'offsetHeight', 10);

			const items = Array.from(
				element.querySelectorAll('vwc-country')
			) as HTMLElement[];
			for (const it of items) {
				setReadonlyNumber(it, 'offsetTop', 0);
				setReadonlyNumber(it, 'offsetWidth', 10);
			}

			element.countryItems = items as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBe(items.length);
		});

		it('reacts to ResizeObserver callback by scheduling a re-measure', async () => {
			immediateRaf();

			const instances: Array<{ trigger: () => void }> = [];
			originalResizeObserver = globalThis.ResizeObserver;
			globalThis.ResizeObserver = class {
				readonly #cb: () => void;
				constructor(cb: () => void) {
					this.#cb = cb;
					instances.push({ trigger: () => this.#cb() });
				}
				observe() {
					// no-op
				}
				disconnect() {
					// no-op
				}
			} as unknown as typeof ResizeObserver;

			const el = await createCountryGroup(
				'<vwc-country code="UK"></vwc-country>'
			);

			const rowEl = el.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 0);

			const items = Array.from(
				el.querySelectorAll('vwc-country')
			) as HTMLElement[];
			el.countryItems = items as unknown as CountryGroup['countryItems'];
			el.countryItemsChanged();
			await elementUpdated(el);

			expect(instances.length).toBeGreaterThan(0);
			instances[0].trigger();
			await elementUpdated(el);
		});

		it('handles a zero-width container during measurement', async () => {
			immediateRaf();

			const rowEl = element.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 0);

			const items = Array.from(
				element.querySelectorAll('vwc-country')
			) as HTMLElement[];
			element.countryItems = items as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBe(items.length);
		});

		it('sets visibleCount=0 when there are no slotted items', async () => {
			immediateRaf();

			const rowEl = element.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 200);

			element.countryItems = [] as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBe(0);
		});

		it('skips measurement when the row element reference is missing', async () => {
			immediateRaf();

			(element as unknown as { rowEl?: HTMLElement }).rowEl = undefined;
			element.countryItems = Array.from(
				element.querySelectorAll('vwc-country')
			) as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			expect(element.visibleCount).toBeNull();
		});

		it('respects maxRows when calculating the number of visible items', async () => {
			immediateRaf();

			element.maxRows = 1;
			const rowEl = element.shadowRoot?.querySelector('.row') as HTMLElement;
			expect(rowEl).toBeTruthy();
			setReadonlyNumber(rowEl, 'clientWidth', 500);
			setReadonlyNumber(rowEl, 'offsetHeight', 10);

			const items = Array.from(
				element.querySelectorAll('vwc-country')
			) as HTMLElement[];
			// Force the third item onto a second row.
			setReadonlyNumber(items[0], 'offsetTop', 0);
			setReadonlyNumber(items[1], 'offsetTop', 0);
			setReadonlyNumber(items[2], 'offsetTop', 20);
			for (const it of items) {
				setReadonlyNumber(it, 'offsetWidth', 10);
			}

			element.countryItems = items as unknown as CountryGroup['countryItems'];
			element.countryItemsChanged();
			await elementUpdated(element);

			// With maxRows=1, the algorithm should not be able to show all items.
			expect(element.visibleCount).toBeLessThan(items.length);
		});
	});
});
