import { Anchor, applyMixins } from '@microsoft/fast-foundation';
import { attr, ViewTemplate } from '@microsoft/fast-element';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for text-anchor
 *
 * @public
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

	/**
	 * Allows subclasses to provide a body template that will be rendered inside the anchor.
	 * @internal
	 */
	getBodyTemplate(): ViewTemplate | undefined {
		return undefined;
	}
}

export interface TextAnchor extends AffixIcon {}
applyMixins(TextAnchor, AffixIcon);
