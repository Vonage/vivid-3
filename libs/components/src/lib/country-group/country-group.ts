import { observable, Updates, volatile } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import type { Country } from '../country/country';

/**
 * @public
 * @component country-group
 * @slot default - One or more `vwc-country` elements (Country only).
 */
export class CountryGroup extends VividElement {
	/**
	 * @internal
	 */
	@observable countryItems: Country[] = [];

	/**
	 * @internal
	 */
	countryItemsChanged(): void {
		this.visibleCount = null;

		queueMicrotask(() => {
			this.#syncChildAccessibility();
			this.#updateGroupAriaLabel();
		});
		this.#requestFit();
	}

	/**
	 * @internal
	 */
	@observable visibleCount: number | null = null;

	/**
	 * @internal
	 */
	@volatile
	get overflowCount(): number {
		if (!this.countryItems.length) {
			return 0;
		}
		const visible = this.visibleCount ?? this.countryItems.length;
		return Math.max(0, this.countryItems.length - visible);
	}

	/**
	 * @internal
	 */
	@observable popupOpen = false;

	/**
	 * @internal
	 */
	popupOpenChanged(oldValue?: boolean): void {
		if (oldValue === undefined) {
			return;
		}
		if (this.popupOpen) {
			document.addEventListener('keydown', this.#closePopupOnEscape);
		} else {
			document.removeEventListener('keydown', this.#closePopupOnEscape);
		}
	}

	rowEl!: HTMLElement;
	overflowWrapEl!: HTMLElement;
	overflowGridEl!: HTMLDivElement;
	badgeEl?: HTMLElement;

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'group');

		Updates.enqueue(() => {
			this.#ensureIntersectionObserver();
			this.#syncIntersectionTargets();
			this.#requestFit();
		});
	}

	override disconnectedCallback(): void {
		this.#intersectionObserver?.disconnect();
		document.removeEventListener('keydown', this.#closePopupOnEscape);
		super.disconnectedCallback();
	}

	#intersectionObserver: IntersectionObserver | null = null;
	#intersectionState = new Map<Element, boolean>();
	#fitQueued = false;
	#ensureIntersectionObserver(): void {
		if (this.#intersectionObserver) {
			return;
		}
		if (typeof IntersectionObserver === 'undefined') {
			return;
		}
		this.#intersectionObserver = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					const fullyVisible =
						e.isIntersecting && (e.intersectionRatio ?? 0) >= 0.99;
					this.#intersectionState.set(e.target, fullyVisible);
				}
				this.#recomputeVisibleCountFromIntersection();
			},
			{
				root: this.rowEl,
				threshold: [0.99],
			}
		);
	}

	#syncIntersectionTargets(): void {
		if (!this.#intersectionObserver) {
			return;
		}
		this.#intersectionObserver.disconnect();
		this.#intersectionState.clear();

		for (const item of this.countryItems) {
			this.#intersectionObserver.observe(item);
		}
		if (this.badgeEl) {
			this.#intersectionObserver.observe(this.badgeEl);
		}
	}

	#requestFit(): void {
		if (this.#fitQueued) {
			return;
		}
		this.#fitQueued = true;
		requestAnimationFrame(() => {
			this.#fitQueued = false;

			this.#ensureIntersectionObserver();
			this.#syncIntersectionTargets();

			// Fallback: if IO isn't available, we don't attempt layout calculations.
			// It shows all items (no overflow badge behavior).
			if (!this.#intersectionObserver) {
				this.visibleCount = this.countryItems.length;
				this.#applyVisibility(this.countryItems.length);
				this.#queueFillOverflowGrid();
				return;
			}

			this.visibleCount = this.countryItems.length;
			this.#applyVisibility(this.countryItems.length);
			this.#queueFillOverflowGrid();
			Updates.enqueue(() => {
				this.#syncIntersectionTargets();
			});
		});
	}

	#syncChildAccessibility(): void {
		for (const el of this.countryItems) {
			el.setAttribute('aria-hidden', 'true');
		}
	}

	#updateGroupAriaLabel(): void {
		const parts = this.countryItems.map((el) => this.#countryLabel(el));
		this.setAttribute('aria-label', parts.filter(Boolean).join(', '));
	}

	#countryLabel(el: Country): string {
		const label = el.label?.trim();
		const code = el.code?.trim();
		if (label) {
			return label;
		}
		if (code) {
			return code.toUpperCase();
		}
		return '';
	}

	#queueFillOverflowGrid(): void {
		Updates.enqueue(() => {
			requestAnimationFrame(() => this.fillOverflowGrid());
		});
	}

	#recomputeVisibleCountFromIntersection(): void {
		const items = this.countryItems;
		if (!items.length) {
			this.visibleCount = 0;
			return;
		}

		// Determine the first item that is not fully visible.
		let firstHidden = -1;
		for (let i = 0; i < items.length; i++) {
			if (!(this.#intersectionState.get(items[i]) ?? false)) {
				firstHidden = i;
				break;
			}
		}

		// Everything is visible: show all, no badge.
		if (firstHidden === -1) {
			if (this.visibleCount !== items.length) {
				this.visibleCount = items.length;
				this.#applyVisibility(items.length);
				this.#queueFillOverflowGrid();
				Updates.enqueue(() => this.#syncIntersectionTargets());
			}
			return;
		}

		let nextVisible = Math.max(1, firstHidden);

		//  if the badge is present but not fully visible, hide one more.
		if (this.badgeEl) {
			const badgeOk = this.#intersectionState.get(this.badgeEl) ?? false;
			if (!badgeOk) {
				nextVisible = Math.max(1, nextVisible - 1);
			}
		}

		if (this.visibleCount !== nextVisible) {
			this.visibleCount = nextVisible;
			this.#applyVisibility(nextVisible);
			this.#queueFillOverflowGrid();
			Updates.enqueue(() => this.#syncIntersectionTargets());
		}
	}

	#applyVisibility(visible: number): void {
		const items = this.countryItems;
		for (let i = 0; i < items.length; i++) {
			items[i].style.display = i < visible ? '' : 'none';
		}
	}

	/**
	 * @internal
	 */
	fillOverflowGrid(): void {
		const items = this.countryItems;
		const grid = this.overflowGridEl;
		const visible = this.visibleCount ?? items.length;
		if (!grid || visible >= items.length) {
			return;
		}
		grid.replaceChildren();
		for (let i = visible; i < items.length; i++) {
			const c = items[i].cloneNode(true) as HTMLElement;

			c.style.display = '';
			c.setAttribute('aria-hidden', 'true');
			grid.appendChild(c);
		}
	}

	/**
	 * @internal
	 */
	handleMouseEnter(): void {
		if (this.overflowCount > 0) {
			this.popupOpen = true;
		}
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
	popupKeydown(e: Event): void {
		if (
			this.popupOpen &&
			handleEscapeKeyAndStopPropogation(e as KeyboardEvent)
		) {
			this.popupOpen = false;
		}
	}

	#closePopupOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.popupOpen = false;
		}
	};
}
