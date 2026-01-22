import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-header-cell
 * @slot - Default slot.
 */
export class TableHeaderCell extends HostSemantics(VividElement) {
	/**
	 * @internal
	 */
	override connectedCallback(): void {
		super.connectedCallback();
	}
}
