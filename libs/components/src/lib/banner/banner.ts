import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for banner
 *
 * @public
 */
export class Banner extends FoundationElement {
	@attr({mode: 'boolean'}) open = false;
	@attr({attribute: 'aria-live'}) override ariaLive: any;
	@attr() role: string | undefined;
	@attr() message: string | undefined;

	override attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'open') {
			this.$emit('vwc-banner:opening');
		}
	}

	override connectedCallback() {
		super.connectedCallback();
		this.shadowRoot?.querySelector('.banner')?.addEventListener('animationend', () => {
			this.$emit('vwc-banner:opened');
		});
	}
}
