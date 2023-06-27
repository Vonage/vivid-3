/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import { FormElementHelperText } from '../../shared/patterns';
import type { Button, ButtonConnotation } from '../button/button';

const DEFAULT_MAX_FILES: number = 100;
/**
 * Base class for file-picker
 *
 * @public
 */

export class FilePicker extends FoundationElement {

	#filePicker!: Dropzone;

	get files(): File[] {
		return this.#filePicker.files;
	}

	get value(): string {
		return `C:\\fakepath\\${this.#filePicker.files[0].name}`;
	}

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
	 * The max files that can be selected for upload
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;
	maxFilesChanged(_oldValue: number, newValue: number): void {
		if (this.#filePicker) {
			(this.#filePicker.options).maxFiles = (this.multiple && !this.maxFiles) ? DEFAULT_MAX_FILES : newValue;
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
		if (this.#filePicker) {
			(this.#filePicker.options).maxFilesize = newValue;
		}
	}

	/**
	 * If it is possible to upload multiple files
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: multiple
	 */
	@attr({ mode: 'boolean' }) multiple = false;
	multipleChanged(_oldValue: boolean, newValue: boolean): void {
		if (this.#filePicker) {
			(this.#filePicker.options).uploadMultiple = newValue;
		}
	}

	/**
	 * List of files types to accept
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: accept
	 */
	@attr accept?: string;
	acceptChanged(_oldValue: string, newValue: string): void {
		if (this.#filePicker) {
			(this.#filePicker.options).acceptedFiles = newValue;
		}
	}

	/**
	 * List of capture types
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: capture
	 */
	@attr ({ mode: 'fromView' }) capture?: string = 'file';
	captureChanged(_oldValue: string, newValue: string): void {
		if (this.#filePicker) {
			(this.#filePicker.options).capture = newValue;
		}
	}

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		this.#filePicker = new Dropzone(this._dz,
			{
				url: '/',
				maxFiles: this.maxFiles,
				maxFilesize: this.maxFileSize,
				uploadMultiple: this.multiple,
				acceptedFiles: this.accept,
				capture: this.capture,
				addRemoveLinks: true,
			});

		this.#onFileAdded();
	}

	#onFileAdded = () => {
		let removeButton: Button;
		this.#filePicker.on('addedfile', file => {
			this.$emit('change');
			if (file && file.previewElement) {
				this.#removeParent(this, file);
				this.#removeDefaultDivs(file);
			}
			removeButton = this.#addRemoveButton(this, file);
		});

		this.#filePicker.on('complete', file => {
			removeButton.icon = 'delete-line';
			if (file.status === Dropzone.ERROR) {
				removeButton.connotation = 'alert' as ButtonConnotation;
			}
		});
	};

	#addRemoveButton(_this: any, file: any) {
		const removeButton = Dropzone.createElement("<vwc-button class='remove-btn' icon='close-circle-line' appearance='ghost' size='condensed'></vwc-button>") as Button;
		removeButton.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			_this.removeFile(file);
		});
		file.previewElement.appendChild(removeButton);
		return removeButton;
	}

	#removeParent(_this: any, file: any) {
		if (file.previewElement.parentNode && file.previewElement.parentNode !== _this.previewList) {
			file.previewElement.parentNode.removeChild(file.previewElement);
			_this.previewList.appendChild(file.previewElement);
		}
	}

	#removeDefaultDivs(file: any) {
		file.previewElement.querySelector('.dz-success-mark').remove();
		file.previewElement.querySelector('.dz-error-mark').remove();
		file.previewElement.querySelector('.dz-remove').remove();
		file.previewElement.querySelector('.dz-image').remove();
	}

	getAcceptedFiles(): File[] {
		return this.#filePicker.getAcceptedFiles();
	}

	getFilesWithErrorStatus(): File[] {
		return this.#filePicker.getFilesWithStatus(Dropzone.ERROR);
	}

	addFile(file: File): void {
		this.#filePicker.addFile(file as DropzoneFile);
	}

	removeFile(file: File): void {
		this.#filePicker.removeFile(file as DropzoneFile);
	}

	handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.#chooseFile();
		}
		return true;
	}

	#chooseFile(): void {
		if (this.#filePicker.hiddenFileInput) {
			this.#filePicker.hiddenFileInput.click();
		}
	}
}

export interface FilePicker extends FormElementHelperText { }
applyMixins(FilePicker, FormElementHelperText);
