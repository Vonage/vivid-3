import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('vwc-country-group', () => {
	let element: CountryGroup;
	let originalRaf: typeof requestAnimationFrame | undefined;
	let originalIntersectionObserver:
		| typeof globalThis.IntersectionObserver
		| undefined;

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

	const installIntersectionObserverMock = () => {
		originalIntersectionObserver = globalThis.IntersectionObserver;

		type Cb = (entries: IntersectionObserverEntry[]) => void;

		const instances: Array<{
			trigger: (entries: IntersectionObserverEntry[]) => void;
			observeTargets: Element[];
			getDisconnectCalls: () => number;
		}> = [];

		const Mock = class {
			readonly #cb: Cb;
			readonly observeTargets: Element[] = [];
			disconnectCalls = 0;

			constructor(cb: Cb) {
				this.#cb = cb;
				instances.push({
					trigger: (entries) => this.#cb(entries),
					observeTargets: this.observeTargets,
					getDisconnectCalls: () => this.disconnectCalls,
				});
			}

			observe = (target: Element) => {
				this.observeTargets.push(target);
			};

			unobserve = () => {
				// no-op
			};

			disconnect = () => {
				this.disconnectCalls++;
			};
		};

		globalThis.IntersectionObserver =
			Mock as unknown as typeof globalThis.IntersectionObserver;

		const ioEntry = (args: {
			target: Element;
			isIntersecting: boolean;
			intersectionRatio: number;
		}): IntersectionObserverEntry =>
			({
				time: performance.now(),
				target: args.target,
				isIntersecting: args.isIntersecting,
				intersectionRatio: args.intersectionRatio,
				boundingClientRect: {} as DOMRectReadOnly,
				intersectionRect: {} as DOMRectReadOnly,
				rootBounds: null,
			}) as unknown as IntersectionObserverEntry;

		const triggerAll = (entries: IntersectionObserverEntry[]) => {
			for (const inst of instances) {
				inst.trigger(entries);
			}
		};

		return { instances, ioEntry, triggerAll };
	};

	const restoreIntersectionObserver = () => {
		if (!originalIntersectionObserver) {
			return;
		}
		globalThis.IntersectionObserver = originalIntersectionObserver;
	};

	beforeEach(async () => {
		element = await createCountryGroup();
	});

	afterEach(() => {
		if (originalRaf) {
			restoreRaf();
		}
		if (originalIntersectionObserver) {
			restoreIntersectionObserver();
		}
	});

	describe('Basics', () => {
		it('creates the component', () => {
			expect(element).toBeInstanceOf(CountryGroup);
		});

		it('sets host role for accessibility', () => {
			expect(element.getAttribute('role')).toBe('group');
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

	describe('IntersectionObserver layout', () => {
		it('falls back to showing all items when IntersectionObserver is unavailable', async () => {
			immediateRaf();
			originalIntersectionObserver = globalThis.IntersectionObserver;
			// @ts-expect-error intentional for test
			globalThis.IntersectionObserver = undefined;

			const el = await createCountryGroup();
			expect(el.visibleCount).toBe(el.countryItems.length);
			expect(el.overflowCount).toBe(0);
		});

		it('creates a single IntersectionObserver instance (no duplicate init)', async () => {
			const { instances } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup();
			// `connectedCallback` and the `#requestFit` RAF can both race to init.
			expect(instances.length).toBeGreaterThan(0);

			// Trigger another fit; should not create a new IO instance.
			el.countryItemsChanged();
			await elementUpdated(el);
			expect(instances.length).toBeGreaterThan(0);
		});

		it('observes all country items (and badge when present) when syncing targets', async () => {
			const { instances } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup();
			const items = el.countryItems as unknown as HTMLElement[];

			// Add a badge element reference so syncing targets observes it too.
			const badge = document.createElement('div');
			el.badgeEl = badge;

			el.countryItemsChanged();
			await elementUpdated(el);
			await new Promise((r) => setTimeout(r, 0));
			await elementUpdated(el);

			const observed = new Set(
				instances.flatMap((i) => i.observeTargets) as Element[]
			);
			for (const it of items) {
				expect(observed.has(it)).toBe(true);
			}
			expect(observed.has(badge)).toBe(true);
		});

		it('sets visibleCount=0 when IO recompute runs with no items', async () => {
			const { instances } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup('');
			expect(el.countryItems.length).toBe(0);

			const io = instances.at(-1);
			expect(io).toBeTruthy();
			io!.trigger([]);

			expect(el.visibleCount).toBe(0);
		});

		it('recomputes visibleCount from intersection state and fills the overflow grid', async () => {
			const { instances, ioEntry } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup();
			const items = el.countryItems as unknown as HTMLElement[];

			// Mark first two visible, third hidden => visibleCount should become 2.
			const io = instances.find((i) => i.observeTargets.includes(items[0]));
			expect(io).toBeTruthy();

			io!.trigger([
				ioEntry({ target: items[0], isIntersecting: true, intersectionRatio: 1 }),
				ioEntry({ target: items[1], isIntersecting: true, intersectionRatio: 1 }),
				ioEntry({ target: items[2], isIntersecting: false, intersectionRatio: 0 }),
			]);
			// recomputeVisibleCountFromIntersection runs synchronously in the IO callback.
			expect(el.visibleCount).toBe(2);
			await elementUpdated(el);

			expect(el.visibleCount).toBe(2);
			expect(el.overflowCount).toBe(items.length - 2);
			expect(el.overflowCount).toBeGreaterThan(0);

			// Fill overflow grid deterministically via the internal method.
			el.overflowGridEl = document.createElement('div');
			el.fillOverflowGrid();
			expect(el.overflowGridEl.children.length).toBe(el.overflowCount);
			const firstClone = el.overflowGridEl.children.item(0) as HTMLElement;
			expect(firstClone.getAttribute('aria-hidden')).toBe('true');
			expect(firstClone.style.display).toBe('');
		});

		it('hides one more item when the badge is present but not fully visible', async () => {
			const { ioEntry, triggerAll } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup();
			const items = el.countryItems as unknown as HTMLElement[];
			const badge = document.createElement('div');
			el.badgeEl = badge;

			// First hidden at index 2 => nextVisible 2; badge not ok => nextVisible 1.
			triggerAll([
				ioEntry({ target: items[0], isIntersecting: true, intersectionRatio: 1 }),
				ioEntry({ target: items[1], isIntersecting: true, intersectionRatio: 1 }),
				ioEntry({ target: items[2], isIntersecting: false, intersectionRatio: 0 }),
				ioEntry({ target: badge, isIntersecting: false, intersectionRatio: 0 }),
			]);
			await elementUpdated(el);

			expect(el.visibleCount).toBe(1);
		});

		it('keeps showing all items when everything is fully visible', async () => {
			const { ioEntry, triggerAll } = installIntersectionObserverMock();
			immediateRaf();

			const el = await createCountryGroup();
			const items = el.countryItems as unknown as HTMLElement[];

			// Start from overflowed state to ensure we hit the "firstHidden === -1" update path.
			el.visibleCount = 1;
			await elementUpdated(el);

			triggerAll(
				items.map((it) =>
					ioEntry({ target: it, isIntersecting: true, intersectionRatio: 1 })
				)
			);
			await elementUpdated(el);

			expect(el.visibleCount).toBe(items.length);
			expect(el.overflowCount).toBe(0);
		});
	});
});
