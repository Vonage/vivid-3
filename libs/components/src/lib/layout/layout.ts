import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { Size } from '../../../types/enums.js';


enum AutoSizing { Fit = 'fit', Fill = 'fill' }
type Gutters = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge>;
type ColumnSpacing = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge>;
type ColumnBasis = Extract<Size, Size.BaseSmall | Size.Base | Size.BaseLarge> | 'block';

/**
 * Base class for layout
 *
 * @cssprop [layout-grid-template-columns=repeat([the `auto-sizing` mapped value],
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
	@attr({ attribute: 'auto-sizing' }) autoSizing?: AutoSizing;
}
