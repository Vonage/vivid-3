import { DataGridCell as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGridCell extends FoundationElement {

	@attr({attribute: 'aria-selected', mode: 'fromView'}) override ariaSelected: string | null = null;
	@attr({mode: 'boolean'}) selected: boolean = false;

	ariaSelectedChanged(_: string | null, selectedState: string | null) {
		this.shadowRoot!.querySelector('.base')?.classList.toggle('selected', selectedState === 'true');
	}

	override handleFocusin(e: FocusEvent) {
		super.handleFocusin(e);
		this.shadowRoot!.querySelector('.base')!.classList.add('active');
	}

	override handleFocusout(e: FocusEvent) {
		super.handleFocusout(e);
		this.shadowRoot!.querySelector('.base')!.classList.remove('active');
	}
}
