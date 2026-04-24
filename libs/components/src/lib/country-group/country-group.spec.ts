import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import '.';
import type { CountryGroup } from './country-group';
import type { Country } from '../country/country';

const TAG = 'vwc-country-group';
const ORIGINAL_IO = globalThis.IntersectionObserver;
const ORIGINAL_RAF = globalThis.requestAnimationFrame;

const DEFAULT_MARKUP = `
  <vwc-country code="UK"></vwc-country>
  <vwc-country code="NO" label="Norway"></vwc-country>
  <vwc-country code="US"></vwc-country>
`;

type IoInstance = {
	cb: (entries: IntersectionObserverEntry[]) => void;
	observed: Element[];
	disconnectCalls: number;
};

const tick = async () => new Promise((r) => setTimeout(r, 0));

const flush = async (el?: Element) => {
	if (el) await elementUpdated(el);
	await Promise.resolve();
	await tick();
	if (el) await elementUpdated(el);
};

const installIOMock = () => {
	const instances: IoInstance[] = [];

	class MockIntersectionObserver {
		observed: Element[] = [];
		disconnectCalls = 0;
		constructor(public cb: (entries: IntersectionObserverEntry[]) => void) {
			instances.push(this as unknown as IoInstance);
		}
		observe = (target: Element) => {
			this.observed.push(target);
		};
		unobserve = (_target: Element) => {
			// no-op
		};
		disconnect = () => {
			this.disconnectCalls++;
		};
	}

	globalThis.IntersectionObserver =
		MockIntersectionObserver as unknown as typeof IntersectionObserver;

	const entry = (target: Element, ratio?: number): IntersectionObserverEntry =>
		({
			time: performance.now(),
			target,
			isIntersecting: (ratio ?? 1) > 0,
			intersectionRatio: ratio,
			boundingClientRect: {} as any,
			intersectionRect: {} as any,
			rootBounds: null,
		}) as any;

	return { instances, entry };
};

const runRafImmediately = () => {
	(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
		cb(performance.now());
		return 0 as any;
	};
};

const holdRaf = () => {
	let queued: FrameRequestCallback | null = null;
	const rafSpy = vi.fn((cb: FrameRequestCallback) => {
		queued = cb;
		return 0 as any;
	});
	(globalThis as any).requestAnimationFrame = rafSpy;
	return {
		rafSpy,
		flush: () => {
			const cb = queued;
			queued = null;
			cb?.(performance.now());
		},
	};
};

const createGroup = async (markup = DEFAULT_MARKUP) => {
	const el = (await fixture(`<${TAG}>${markup}</${TAG}>`)) as CountryGroup;
	await flush(el);
	el.shadowRoot?.querySelector('slot')?.dispatchEvent(new Event('slotchange'));
	await flush(el);
	return el;
};

const setOverflow = async (el: CountryGroup, lastVisibleIndex: number) => {
	el.lastVisibleIndex = lastVisibleIndex;
	await flush(el);
	await flush(el);
	const badge = el.shadowRoot?.querySelector('vwc-badge') as HTMLElement | null;
	const popup = el.shadowRoot?.querySelector('vwc-popup') as HTMLElement | null;
	return { badge, popup };
};

