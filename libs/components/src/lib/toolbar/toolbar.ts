//import { rovingIndex } from 'roving-ux';      // npm es6/common modules
import { FoundationElement } from '@microsoft/fast-foundation';



import {attr} from '@microsoft/fast-element';
import type {
	Appearance, Connotation, Shape,
} from '../enums.js';


/**
 * Types of toolbar connotation.
 *
 * @public
 */
type ToolbarConnotation = Extract<Connotation,
| Connotation.Primary
| Connotation.CTA>;

/**
 * Types of button appearance.
 *
 * @public
 */
export type ToolbarAppearance = Extract<Appearance,
Appearance.Filled | Appearance.Outlined | Appearance.Ghost>;

/**
 * Types of button shape.
 *
 * @public
 */
type ToolbarShape = Extract<Shape, Shape.Rounded | Shape.Pill>;

/**
 * Base class for toolbar
 *
 * @public
 */
export class Toolbar extends FoundationElement {
	handleContentChange() {
	// 	rovingIndex({
	// 		element: node,     // required: the container to get roving index ux
	// 		target: '#foo',    // optional: a query selector for which children should be focusable
	// 	});
		// eslint-disable-next-line no-mixed-spaces-and-tabs
	 }
	/**
	 * The connotation the Toolbar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: ToolbarConnotation;

	/**
	 * The shape the Toolbar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	@attr shape?: ToolbarShape;

	/**
	 * The appearance the Toolbar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ToolbarAppearance;


	/**
	 * The appearance the Toolbar should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;
}


