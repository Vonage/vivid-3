import {applyMixins, FoundationElement} from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import {Connotation} from '../enums';
import {AffixIcon} from '../../shared/patterns/affix';

export type BannerConnotation =
	Connotation.Information |
	Connotation.Announcement |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;

const connotationIconMap = new Map([
	[Connotation.Information, 'info-solid'],
	[Connotation.Announcement, 'megaphone-solid'],
	[Connotation.Success, 'check-circle-solid'],
	[Connotation.Warning, 'warning-solid'],
	[Connotation.Alert, 'error-solid']
]);

const defaultConnotation =
	(connotation: Connotation | undefined = Connotation.Information) => connotationIconMap.get(connotation) as Connotation;

/**
 * Base class for banner
 *
 * @public
 * @slot action-items - Add action items to banner using this slot.
 */
export class Banner extends FoundationElement {
	@attr({attribute: 'action-href'}) actionHref: string | undefined;
	@attr({attribute: 'action-text'}) actionText: string | undefined;
	@attr({mode: 'boolean'}) removable = false;
	@attr({attribute: 'aria-live'}) override ariaLive: any;
	@attr() role: string | undefined;
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
}

applyMixins(Banner, AffixIcon);

export interface Banner extends AffixIcon {
}
