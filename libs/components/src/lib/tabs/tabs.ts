import { attr } from '@microsoft/fast-element';
import { Tabs as FoundationTabs } from '@microsoft/fast-foundation';
import type { Connotation } from '../enums.js';

/**
 * Types of tabs connotation.
 *
 * @public
 */
export type TabsConnotation = Extract<Connotation, Connotation.Accent | Connotation.Information>;

/**
 * Base class for tabs
 *
 * @public
 */
export class Tabs extends FoundationTabs {
	/**
	 * The connotation the tabs should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: TabsConnotation;

}
