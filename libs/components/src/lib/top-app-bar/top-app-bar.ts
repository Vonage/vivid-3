import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';


import type {
  Density,
} from '../enums.js';
/**
 * Types of top-app-bar density.
 *
 * @public
 */
type TopAppBarDensity = Extract<Density, Density.Condensed | Density.Normal>;
/**
 * Base class for top-app-bar
 *
 * @public
 */
export class TopAppBar extends FoundationElement {
  /**
   * sets the top-app-bar to be fixed
   *
   * @public
   */
  @attr({
    mode: 'boolean',
  }) fixed = false;

	/**
	 * The size the top-app-bar's should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
   @attr density?: TopAppBarDensity;
}