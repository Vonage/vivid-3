import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums';
import { AffixIcon } from '../../shared/patterns';

export type NoteConnotation =
	| Connotation.Accent
	| Connotation.Information
	| Connotation.Success
	| Connotation.Warning
	| Connotation.Alert;
/**
 * Base class for note
 *
 * @public
 * @slot - Any slotted content will appear below the headline.
 * @slot icon - Add an icon to the component.
 */
export class Note extends FoundationElement {
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
