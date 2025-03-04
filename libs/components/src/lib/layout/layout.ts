import { attr } from '@microsoft/fast-element';
import type { LayoutSize } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

export enum AUTO_SIZING {
	Fit = 'fit',
	Fill = 'fill',
}
export type Gutters = Extract<
	LayoutSize,
	LayoutSize.Small | LayoutSize.Medium | LayoutSize.Large
>;
export type ColumnSpacing = Extract<
	LayoutSize,
	LayoutSize.Small | LayoutSize.Medium | LayoutSize.Large
>;
export type RowSpacing = Extract<
	LayoutSize,
	LayoutSize.Small | LayoutSize.Medium | LayoutSize.Large
>;
export type ColumnBasis =
	| Extract<LayoutSize, LayoutSize.Small | LayoutSize.Medium | LayoutSize.Large>
	| 'block';

/**
 * [--layout-grid-template-columns=repeat([the `auto-sizing` mapped value],
 * minmax([the `column-basis` mapped value], 1fr))] - Controls the `grid-template-columns` of the layout.
 *
 * @public
 * @component layout
 * @slot - Default slot.
 */
export class Layout extends VividElement {
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
	 * sets the initial preferred spacing of a row from predefined available options
	 *
	 * @public
	 */
	@attr({ attribute: 'row-spacing' }) rowSpacing?: RowSpacing;

	/**
	 * sets the initial preferred auto-sizing from predefined available options
	 *
	 * @public
	 */
	@attr({ attribute: 'auto-sizing' }) autoSizing?: AUTO_SIZING;
}
