import { attr } from '@microsoft/fast-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component table-sorting-button
 * @slot - Default slot.
 * @event {CustomEvent<undefined>} sort - Emitted when sorting button is clicked.
 */
export class TableSortingButton extends DelegatesAria(VividElement) {
	/**
	 * Current direction of the sorting
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: direction
	 */
	@attr direction?: null | 'none' | 'asc' | 'desc';

	get #nextDirection() {
		if (!this.direction || this.direction === 'none') {
			return 'asc';
		} else if (this.direction === 'asc') {
			return 'desc';
		} else {
			return 'none';
		}
	}

	toggleSort() {
		const prevented = !this.$emit('sort', this.#nextDirection);
		if (prevented) return;
		this.direction = this.#nextDirection;
		this.dispatchEvent(
			new CustomEvent('sort', {
				detail: this.direction,
				bubbles: true,
				composed: true,
			})
		);
	}
}
