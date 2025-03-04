import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

export type NoteConnotation =
	| Connotation.Accent
	| Connotation.Information
	| Connotation.Success
	| Connotation.Warning
	| Connotation.Announcement
	| Connotation.Alert;
/**
 * @public
 * @component note
 * @slot - Any slotted content will appear below the headline.
 * @slot icon - Add an icon to the component.
 */
export class Note extends VividElement {
	/**
	 * Indicates the note's headline text
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: headline
	 */
	@attr headline?: string;
	@attr connotation?: NoteConnotation;
}

export interface Note extends AffixIcon {}
applyMixins(Note, AffixIcon);
