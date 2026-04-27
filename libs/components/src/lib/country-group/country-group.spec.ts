import { Updates } from '@microsoft/fast-element';
import { fixture } from '@repo/shared/test-utils/fixture';
import { mockIntersectionObserver } from '@repo/shared/test-utils/intersection-observer-mock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import '.';
import type { CountryGroup } from './country-group';

const TAG = 'vwc-country-group';

const createGroup = async (markup: string) => {
	const el = (await fixture(`<${TAG}>${markup}</${TAG}>`)) as CountryGroup;
	await Updates.next();
	el.shadowRoot?.querySelector('slot')?.dispatchEvent(new Event('slotchange'));
	await Updates.next();

	return el;
};

const countryMarkup = (
	codes: string[] = ['UK', 'NO', 'US', 'DE', 'FR', 'ES', 'IT']
) =>
	codes.map((code) => `<vwc-country code="${code}"></vwc-country>`).join('\n');

describe('vwc-country-group', () => {
	let io: ReturnType<typeof mockIntersectionObserver>;
	const settle = async () => {
		await Updates.next();
	};
	const getBadge = (el: CountryGroup) =>
		el.shadowRoot?.querySelector('vwc-badge') as HTMLElement | null;
	const setIntersections = async (
		visible: HTMLElement[],
		hidden: HTMLElement[]
	) => {
		io.enterNodes(visible);
		io.leaveNodes(hidden);
		io.enterNodes(visible);
		io.leaveNodes(hidden);
		await settle();
	};

	beforeEach(() => {
		io = mockIntersectionObserver();
	});

	afterEach(() => {
		io.cleanup();
	});

	it('should display 3 items and indicator with (+4) items when overflowed', async () => {
		const el = await createGroup(countryMarkup());
		const visible = el.items.slice(0, 3);
		const hidden = el.items.slice(3);

		io.enterNodes(visible);
		io.leaveNodes(hidden);
		io.enterNodes(visible);
		io.leaveNodes(hidden);
		await Updates.next();

		expect(el.querySelectorAll('vwc-country')).toHaveLength(7);
		expect(el.overflowCount).toBe(4);

		expect(visible.map((it) => it.getAttribute('data-visible'))).toEqual(
			Array(visible.length).fill('true')
		);

		expect(hidden.map((it) => it.getAttribute('data-visible'))).toEqual(
			Array(hidden.length).fill('false')
		);

		const badge = el.shadowRoot?.querySelector('vwc-badge');
		expect(badge).toBeTruthy();
		expect(badge?.getAttribute('text')).toBe('+4');
	});

	it('should display all items without overflow indicator when there is enough space', async () => {
		const el = await createGroup(countryMarkup());

		io.enterAll();
		io.enterAll();
		await Updates.next();

		expect(el.querySelectorAll('vwc-country')).toHaveLength(7);
		expect(el.overflowCount).toBe(0);
		expect(el.shadowRoot?.querySelector('vwc-badge')).toBeFalsy();
		expect(el.shadowRoot?.querySelector('vwc-popup')).toBeFalsy();

		for (const it of el.items) {
			expect(it.getAttribute('data-visible')).toBe('true');
		}
	});

	it('should open and close the overflow popup and keep items visibility', async () => {
		const el = await createGroup(countryMarkup());

		const visible = el.items.slice(0, 3);
		const hidden = el.items.slice(3);
		io.enterNodes(visible);
		io.leaveNodes(hidden);
		io.enterNodes(visible);
		io.leaveNodes(hidden);
		await Updates.next();

		expect(el.overflowCount).toBe(4);

		// hover => open popup and render overflow grid
		const wrap = el.shadowRoot?.querySelector('.overflow-wrap') as HTMLElement;
		expect(wrap).toBeTruthy();
		wrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		await Updates.next();

		const popup = el.shadowRoot?.querySelector('vwc-popup') as any;
		expect(popup).toBeTruthy();

		const grid = el.shadowRoot?.querySelector('.overflow-grid') as HTMLElement;
		expect(grid).toBeTruthy();
		expect(grid.children.length).toBe(4);

		const overflowCodes = Array.from(grid.children).map((c) =>
			(c as HTMLElement).getAttribute('code')
		);
		expect(overflowCodes).toEqual(['DE', 'FR', 'ES', 'IT']);

		// unhover => close popup but keep visibility state
		wrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		await Updates.next();
		expect(el.popupOpen).toBe(false);

		const countries = Array.from(el.querySelectorAll('vwc-country'));
		expect(countries).toHaveLength(7);
		expect(
			countries.slice(0, 3).map((it) => it.getAttribute('data-visible'))
		).toEqual(Array(3).fill('true'));
		expect(
			countries.slice(3).map((it) => it.getAttribute('data-visible'))
		).toEqual(Array(4).fill('false'));

		// everything fits => overflow resolves, badge/popup/grid removed
		io.enterAll();
		io.enterAll();
		await Updates.next();

		expect(el.overflowCount).toBe(0);
		expect(el.popupOpen).toBe(false);
		expect(el.shadowRoot?.querySelector('vwc-popup')).toBeFalsy();
		expect(el.shadowRoot?.querySelector('.overflow-grid')).toBeFalsy();

		// (force ref to be missing to cover the early-return branch)
		el.overflowGridEl = undefined;
		expect(() => el.fillOverflowGrid()).not.toThrow();
	});

	it('should build an accessible group label from country names (and fall back gracefully)', async () => {
		const empty = await createGroup(`<vwc-country></vwc-country>`);

		expect(empty.items).toHaveLength(1);
		expect(empty.computedAriaLabel).toBe(
			empty.locale.countryGroup.ariaLabelPrefix
		);

		const withKnownCode = await createGroup(
			`<vwc-country code="DE"></vwc-country>`
		);

		expect(withKnownCode.items).toHaveLength(1);
		expect(withKnownCode.computedAriaLabel).toContain('Germany');

		const withUnknownCode = await createGroup(
			`<vwc-country code="ZZ"></vwc-country>`
		);
		expect(withUnknownCode.items).toHaveLength(1);
		expect(withUnknownCode.computedAriaLabel).toContain('ZZ');
	});

	describe('IntersectionObserver and lifecycle edge cases', () => {
		it('should do nothing when connectedCallback runs while not connected', async () => {
			const el = document.createElement(TAG) as CountryGroup;
			el.innerHTML = countryMarkup(['DE']);

			expect(() => (el as any).connectedCallback()).not.toThrow();
		});

		it('should treat a missing intersection ratio as not visible', async () => {
			const el = await createGroup(countryMarkup(['DE', 'FR']));

			io.triggerNodes([
				{ node: el.items[0], desc: { intersectionRatio: undefined as any } },
			]);
			io.triggerNodes([
				{ node: el.items[0], desc: { intersectionRatio: undefined as any } },
			]);
			await settle();

			expect(el.items[0].getAttribute('data-visible')).toBe('false');
		});

		it('should allow calling connectedCallback twice without re-initializing', async () => {
			const el = await createGroup(countryMarkup());
			expect(() => (el as any).connectedCallback()).not.toThrow();
			await Updates.next();
		});

		it('should skip queued connected work when disconnected immediately', async () => {
			const el = document.createElement(TAG) as CountryGroup;
			el.innerHTML = countryMarkup(['DE']);

			(el as any).connectedCallback();
			(el as any).disconnectedCallback();

			await Updates.next();
		});

		it('should default unknown items to visible until IntersectionObserver updates', async () => {
			const el = await createGroup(countryMarkup(['DE', 'FR']));
			(el as any).items = [...el.items, document.createElement('div')];

			io.enterAll();
			io.enterAll();
			await settle();

			expect((el as any).items.length).toBe(3);
		});
	});

	describe('Overflow badge visibility', () => {
		it('should keep overflow until the badge gets its own intersection entry', async () => {
			const el = await createGroup(countryMarkup(['UK', 'NO', 'US', 'DE']));
			const visible = el.items.slice(0, 3);
			const last = el.items[3];

			await setIntersections(visible, [last]);

			expect(el.overflowCount).toBe(1);
			expect(getBadge(el)).toBeTruthy();

			// Trigger another IO callback after the badge exists, but still without a badge entry.
			await setIntersections(visible, [last]);
		});

		it('should hide the badge when it is the only reason the last item overflows', async () => {
			const el = await createGroup(countryMarkup(['UK', 'NO', 'US', 'DE']));
			const visible = el.items.slice(0, 3);
			const last = el.items[3];

			await setIntersections(visible, [last]);
			await setIntersections(visible, [last]);

			expect(el.overflowCount).toBe(1);
			const badge = getBadge(el);
			expect(badge).toBeTruthy();

			// Ensure the component has a visibility entry for the badge (and it is true),
			io.enterNode(badge!);
			io.enterNode(badge!);
			await setIntersections(visible, [last]);

			expect(el.overflowCount).toBe(0);
			expect(getBadge(el)).toBeFalsy();
		});

		it('should show one fewer item when the badge cannot fully fit', async () => {
			const el = await createGroup(
				countryMarkup(['UK', 'NO', 'US', 'DE', 'FR'])
			);

			const firstThree = el.items.slice(0, 3);
			const rest = el.items.slice(3);

			await setIntersections(firstThree, rest);
			await setIntersections(firstThree, rest);

			expect(el.overflowCount).toBe(2);
			const badge = getBadge(el);
			expect(badge).toBeTruthy();
			// Ensure the component has a visibility entry for the badge (and it is false),
			io.leaveNode(badge!);
			io.leaveNode(badge!);
			await setIntersections(firstThree, rest);

			expect(el.items[0].getAttribute('data-visible')).toBe('true');
			expect(el.items[1].getAttribute('data-visible')).toBe('true');
			expect(el.items[2].getAttribute('data-visible')).toBe('false');
		});
	});
});
