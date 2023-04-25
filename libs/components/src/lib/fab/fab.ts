import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type { Connotation, Size } from '../enums.js';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Types of fab connotation.
 *
 * @public
 */
export type FabConnotation = Extract<Connotation, Connotation.CTA | Connotation.Accent>;

/**
 * Types of FAB size.
 *
 * @public
 */
export type FABSize = Extract<Size, Size.Normal | Size.Expanded>;

/**
 * Base class for fab
 *
 * @public
 */
export class Fab extends FoundationButton {
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

export interface Fab extends AffixIconWithTrailing { }
applyMixins(Fab, AffixIconWithTrailing);
