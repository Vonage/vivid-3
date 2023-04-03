import { attr } from '@microsoft/fast-element';
import { ListboxElement as FoundationListboxElement } from '@microsoft/fast-foundation';
import type { Appearance } from '../enums';

/**
 * Types of listbox appearance.
 *
 * @public
 */
export type LisboxAppearance = Extract<Appearance, Appearance.Outlined | Appearance.Ghost>;

/**
 * Base class for listbox
 *
 * @public
 * @slot - Default slot.
 */
export class Listbox extends FoundationListboxElement {
	/**
	 * The appearance the listbox should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	@attr appearance?: LisboxAppearance;
}
