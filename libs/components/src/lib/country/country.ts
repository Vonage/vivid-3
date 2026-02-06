import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { getFlagIconName } from './country-code-to-flag-icon';

/**
 * @public
 * @component country
 * @slot icon - Optional custom flag or graphic. When `code` is set and no content is slotted, a default flag icon (Vivid/Vonage icon set) is shown.
 */
export class Country extends VividElement {
	/**
	 * ISO 3166-1 alpha-2 country code (e.g. "GB", "UK", "US"). When set, the component shows the matching flag icon and the code (e.g. "UK") automatically.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: code
	 */
	@attr code?: string;

	/**
	 * Optional label to override the displayed text. When set, this is shown instead of the country code (e.g. for obscure countries where "Saint Helena" is clearer than "SH").
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/** @internal */
	get flagIconName(): string | undefined {
		return getFlagIconName(this.code);
	}

	/** @internal */
	get displayText(): string | undefined {
		const customLabel = this.label?.trim();
		if (customLabel) {
			return customLabel;
		}
		const codeValue = this.code?.trim();
		return codeValue ? codeValue.toUpperCase() : undefined;
	}
}
