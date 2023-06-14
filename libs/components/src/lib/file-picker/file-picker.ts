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
	 * Indicates the file picker's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	filePicker!: Dropzone;

	_dz!: HTMLElement;

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		this.filePicker = new Dropzone(this._dz,
			{
				url: '/',
				addRemoveLinks: true,
			});

		this.filePicker.on('sending', file => {
			const removeElement = file.previewElement.querySelector('.dz-remove');
			if (removeElement instanceof HTMLElement) {
				removeElement.style.display = 'inline';
				removeElement.innerHTML =
					"<vwc-button icon='close-circle-line' appearance='ghost'></vwc-button>";
			}
		});

		this.filePicker.on('complete', file => {
			const removeElement = file.previewElement.querySelector('.dz-remove');
			if (removeElement instanceof HTMLElement) {
				removeElement.style.display = 'inline';
				removeElement.innerHTML =
					"<vwc-button icon='delete-line' appearance='ghost'></vwc-button>";
			}
		});
	}

	chooseFile(): void {
		this.filePicker?.hiddenFileInput?.click();
	}
}

export interface FilePicker extends FormElementHelperText { }
applyMixins(FilePicker, FormElementHelperText);