import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Popup } from '../popup/popup';

/**
 * Base class for toggletip
 *
 * @public
 */
export class Toggletip extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;

	override connectedCallback() {
		super.connectedCallback();

		const button = this.shadowRoot?.querySelector('#_ttanchor_');
		const toggletip = this.shadowRoot?.querySelector('#_toggletip_') as Popup;

		toggletip.anchorEl = button;
		toggletip.anchorEl?.addEventListener('keydown', toggletip.handleKeydown);

		// light dismiss
		document.addEventListener('click', (e) => {
			if (toggletip.open && !this.contains(e.target as HTMLElement)) {
				toggletip.open = false;
			}
		});

		button?.addEventListener('click', () => toggletip.open = true);
	}

}
