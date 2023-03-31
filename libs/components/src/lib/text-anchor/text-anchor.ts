import { Anchor, applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for text-anchor
 *
 * @public
 * @slot - Default slot.
 */
export class TextAnchor extends Anchor {
	/**
	 * Indicates the text anchor's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}

export interface TextAnchor extends AffixIcon {}
applyMixins(TextAnchor, AffixIcon);
