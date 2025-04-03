import { attr } from '@microsoft/fast-element';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { VividFoundationButton } from '../../shared/foundation/button';
import type { Connotation, Size } from '../enums.js';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of fab connotation.
 *
 * @public
 */
export type FabConnotation = ExtractFromEnum<
	Connotation,
	Connotation.CTA | Connotation.Accent | Connotation.Announcement
>;

/**
 * Types of FAB size.
 *
 * @public
 */
export type FABSize = ExtractFromEnum<
	Size,
	Size.Condensed | Size.Normal | Size.Expanded
>;

/**
 * @public
 * @component fab
 * @slot icon - Slot to add an icon to fab.
 */
export class Fab extends VividFoundationButton {
	/**
	 * The connotation the fab should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: FabConnotation;

	/**
	 * The size the FAB should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: FABSize;

	/**
	 * Indicates the fab's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}

export interface Fab extends AffixIconWithTrailing {}
applyMixins(Fab, AffixIconWithTrailing);
