/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import type { Size } from '../enums';
import { FormElementHelperText } from '../../shared/patterns';
import type { Button } from '../button/button';
import { Connotation } from '../enums';

/**
 * Types of file uploader size.
 *
 * @public
 */
export type FileUploaderSize = Extract<Size, Size.Normal | Size.Expanded>;

/**
 * File-picker component
 *
 * @public
 * @event change - Emitted when a file is added or removed.
 */

export class FilePicker extends FoundationElement {
	#dropzone?: Dropzone;

	/**
	 * Files that have been added to the file picker and passed validation.
	 *
	 * @public
	 */
	get files(): File[] {
		return this.#dropzone?.getAcceptedFiles() ?? [];
	}

	/**
	 * Indicates the file picker's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * The max files that can be selected.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;
	maxFilesChanged(_oldValue: number, newValue: number): void {
		if (!this.#dropzone) {
			return;
		}

		this.#dropzone.options.maxFiles = newValue;
		this.#updateHiddenFileInput();
	}

	/**
	 * The max file size that can be selected.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-file-size
	 */
	@attr({ mode: 'fromView', attribute: 'max-file-size' })
		maxFileSize: number = 256;
	maxFileSizeChanged(_oldValue: number, newValue: number): void {
		if (!this.#dropzone) {
			return;
		}

		this.#dropzone.options.maxFilesize = newValue;
	}

	/**
	 * List of accepted files types
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: accept
	 */
	@attr accept?: string;
	acceptChanged(_oldValue: string, newValue: string): void {
		if (!this.#dropzone) {
			return;
		}

		this.#dropzone.options.acceptedFiles = newValue;
	}

	/**
	 * The size the file-uploader should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: FileUploaderSize;

	/**
	 * Used internally to hold the tag that button is registered at.
	 */
	private buttonTag = 'vwc-button';

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		const control = this.shadowRoot!.querySelector(
			'.control'
		) as HTMLDivElement;
		const previewList = this.shadowRoot!.querySelector(
			'.preview-list'
		) as HTMLDivElement;
		this.#dropzone = new Dropzone(control, {
			url: '/', // dummy url, we do not use dropzone's upload functionality
			maxFiles: this.maxFiles ?? null as any,
			maxFilesize: this.maxFileSize,
			acceptedFiles: this.accept,
			autoProcessQueue: false,
			addRemoveLinks: false,
			previewsContainer: previewList,
			createImageThumbnails: false,
			// Updated version of default template (https://github.com/dropzone/dropzone/blob/f50d1828ab5df79a76be00d1306cc320e39a27f4/src/preview-template.html)
			previewTemplate: `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-filename"><span data-dz-name></span></div>
    <div class="dz-size"><span data-dz-size></span></div>
  </div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <${this.buttonTag} class="remove-btn" icon="delete-line" appearance="ghost" size="condensed"></${this.buttonTag}>
</div>`,
			// Replace "upload" with "select" in dict messages
			dictInvalidFileType: "You can't select files of this type.",
			dictMaxFilesExceeded: 'You can not select any more files.',
		});

		this.#dropzone.on('addedfile', (file) => {
			if (file.previewElement) {
				const removeButton = file.previewElement.querySelector(
					'.remove-btn'
				) as Button;
				removeButton.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					this.#dropzone!.removeFile(file as File as DropzoneFile);
				});
			}

			this.#handleFilesChanged();
		});

		this.#dropzone.on('removedfile', () => {
			this.#handleFilesChanged();
		});

		this.#dropzone.on('error', (file) => {
			if (file.previewElement) {
				const removeButton = file.previewElement.querySelector('.remove-btn') as Button;
				removeButton.connotation = Connotation.Alert;
			}
		});
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#dropzone!.destroy();
	}
	/**
	 * Used internally to set the button tag.
	 * @internal
	 */
	setButtonTag(tag: string) {
		this.buttonTag = tag;
	}

	/**
	 * @internal
	 */
	handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			this.#chooseFile();
		}
		return true;
	}

	#chooseFile(): void {
		if (this.#dropzone!.hiddenFileInput) {
			this.#dropzone!.hiddenFileInput.click();
		}
	}

	#updateHiddenFileInput(): void {
		if (this.#dropzone!.hiddenFileInput) {
			// Dropzone will recreate the hiddenFileInput on change event
			this.#dropzone!.hiddenFileInput.dispatchEvent(
				new Event('change', { bubbles: false })
			);
		}
	}

	#handleFilesChanged(): void {
		this.$emit('change');
	}
}

export interface FilePicker extends FormElementHelperText { }
applyMixins(FilePicker, FormElementHelperText);
