import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { HostSemantics } from '../../shared/aria/host-semantics';

/**
 * @public
 * @component table-header-cell
 * @slot - Default slot.
 * @event {CustomEvent<HTMLElement>} cell-focused - Fires when the cell or its contents receive focus
 */
export class TableHeaderCell extends HostSemantics(VividElement) {}
