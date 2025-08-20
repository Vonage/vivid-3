import type { Placement } from '@floating-ui/dom';
import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @component contextual-help
 * @slot - Default slot.
 */
export class ContextualHelp extends VividElement {
	/**
	 * Placement of the toggletip
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'right';
}
