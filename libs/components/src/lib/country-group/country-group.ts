import { observable, Updates } from '@microsoft/fast-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Localized } from '../../shared/patterns';
import { countries } from '../country/countries-data';
import type { Badge } from '../badge/badge';
import { Country } from '../country/country';

const FULLY_VISIBLE_INTERSECTION_RATIO = 0.99;

/**
 * @public
 * @component country-group
 * @slot default - One or more `vwc-country` elements (Country only).
 */
export class CountryGroup extends Localized(DelegatesAria(VividElement)) {
	/**
	 * Assigned elements from the default slot.
	 * @internal
	 */
	@observable items: Country[] = [];

	/**
	 * Number of visible items (prefix) according to IO.
	 * @internal
	 */
	@observable lastVisibleIndex = 0;

	/**
	 * Computed aria-label for the group, built from slotted countries.
	 * @internal
	 */
	@observable computedAriaLabel: string | null = null;

	/**
	 * Whether the overflow popup is open.
	 * @internal
	 */
	@observable popupOpen = false;

	slotEl!: HTMLSlotElement;
	badgeEl?: Badge;
	sentinelEl?: HTMLSpanElement;
	overflowWrapEl?: HTMLDivElement;
	overflowGridEl?: HTMLDivElement;

	get overflowCount(): number {
		return Math.max(0, this.items.length - this.lastVisibleIndex);
	}

	#observer: IntersectionObserver | null = null;
	#visibleMap = new Map<Element, boolean>();
	#fitQueued = false;
	#commitQueued = false;
	#candidateVisible = -1;
	#candidateStreak = 0;

