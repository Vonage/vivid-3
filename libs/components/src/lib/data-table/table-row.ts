import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-row
 * @slot - Default slot.
 */
export class TableRow extends HostSemantics(VividElement) {
	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();
	}
}

