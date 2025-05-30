import { attr, observable } from '@microsoft/fast-element';
import { Connotation } from '../enums';
import { AffixIcon, Localized } from '../../shared/patterns';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

export type BannerConnotation =
	| Connotation.Information
	| Connotation.Announcement
	| Connotation.Success
	| Connotation.Warning
	| Connotation.Alert;

const connotationIconMap = new Map([
	[Connotation.Information, 'info-solid'],
	[Connotation.Announcement, 'megaphone-solid'],
	[Connotation.Success, 'check-circle-solid'],
	[Connotation.Warning, 'warning-solid'],
	[Connotation.Alert, 'error-solid'],
]);

const defaultConnotation = (
	connotation: Connotation | undefined = Connotation.Information
) => connotationIconMap.get(connotation) as Connotation;

/**
 * @public
 * @component banner
 * @slot action-items - Add action items to banner using this slot.
 * @slot icon - The preferred way to add an icon to the component.
 */
export class Banner extends AffixIcon(Localized(DelegatesAria(VividElement))) {
	@attr({ attribute: 'dismiss-aria-label' }) dismissButtonAriaLabel:
		| string
		| null = null;
	@attr({ attribute: 'action-href' }) actionHref: string | undefined;
	@attr({ attribute: 'action-text' }) actionText: string | undefined;
	@attr({ mode: 'boolean' }) removable = false;
	@attr() text: string | undefined;
	@attr() connotation: BannerConnotation | undefined;

	get conditionedIcon() {
		return this.icon ?? defaultConnotation(this.connotation);
	}

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('keydown', this.#closeOnKeyDown);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this.#closeOnKeyDown);
	}

	override remove(): void {
		this.$emit('removing');
		const banner = this.shadowRoot && this.shadowRoot.querySelector('.control');
		if (banner) {
			banner.classList.add('removing');
			banner.addEventListener('transitionend', this.#handleRemoveEnd);
		}
	}

	#handleRemoveEnd = () => {
		this.$emit('removed');
		this.parentElement && this.parentElement.removeChild(this);
	};

	#closeOnKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Escape' || !this.removable) {
			return;
		}
		this.remove();
	};

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */

	@observable actionItemsSlottedContent?: HTMLElement[];
}
