import {applyMixins, FoundationElement} from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type {Connotation} from '../enums';
import {AffixIcon} from '../../shared/patterns';

export type NoteConnotation =
	Connotation.Info |
	Connotation.Announcement |
	Connotation.Success |
	Connotation.Warning |
	Connotation.Alert;
/**
 * Base class for note
 *
 * @public
 */
export class Note extends FoundationElement {
	/**
	 * Indicates the note's header text
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: header
	 */
	@attr header?: string;

	@attr connotation?: NoteConnotation;
}

applyMixins(Note, AffixIcon);

export interface Note extends AffixIcon {
}
