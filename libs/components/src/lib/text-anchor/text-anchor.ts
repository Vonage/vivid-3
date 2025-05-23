import { attr, ViewTemplate } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { Appearance, Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns/affix';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { Anchor } from '../../shared/foundation/anchor/anchor';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of text anchor connotation.
 *
 * @public
 */
export type TextAnchorConnotation = ExtractFromEnum<
	Connotation,
	Connotation.Accent | Connotation.CTA
>;

/**
 * Types of text-anchor appearance.
 *
 * @public
 */
export type TextAnchorAppearance = ExtractFromEnum<
	Appearance,
	Appearance.Ghost | Appearance.GhostLight
>;

/**
 * @component text-anchor
 * @slot icon - The preferred way to add an icon to the component.
 */
export class TextAnchor extends AffixIcon(DelegatesAria(VividElement)) {
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

export interface TextAnchor extends Anchor {}
applyMixins(TextAnchor, Anchor);
