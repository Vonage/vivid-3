//import { rovingIndex } from 'roving-ux';      // npm es6/common modules
import { FoundationElement } from '@microsoft/fast-foundation';



import {attr} from '@microsoft/fast-element';
import type {
	Appearance, Shape,
} from '../enums.js';


/**
 * Types of button appearance.
 *
 * @public
 */
export type ActionGroupAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

/**
 * Types of button shape.
 *
 * @public
 */
type ActionGroupShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for action-group
 *
 * @public
 */
export class ActionGroup extends FoundationElement {
	/**
	 * The shape the ActionGroup should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: ActionGroupShape;

	/**
	 * The appearance the ActionGroup should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ActionGroupAppearance;

}


