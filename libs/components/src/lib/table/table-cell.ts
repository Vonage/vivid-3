import { eventFocusIn } from '@microsoft/fast-web-utilities';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-cell
 * @slot - Default slot.
 * @event {CustomEvent<HTMLElement>} cell-focused - Fires when the cell or its contents receive focus
 */
export class TableCell extends HostSemantics(VividElement) {
	private handleFocusIn = (): void => {
		this.$emit('cell-focused', this);
	};

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener(eventFocusIn, this.handleFocusIn);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener(eventFocusIn, this.handleFocusIn);
	}
}
