import { DataGridCell as FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for data-grid
 *
 * @public
 */
export class DataGridCell extends FoundationElement {

	override handleFocusin(e: FocusEvent) {
		super.handleFocusin(e);
		this.shadowRoot!.getElementById('focus-wrapper')!.classList.add('active');
	}

	override handleFocusout(e: FocusEvent) {
		super.handleFocusout(e);
		this.shadowRoot!.getElementById('focus-wrapper')!.classList.remove('active');
	}
}