	#countryNameForCode(code: string): string {
		if (!code) {
			return '';
		}
		return (
			countries.find((c) => c.code.toUpperCase() === code.toUpperCase())
				?.label ?? ''
		);
	}

	#applyLayout(visibleCount: number, mode: 'final' | 'fit'): void {
		for (let i = 0; i < this.items.length; i++) {
			const el = this.items[i];

			// reserve one flex "slot" for the badge right after the last visible item:
			// overflow items get +1 order so they come after the badge.
			el.style.order = `${i < visibleCount ? i : i + 1}`;

			if (i < visibleCount) {
				el.style.display = '';
				el.style.position = '';
				el.style.inset = '';
				el.style.visibility = '';
				el.style.pointerEvents = '';
				continue;
			}

			el.style.display = '';
			el.style.pointerEvents = 'none';

			if (mode === 'final') {
				// remove from layout, but keep observable (no display:none).
				el.style.position = 'absolute';
				el.style.inset = '0 auto auto 0';
				el.style.visibility = 'hidden';
			} else {
				// back into flow for IO measurement, but not visible to user.
				el.style.position = '';
				el.style.inset = '';
				el.style.visibility = 'hidden';
			}
		}
	}

	override connectedCallback(): void {
		super.connectedCallback();

		Updates.enqueue(() => {
			if (!this.$fastController.isConnected) {
				return;
			}

			this.#syncFromSlot();
			this.#updateAriaLabel();
			this.slotEl?.addEventListener('slotchange', this.#onSlotChange);
			this.#ensureObserver();
			this.#requestFit();
		});
	}

	override disconnectedCallback(): void {
		this.slotEl?.removeEventListener('slotchange', this.#onSlotChange);
		this.#observer?.disconnect();
		this.#observer = null;
		this.#visibleMap.clear();
		this.#candidateVisible = -1;
		this.#candidateStreak = 0;
		super.disconnectedCallback();
	}

	#onSlotChange = () => {
		this.#syncFromSlot();
		this.#updateAriaLabel();
		this.#requestFit();
	};

	#ensureObserver(): void {
		if (this.#observer) {
			return;
		}

		this.#observer = new IntersectionObserver(this.#handleIntersection, {
			root: this,
			threshold: [FULLY_VISIBLE_INTERSECTION_RATIO],
		});
	}

	#requestFit(): void {
		if (this.#fitQueued) {
			return;
		}
		this.#fitQueued = true;
		this.#prepareForFit();

		requestAnimationFrame(() => {
			this.#fitQueued = false;
			this.#observeAll();
		});
	}

	#observeAll(): void {
		if (!this.#observer) {
			return;
		}
		this.#observer.disconnect();
		for (const el of this.items) {
			this.#observer.observe(el);
		}
		if (this.sentinelEl) {
			this.#observer.observe(this.sentinelEl);
		}
		if (this.badgeEl) this.#observer.observe(this.badgeEl);
	}

	#syncFromSlot(): void {
		const assigned = this.slotEl.assignedElements({ flatten: true });
		this.items = assigned.filter((n): n is Country => n instanceof Country);
		// Assume visible until IO says otherwise
		this.#visibleMap.clear();
		for (const el of this.items) {
			this.#visibleMap.set(el, true);
		}
		this.lastVisibleIndex = this.items.length;
		this.#applyLayout(this.lastVisibleIndex, 'final');
	}

	#updateAriaLabel(): void {
		const prefix = this.locale.countryGroup.ariaLabelPrefix;

		const names: string[] = [];
		for (const el of this.items) {
			const label = (el.getAttribute('label') ?? '').trim();
			const code = (el.getAttribute('code') ?? '').trim();
			const fullName = this.#countryNameForCode(code);
			const value = label || fullName || code;
			if (value) {
				names.push(value);
			}
		}

		const joined = names.join(', ');
		this.computedAriaLabel = joined ? `${prefix} ${joined}` : prefix;
	}

	#handleIntersection = (entries: IntersectionObserverEntry[]) => {
		let sawSentinel = false;
		let sawNonSentinel = false;
		for (const entry of entries) {
			if (entry.target === this.sentinelEl) {
				sawSentinel = true;
				continue;
			}
			sawNonSentinel = true;
			this.#visibleMap.set(
				entry.target,
				(entry.intersectionRatio ?? 0) >= FULLY_VISIBLE_INTERSECTION_RATIO
			);
		}

		// resize => queue a re-fit to refresh item intersections.
		if (sawSentinel) {
			this.#requestFit();
			// if this callback only had the sentinel, wait for the next callback
			// with real item entries before recomputing.
			if (!sawNonSentinel) {
				return;
			}
		}

		let firstHidden = -1;
		for (let i = 0; i < this.items.length; i++) {
			if (!(this.#visibleMap.get(this.items[i]) ?? true)) {
				firstHidden = i;
				break;
			}
		}
		let nextVisible = firstHidden === -1 ? this.items.length : firstHidden;

		// edge case: the badge can cause its own overflow.
		// if the *only* hidden item is the last one, and the badge itself is fully
		// visible, then removing the badge should allow the last item to fit.
		if (
			firstHidden === this.items.length - 1 &&
			this.badgeEl &&
			(this.#visibleMap.get(this.badgeEl) ?? false)
		) {
			nextVisible = this.items.length;
		}

		// if there is overflow, ensure the badge itself fits. If it doesn't, show one
		// fewer item so the badge can sit on the last visible line instead of wrapping.
		if (
			nextVisible < this.items.length &&
			this.badgeEl &&
			this.#visibleMap.has(this.badgeEl) &&
			this.#visibleMap.get(this.badgeEl) === false
		) {
			nextVisible = Math.max(1, nextVisible - 1);
		}
		this.#proposeVisibleCount(nextVisible);
	};

	#proposeVisibleCount(nextVisible: number): void {
		// require the same value twice in a row to avoid threshold flapping.
		if (this.#candidateVisible === nextVisible) {
			this.#candidateStreak++;
		} else {
			this.#candidateVisible = nextVisible;
			this.#candidateStreak = 1;
		}

		if (this.#candidateStreak < 2) {
			return;
		}

		if (this.lastVisibleIndex === nextVisible) {
			return;
		}

		if (this.#commitQueued) {
			return;
		}
		this.#commitQueued = true;

		requestAnimationFrame(() => {
			this.#commitQueued = false;
			this.lastVisibleIndex = this.#candidateVisible;
			this.#applyLayout(this.lastVisibleIndex, 'final');

			if (this.overflowCount === 0) {
				this.popupOpen = false;
			}
			Updates.enqueue(() => this.fillOverflowGrid());
		});
	}

	#prepareForFit(): void {
		this.#applyLayout(this.lastVisibleIndex, 'fit');
	}

	/**
	 * @internal
	 */
	handleMouseEnter(): void {
		if (this.overflowCount === 0) {
			return;
		}
		this.popupOpen = true;
	}

	/**
	 * @internal
	 */
	handleMouseLeave(): void {
		this.popupOpen = false;
	}

	/**
	 * @internal
	 */
	popupOpenChanged(oldValue: boolean | undefined): void {
		if (oldValue === undefined) {
			return;
		}
		if (this.popupOpen) {
			Updates.enqueue(() => this.fillOverflowGrid());
		}
	}

	/**
	 * @internal
	 */
	fillOverflowGrid(): void {
		if (!this.overflowGridEl) {
			return;
		}
		if (this.overflowCount === 0) {
			return;
		}

		this.overflowGridEl.replaceChildren();
		const overflowed = this.items.slice(this.lastVisibleIndex);
		for (const it of overflowed) {
			const clone = it.cloneNode(true) as HTMLElement;
			clone.setAttribute('aria-hidden', 'true');
			clone.removeAttribute('style');
			this.overflowGridEl.appendChild(clone);
		}
	}
}
