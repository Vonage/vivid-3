import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import Dropzone from 'dropzone';
import { FormElementHelperText } from '../../shared/patterns';

/**
 * Base class for file-picker
 *
 * @public
 */

export class FilePicker extends FoundationElement {
	/**
	 * Indicates the file picker's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;

	/**
	 * Indicates the file picker's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	filtPicker!: Dropzone;

	_dz!: HTMLElement;

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		this.filtPicker = new Dropzone(this._dz,
			{
				url: '/',
			});
		this.filtPicker.on('addedfile', file => {
			// eslint-disable-next-line no-console
			console.log('file ' + file); // TODO: remove
		});
	}
}

export interface FilePicker extends FormElementHelperText { }
applyMixins(FilePicker, FormElementHelperText);