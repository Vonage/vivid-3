import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { InlineSize } from '../enums.js';


export enum AUTO_SIZING { Fit = 'fit', Fill = 'fill' }
type Gutters = Extract<InlineSize, InlineSize.Small | InlineSize.Medium | InlineSize.Large>;
type ColumnSpacing = Extract<InlineSize, InlineSize.Small | InlineSize.Medium | InlineSize.Large>;
type ColumnBasis = Extract<InlineSize, InlineSize.Small | InlineSize.Medium | InlineSize.Large> | 'block';

/**
 * Base class for layout
 *
 * @cssprop [--layout-grid-template-columns=repeat([the `auto-sizing` mapped value],
 * minmax([the `column-basis` mapped value], 1fr))] - Controls the `grid-template-columns` of the layout.
 * @public
 */
export class Layout extends FoundationElement {
	/**
	 * sets the initial preferred margin from predefined available options
	 *
	 * @public
	 */
	@attr gutters?: Gutters;

	/**
	 * sets the initial preferred measure of a column from predefined available options
	 *
	 * @public
	 */
	@attr({ attribute: 'column-basis' }) columnBasis?: ColumnBasis;

	/**
	 * sets the initial preferred spacing of a column from predefined available options
	 *
	 * @public
	 */
	@attr({ attribute: 'column-spacing' }) columnSpacing?: ColumnSpacing;

	/**
	 * sets the initial preferred auto-sizing from predefined available options
	 *
	 * @public
	 */
	@attr({ attribute: 'auto-sizing' }) autoSizing?: AUTO_SIZING;
}
