import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { observable } from '@microsoft/fast-element';
import type { Country } from '../country/country';
import type { Badge } from '../badge/badge';

/**
 * @public
 * @component country-group
 * @slot default - One or more `vwc-country` elements (Country only).
 */
export class CountryGroup extends VividElement {
	@observable countryItems: Country[] = [];
	#observer!: IntersectionObserver;
	@observable overflowedCountries = new Set<Country>();
	@observable popupOpened = false;
	@observable badgeElement!: Badge;
	popupContents!: HTMLDivElement;
	slotElement!: HTMLSlotElement;
	#extraHiddenCountry: Country | undefined;

	override connectedCallback(): void {
		super.connectedCallback();
		this.#observer = new IntersectionObserver(this.handleChanges.bind(this), {
			root: this,
			threshold: [1],
		});
	}

	countryItemsChanged(_oldItems: Country[], newItems: Country[]) {
		for (const item of newItems) {
			this.#observer.observe(item);
		}
	}

	handleChanges(entries: IntersectionObserverEntry[]): void {
		if (this.#extraHiddenCountry) {
			this.#extraHiddenCountry.classList.remove('hidden');
			this.#extraHiddenCountry = undefined;
		}

		const newOverflowedCountries = new Set<Country>(this.overflowedCountries);

		for (const entry of entries) {
			const countryElement = entry.target as Country;
			if (!entry.isIntersecting) {
				countryElement.classList.add('hidden');
				newOverflowedCountries.add(countryElement);
			} else {
				countryElement.classList.remove('hidden');
				newOverflowedCountries.delete(countryElement);
			}
		}

		// Hide additional Country to fit the badge.
		if (newOverflowedCountries.size > 0) {
			const firstHiddenIndex = this.countryItems?.findIndex((item) =>
				item.classList.contains('hidden')
			);
			if (firstHiddenIndex > 0) {
				const lastVisible = this.countryItems.at(firstHiddenIndex - 1);
				if (lastVisible) {
					lastVisible.classList.add('hidden');
					newOverflowedCountries.add(lastVisible);
					this.#extraHiddenCountry = lastVisible;
				}
			}
		}

		this.overflowedCountries = newOverflowedCountries;
		this.popupContents.innerHTML = '';

		// Cloning the overflowed elements to popup is way faster than moving them around the DOM.
		for (const overflowedCountry of newOverflowedCountries) {
			const cloned = overflowedCountry.cloneNode(true) as Country;
			cloned.style.visibility = 'visible';
			this.popupContents.appendChild(cloned);
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#observer.disconnect();
	}
}
