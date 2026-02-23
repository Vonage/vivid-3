import { eventFocusIn } from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-header-cell
 * @slot - Default slot.
 * @event {CustomEvent<TableHeaderCell>} cell-focused - Fires when the cell or its contents receive focus
 */
export class TableHeaderCell extends HostSemantics(VividElement) {
	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener(eventFocusIn, this.handleFocusIn as EventListener);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener(eventFocusIn, this.handleFocusIn as EventListener);
	}

	private handleFocusIn = (): void => {
		this.$emit('cell-focused', this);
	};
}
