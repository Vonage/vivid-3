import {applyMixins, FoundationElement} from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {AffixIcon} from '../../shared/patterns';

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
}

applyMixins(Note, AffixIcon);

export interface Note extends AffixIcon {
}
