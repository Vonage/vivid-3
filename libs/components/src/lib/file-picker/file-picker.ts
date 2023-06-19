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

	filePicker!: Dropzone;

	_dz!: HTMLElement;
	previewList!: HTMLDivElement;

	/**
	 * Indicates the file picker's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * The max files that can be choosed
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;
	maxFilesChanged(_oldValue: number, newValue: number): void {
		if (this.filePicker) {
			(this.filePicker.options).maxFiles = newValue;
		}
	}

	/**
	 * The max size that can be choosed
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-file-size
	 */
	@attr({ mode: 'fromView', attribute: 'max-file-size' }) maxFileSize: number = 256;
	maxFileSizeChanged(_oldValue: number, newValue: number): void {
		if (this.filePicker) {
			(this.filePicker.options).maxFilesize = newValue;
		}
	}

	/**
	 * If it is possible to upload multiple files
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: upload-multiple
	 */
	@attr({ mode: 'boolean', attribute: 'upload-multiple' }) uploadMultiple = false;
	uploadMultipleChanged(_oldValue: boolean, newValue: boolean): void {
		if (this.filePicker) {
			(this.filePicker.options).uploadMultiple = newValue;
		}
	}

	/**
	 * List of accepted files types
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: accepted-files
	 */
	@attr({ attribute: 'accepted-files' }) acceptedFiles?: string;
	acceptedFilesChanged(_oldValue: string, newValue: string): void {
		if (this.filePicker) {
			(this.filePicker.options).acceptedFiles = newValue;
		}
	}

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		this.filePicker = new Dropzone(this._dz,
			{
				url: '/',
				maxFiles: this.maxFiles,
				maxFilesize: this.maxFileSize,
				uploadMultiple: this.uploadMultiple,
				acceptedFiles: this.acceptedFiles,
				addRemoveLinks: true,
			});

		this.#addRemoveToButton();
	}

	#addRemoveToButton = () => {
		this.filePicker.on('sending', file => {
			if (file && file.previewElement && file.previewElement.parentNode) {
				file.previewElement.parentNode.removeChild(file.previewElement);
				this.previewList.appendChild(file.previewElement);
			}

			this.#changeRemoveElement(file,
				"<vwc-button icon='close-circle-line' appearance='ghost' size='condensed'></vwc-button>");
		});

		this.filePicker.on('complete', file => {
			this.#changeRemoveElement(file,
				"<vwc-button icon='delete-line' appearance='ghost' size='condensed'></vwc-button>");
		});
	};

	#changeRemoveElement(file: any, innerHTML: string): void {
		const removeElement = file.previewElement.querySelector('.dz-remove');
		if (removeElement instanceof HTMLElement) {
			removeElement.style.display = 'inline';
			removeElement.innerHTML = innerHTML;
		}
	}

	chooseFile(): void {
		if (this.filePicker && this.filePicker.hiddenFileInput) {
			this.filePicker.hiddenFileInput.click();
		}
	}
}

export interface FilePicker extends FormElementHelperText { }
applyMixins(FilePicker, FormElementHelperText);
