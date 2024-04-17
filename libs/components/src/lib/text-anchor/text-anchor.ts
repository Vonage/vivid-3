import { Anchor, applyMixins } from '@microsoft/fast-foundation';
import { attr, ViewTemplate } from '@microsoft/fast-element';
import { Appearance, Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Types of text anchor connotation.
 *
 * @public
 */
export type TextAnchorConnotation = Extract<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of text-anchor appearance.
 *
 * @public
 */
export type TextAnchorAppearance = Extract<
	Appearance,
	Appearance.Ghost | Appearance.GhostLight
>;

/**
 * @component text-anchor
 * @slot icon - Add an icon to the component.
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
	 * The connotation Text-Anchor should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TextAnchorConnotation;

	/**
	 * The appearance Text-Anchor should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: TextAnchorAppearance;

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
