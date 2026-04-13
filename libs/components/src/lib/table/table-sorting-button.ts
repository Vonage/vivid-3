import { attr } from '@microsoft/fast-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component table-sorting-button
 * @slot - Default slot.
 */
export class TableSortingButton extends DelegatesAria(VividElement) {
	/**
	 * The connotation the tab should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr direction?: null | 'none' | 'asc' | 'desc';

	directionChanged() {
		this.dispatchEvent(
			new CustomEvent('table-sorting-direction-change', {
				detail: this.direction,
				bubbles: true,
				composed: true,
			})
		);
	}

	#nextDirection(current: undefined | null | 'none' | 'asc' | 'desc') {
		if (!current || current === 'none') {
			return 'asc';
		} else if (current === 'asc') {
			return 'desc';
		} else {
			return 'none';
		}
	}

	toggleSort() {
		const newDirection = this.#nextDirection(this.direction);
		const prevented = !this.$emit('sort', newDirection);
		if (prevented) return;
		this.direction = newDirection;
	}
}
