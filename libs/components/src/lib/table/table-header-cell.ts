import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-header-cell
 * @slot - Default slot.
 * @event {CustomEvent<HTMLElement>} cell-focused - Fires when the cell or its contents receive focus
 */
export class TableHeaderCell extends HostSemantics(VividElement) {
	override connectedCallback() {
		super.connectedCallback();
		super.addEventListener(
			'table-sorting-direction-change',
			this.#slottableRequestHandler
		);
	}

	#slottableRequestHandler(event: CustomEvent) {
		const direction = event.detail;

		if (direction === 'asc') {
			this.setAttribute('aria-sort', 'ascending');
		} else if (direction === 'desc') {
			this.setAttribute('aria-sort', 'descending');
		} else if (direction === 'none') {
			this.setAttribute('aria-sort', 'none');
		} else {
			this.removeAttribute('aria-sort');
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener(
			'table-sorting-direction-change',
			this.#slottableRequestHandler
		);
	}
}