describe('vwc-country-group', () => {
	beforeEach(() => {
		installIOMock();
	});

	afterAll(() => {
		globalThis.IntersectionObserver = ORIGINAL_IO;
	});

	afterEach(() => {
		globalThis.requestAnimationFrame = ORIGINAL_RAF;
		vi.restoreAllMocks();
	});

	it('renders its container, and only shows overflow UI when countries do not fit', async () => {
		const el = await createGroup();
		expect(el.shadowRoot?.querySelector('.container')).toBeTruthy();
		expect(el.shadowRoot?.querySelector('.io-resize-sentinel')).toBeTruthy();
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeFalsy();
		expect(el.shadowRoot?.querySelector('vwc-popup')).toBeFalsy();

		const { badge, popup } = await setOverflow(el, 1);
		expect(badge).toBeTruthy();
		expect(popup).toBeTruthy();
	});

	it('exposes a readable accessible label from the slotted countries', async () => {
		const el = await createGroup(
			`
			<vwc-country></vwc-country>
			<vwc-country code=""></vwc-country>
			<vwc-country code="XX"></vwc-country>
			<vwc-country code="NO" label="Norway"></vwc-country>
			<vwc-country code="UK"></vwc-country>
		`
		);
		const label = el.computedAriaLabel ?? '';
		expect(label).toContain('Countries:');
		expect(label).toContain('XX');
		expect(label).toContain('Norway');
		expect(label).toContain('United Kingdom');

		const onlyEmpty = await createGroup(`<vwc-country></vwc-country>`);
		expect(onlyEmpty.computedAriaLabel).toBe('Countries:');
	});

	it('starts tracking country visibility once', async () => {
		const { instances } = installIOMock();
		const el = await createGroup();

		expect(instances.length).toBeGreaterThan(0);
		const inst = instances.at(-1)!;
		expect(inst.observed.includes(el.sentinelEl!)).toBe(true);
		expect(inst.observed.length).toBeGreaterThanOrEqual(el.items.length);

		// repeated setup should not create another tracker
		el.shadowRoot
			?.querySelector('slot')
			?.dispatchEvent(new Event('slotchange'));
		await flush(el);
		expect(instances.length).toBe(1);
	});

	it('does not crash if it gets disconnected during startup', async () => {
		installIOMock();
		runRafImmediately();
		const el = (await fixture(
			`<${TAG}>
				<vwc-country code="UK"></vwc-country>
			</${TAG}>`
		)) as CountryGroup;
		el.remove();
		await flush();
	});

	it('covers observeAll early-return when observer is missing', async () => {
		runRafImmediately();
		const el = await createGroup();
		const { flush: flushRaf } = holdRaf();
		el.shadowRoot
			?.querySelector('slot')
			?.dispatchEvent(new Event('slotchange'));
		(el as any).disconnectedCallback();
		flushRaf();
		expect(el.lastVisibleIndex).toBe(el.items.length);
	});

	it('does not restart tracking if connectedCallback runs again', async () => {
		const { instances } = installIOMock();
		runRafImmediately();
		const el = await createGroup();
		expect(instances.length).toBe(1);
		(el as any).connectedCallback();
		await flush(el);
		expect(instances.length).toBe(1);
	});

	it('keeps the visible count stable while a resize recalculation is queued', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();
		const el = await createGroup(`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`);
		const before = el.lastVisibleIndex;
		const inst = instances.at(-1)!;
		inst.cb([entry(el.sentinelEl!, 1)]);
		expect(el.lastVisibleIndex).toBe(before);
	});

	it('temporarily keeps overflowed countries in-flow (hidden) during measurement', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();
		const el = await createGroup(`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`);
		await setOverflow(el, 1);

		const inst = instances.at(-1)!;
		inst.cb([entry(el.sentinelEl!, 1)]);

		expect(el.items[2].style.position).toBe('');
		expect(el.items[2].style.visibility).toBe('hidden');
	});

	it('hides countries that do not fit without using display:none', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();
		const el = await createGroup(`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`);
		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [entry(items[0], 1), entry(items[1], 1), entry(items[2], 0)];

		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(3);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(2);

		expect(items[0].style.pointerEvents).toBe('');
		expect(items[2].style.pointerEvents).toBe('none');
		expect(items[2].style.position).toBe('absolute');
		expect(items[2].style.visibility).toBe('hidden');
	});

	it('recalculates when size changes and item visibility updates arrive together', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [
			entry(el.sentinelEl!, 1),
			entry(items[0], 1),
			entry(items[1], 1),
			entry(items[2], 1),
		];
		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(3);

		// restored in afterEach
	});

	it('does not change the count based on a badge before the badge is measured', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);

		await setOverflow(el, 2);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeTruthy();

		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [
			entry(el.sentinelEl!, 1),
			entry(items[0], 1),
			entry(items[1], 1),
			entry(items[2], 0),
		];

		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(2);
	});

	it('treats unknown visibility as not visible', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [
			entry(items[0]), // intersectionRatio undefined => treated as 0
			entry(items[1], 1),
			entry(items[2], 1),
		];

		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(0);
	});

	it('keeps working even if an unexpected element is present', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
		`
		);
		// simulate an item list that includes an element not present in the map
		const extra = document.createElement('div');
		el.items = [...el.items, extra] as Country[];

		const inst = instances.at(-1)!;
		// omit `extra` from the entries so it stays missing in the map
		const batch = [entry(el.items[0], 1), entry(el.items[1], 1)];
		inst.cb(batch);
		inst.cb(batch);

		expect(el.lastVisibleIndex).toBe(3);
	});

	it('does not hide an extra country when the “+N” badge itself is fully visible', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		await setOverflow(el, 1);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeTruthy();

		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [
			entry(items[0], 1),
			entry(items[1], 0), // firstHidden = 1 (not last)
			entry(items[2], 0),
			entry(el.badgeEl!, 1), // badge visible => should NOT reduce visible count further
		];
		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(1);
	});

	it('reduces visible items by one when the badge itself would overflow', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		await setOverflow(el, 1);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeTruthy();

		const inst = instances.at(-1)!;
		const items = el.items;
		const badge = el.badgeEl!;
		const batch = [
			entry(items[0], 1),
			entry(items[1], 1),
			entry(items[2], 0),
			entry(badge, 0),
		];

		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(1);
		// restored in afterEach
	});

	it('handles the "badge causes its own overflow" edge case', async () => {
		const { instances, entry } = installIOMock();
		runRafImmediately();

		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		await setOverflow(el, 2);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeTruthy();

		const inst = instances.at(-1)!;
		const items = el.items;
		const badge = el.badgeEl!;
		const batch = [
			entry(items[0], 1),
			entry(items[1], 1),
			entry(items[2], 0),
			entry(badge, 1),
		];

		inst.cb(batch);
		inst.cb(batch);
		expect(el.lastVisibleIndex).toBe(3);
		expect(el.overflowCount).toBe(0);
		// restored in afterEach
	});

	it('opens the overflow popup and clones overflowed items into the grid', async () => {
		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);

		el.lastVisibleIndex = el.items.length;
		el.handleMouseEnter();
		expect(el.popupOpen).toBe(false);

		await setOverflow(el, 1);
		el.handleMouseEnter();
		expect(el.popupOpen).toBe(true);
		el.handleMouseLeave();

		expect(el.popupOpen).toBe(false);
		expect(() => el.popupOpenChanged(undefined)).not.toThrow();

		el.overflowGridEl = undefined;
		el.fillOverflowGrid();
		el.overflowGridEl = document.createElement('div');
		el.lastVisibleIndex = el.items.length;
		el.overflowGridEl.appendChild(document.createElement('div'));
		el.fillOverflowGrid();
		expect(el.overflowGridEl.children.length).toBe(1);

		el.lastVisibleIndex = 1;
		el.fillOverflowGrid();
		expect(el.overflowGridEl.children.length).toBe(2);
		const c0 = el.overflowGridEl.children.item(0) as HTMLElement;
		expect(c0.getAttribute('aria-hidden')).toBe('true');
		expect(c0.getAttribute('style')).toBe(null);
	});

	it('cancels any pending updates when disconnected', async () => {
		const { instances, entry } = installIOMock();
		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		let queued: FrameRequestCallback | null = null;
		(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
			queued = cb;
			return 0 as any;
		};
		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [entry(items[0], 1), entry(items[1], 1), entry(items[2], 0)];

		inst.cb(batch);
		inst.cb(batch);
		expect(queued).toBeTruthy();

		// call directly to avoid relying on DOM lifecycle in jsdom
		(el as any).disconnectedCallback();
		queued!(performance.now());
		// restored in afterEach
	});

	it('does not enqueue multiple recalculations during rapid resize signals', async () => {
		const { instances, entry } = installIOMock();
		const el = await createGroup();
		const { rafSpy, flush } = holdRaf();

		const inst = instances.at(-1)!;
		// sentinel triggers requestFit; with holding RAF the fit stays queued
		inst.cb([entry(el.sentinelEl!, 1)]);
		inst.cb([entry(el.sentinelEl!, 1)]);
		expect(rafSpy).toHaveBeenCalledTimes(1);
		flush();
		// restored in afterEach
	});

	it('does not schedule duplicate updates while one is already queued', async () => {
		const { instances, entry } = installIOMock();
		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		const { rafSpy, flush } = holdRaf();
		const inst = instances.at(-1)!;
		const items = el.items;
		const batch = [entry(items[0], 1), entry(items[1], 1), entry(items[2], 0)];

		// 1st: candidate streak 1, no commit
		inst.cb(batch);
		// 2nd: candidate streak 2, queues commit (but we hold RAF)
		inst.cb(batch);
		expect(rafSpy).toHaveBeenCalledTimes(1);
		// 3rd: would try to queue again, but commitQueued guard prevents it
		inst.cb(batch);
		expect(rafSpy).toHaveBeenCalledTimes(1);
		flush();
	});

	it('keeps tracking safe when overflow UI appears/disappears', async () => {
		const { instances } = installIOMock();
		runRafImmediately();
		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		await setOverflow(el, 1);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeTruthy();

		el.shadowRoot
			?.querySelector('slot')
			?.dispatchEvent(new Event('slotchange'));
		await elementUpdated(el);
		const inst = instances.at(-1)!;
		expect(inst.observed.includes(el.badgeEl!)).toBe(true);
	});

	it('does not throw if the resize sentinel is missing during a re-connect', async () => {
		installIOMock();
		runRafImmediately();
		const el = await createGroup();
		await expect(
			(async () => {
				(el as any).sentinelEl = undefined;
				(el as any).connectedCallback();
				await flush(el);
			})()
		).resolves.toBeUndefined();
	});

	it('wires template events (mouseenter/mouseleave/keydown) to component handlers', async () => {
		runRafImmediately();
		const el = await createGroup(
			`
			<vwc-country code="UK"></vwc-country>
			<vwc-country code="NO"></vwc-country>
			<vwc-country code="US"></vwc-country>
		`
		);
		await setOverflow(el, 1);

		const wrap = el.shadowRoot?.querySelector('.overflow-wrap') as HTMLElement;
		expect(wrap).toBeTruthy();

		wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		expect(el.popupOpen).toBe(true);
		wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		expect(el.popupOpen).toBe(false);
	});
});
