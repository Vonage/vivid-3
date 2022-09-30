import { applyMixins, Button as FoundationButton } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

import type { Connotation, Density } from '../enums.js';
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
type FABDensity = Extract<Density, Density.Normal | Density.Extended>;

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
	@attr density?: FABDensity;

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
