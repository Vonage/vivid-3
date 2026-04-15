import {
	attr,
	nullableNumberConverter,
	observable,
	Updates,
	volatile,
} from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import type { Country } from '../country/country';

const GAP_PX = 8;
const BADGE_PLACEHOLDER_PX = 40;

/**
 * @public
 * @component country-group
 * @slot default - One or more `vwc-country` elements (Country only).
 */
export class CountryGroup extends VividElement {
	/**
	 * Maximum number of layout rows to show before overflowing into the hover popover.
	 * When unset, defaults to 1 row.
	 *
	 * @public
	 * @remarks HTML Attribute: max-rows
	 */
	@attr({ attribute: 'max-rows', converter: nullableNumberConverter })
	maxRows: number | null = null;

	/**
	 * @internal
	 */
	@observable countryItems: Country[] = [];

	countryItemsChanged(): void {
		this.visibleCount = null;
		// Slotted updates can run while the browser is still finishing
		// `document.createElement()`. Host/child attribute writes must not run in that
		// phase (NotSupportedError: "The result must not have attributes").
		queueMicrotask(() => {
			this.#syncChildAccessibility();
			this.#updateGroupAriaLabel();
		});
		this.#scheduleMeasure();
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

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'group');
		this.setAttribute('tabindex', '0');
		Updates.enqueue(() => {
			this.#resizeObserver.observe(this);
			if (this.rowEl) {
				this.#resizeObserver.observe(this.rowEl);
			}
			this.#scheduleMeasure();
		});
	}

	override disconnectedCallback(): void {
		this.#resizeObserver.disconnect();
		document.removeEventListener('keydown', this.#closePopupOnEscape);
		super.disconnectedCallback();
	}

	#resizeObserver = new ResizeObserver(() => this.#scheduleMeasure());

	#measureQueued = false;
	#scheduleMeasure(): void {
		if (this.#measureQueued) {
			return;
		}
		this.#measureQueued = true;
		requestAnimationFrame(() => {
			this.#measureQueued = false;
			this.#measure();
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

	#effectiveMaxRows(): number {
		return this.maxRows ?? 1;
	}

	#measure(): void {
		const items = this.countryItems;
		if (!this.rowEl) {
			return;
		}
		if (!items.length) {
			this.visibleCount = 0;
			return;
		}

		const rowWidth = this.rowEl.clientWidth;
		if (rowWidth <= 0) {
			this.visibleCount = items.length;
			this.#applyVisibility(items.length);
			this.#queueFillOverflowGrid();
			return;
		}

		let lo = 0;
		let hi = items.length;
		let best = 0;
		while (lo <= hi) {
			const mid = Math.floor((lo + hi) / 2);
			if (this.#layoutFits(mid)) {
				best = mid;
				lo = mid + 1;
			} else {
				hi = mid - 1;
			}
		}

		if (best === 0) {
			best = 1;
		}

		this.visibleCount = best;
		this.#applyVisibility(best);
		this.#queueFillOverflowGrid();
	}

	#queueFillOverflowGrid(): void {
		Updates.enqueue(() => {
			requestAnimationFrame(() => this.#fillOverflowGrid());
		});
	}

	#layoutFits(k: number): boolean {
		const items = this.countryItems;
		const maxRows = this.#effectiveMaxRows();

		if (k <= 0) {
			return false;
		}
		if (k > items.length) {
			return false;
		}

		for (let i = 0; i < items.length; i++) {
			items[i].style.display = i < k ? '' : 'none';
		}
		void this.rowEl.offsetHeight;

		const rowTops = new Set<number>();
		for (let i = 0; i < k; i++) {
			rowTops.add(Math.round(items[i].offsetTop));
		}
		if (rowTops.size > maxRows) {
			return false;
		}

		const needBadge = k < items.length;
		if (!needBadge) {
			return true;
		}

		const rowWidth = this.rowEl.clientWidth;
		const badgeReserve = BADGE_PLACEHOLDER_PX + GAP_PX;
		const lastTop = items[k - 1].offsetTop;
		let sum = 0;
		let count = 0;
		for (let i = 0; i < k; i++) {
			if (Math.abs(items[i].offsetTop - lastTop) <= 1) {
				sum += items[i].offsetWidth;
				count++;
			}
		}
		const rowGaps = count > 1 ? (count - 1) * GAP_PX : 0;
		return sum + rowGaps + badgeReserve <= rowWidth + 0.5;
	}

	#applyVisibility(visible: number): void {
		const items = this.countryItems;
		for (let i = 0; i < items.length; i++) {
			items[i].style.display = i < visible ? '' : 'none';
		}
	}

	#fillOverflowGrid(): void {
		const items = this.countryItems;
		const grid = this.overflowGridEl;
		const visible = this.visibleCount ?? items.length;
		if (!grid || visible >= items.length) {
			return;
		}
		grid.replaceChildren();
		for (let i = visible; i < items.length; i++) {
			const c = items[i].cloneNode(true) as HTMLElement;
			// Clones copy inline `display: none` from #applyVisibility; reset so the
			// popover grid can show them.
			c.style.display = '';
			c.setAttribute('aria-hidden', 'true');
			grid.appendChild(c);
		}
	}

	handleMouseEnter(): void {
		if (this.overflowCount > 0) {
			this.popupOpen = true;
		}
	}

	handleMouseLeave(): void {
		this.popupOpen = false;
	}

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
