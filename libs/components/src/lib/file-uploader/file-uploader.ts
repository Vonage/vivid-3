/* eslint-disable max-len */
import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import { FormElementHelperText } from '../../shared/patterns';
import type { Button, ButtonConnotation } from '../button/button';

/**
 * Base class for file-uploader
 *
 * @public
 */

export class FileUploader extends FoundationElement {

	#fileUploader!: Dropzone;

	/**
	 * File uploader's files.
	 *
	 * @public
	 */
	get files(): File[] {
		return this.#fileUploader.files;
	}

	/**
	 * File uploader's options.
	 *
	 * @public
	 */
	get options(): any {
		return this.#fileUploader.options;
	}

	/**
	 * Indicates the file uploader's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 *	Sets where the files in the file uploader's will be uploaded.
	 * 
	 * @public
	 * @remarks
	 * HTML Attribute: url
	 */
	@attr url?: string;

	/**
	 * Sets file uploader's method.
	 * 
	 * @public
	 * @remarks
	 * HTML Attribute: method
	 */
	@attr method?: string;

	/**
	 * If false the queue will not be processed automatically.
	 * 
	 * @public
	 * @remarks
	 * HTML Attribute: auto-process-queue
	 */
	@attr({ mode: 'boolean', attribute: 'auto-process-queue' }) autoProcessQueue = false;
	autoProcessQueueChanged(_oldValue: boolean, newValue: boolean): void {
		if (this.#fileUploader) {
			(this.#fileUploader.options).autoProcessQueue = newValue;
		}
	}

	/**
	 * The max files that can be selected for upload
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;
	maxFilesChanged(_oldValue: number, newValue: number): void {
		if (this.#fileUploader) {
			(this.#fileUploader.options).maxFiles = newValue;
		}
	}

	/**
	 * The max file size that can be selected for upload
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-file-size
	 */
	@attr({ mode: 'fromView', attribute: 'max-file-size' }) maxFileSize: number = 256;
	maxFileSizeChanged(_oldValue: number, newValue: number): void {
		if (this.#fileUploader) {
			(this.#fileUploader.options).maxFilesize = newValue;
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
		if (this.#fileUploader) {
			(this.#fileUploader.options).uploadMultiple = newValue;
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
		if (this.#fileUploader) {
			(this.#fileUploader.options).acceptedFiles = newValue;
		}
	}

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	override connectedCallback() {
		super.connectedCallback();

		if (this.shadowRoot) {
			const dropzone = this.shadowRoot.querySelector('.control') as HTMLDivElement;
			this.#fileUploader = new Dropzone(dropzone,
				{
					url: this.url ? this.url : '/',
					method: this.method ? this.method : 'post',
					autoProcessQueue: this.autoProcessQueue,
					maxFiles: this.maxFiles,
					maxFilesize: this.maxFileSize,
					uploadMultiple: this.uploadMultiple,
					acceptedFiles: this.acceptedFiles,
					addRemoveLinks: true,
				});
		}

		this.#onFileAdded();
	}

	#onFileAdded = () => {
		let removeButton: Button;
		this.#fileUploader.on('addedfile', file => {
			if (file && file.previewElement) {
				this.#removeParent(this, file);
				this.#removeDefaultDivs(file);
			}
			removeButton = this.#addRemoveButton(this, file);
		});

		this.#fileUploader.on('complete', file => {
			removeButton.icon = 'delete-line';
			if (file.status === Dropzone.ERROR) {
				removeButton.connotation = 'alert' as ButtonConnotation;
			}
		});
	};

	#addRemoveButton(_this: FileUploader, file: DropzoneFile) {
		const removeButton = Dropzone.createElement("<vwc-button class='remove-btn' icon='close-circle-line' appearance='ghost' size='condensed'></vwc-button>") as Button;
		removeButton.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			_this.removeFile(file as File);
		});
		file.previewElement.appendChild(removeButton);
		return removeButton;
	}

	#removeParent(_this: FileUploader, file: DropzoneFile) {
		if (_this.shadowRoot) {
			const previewListDiv = _this.shadowRoot.querySelector('.preview-list') as HTMLDivElement;
			if (file.previewElement.parentNode && file.previewElement.parentNode !== previewListDiv) {
				file.previewElement.parentNode.removeChild(file.previewElement);
				previewListDiv.appendChild(file.previewElement);
			}
		}
	}

	#removeDefaultDivs(file: DropzoneFile) {
		const successDiv = file.previewElement.querySelector('.dz-success-mark');
		if (successDiv) successDiv.remove();
		const errorDiv = file.previewElement.querySelector('.dz-error-mark');
		if (errorDiv) errorDiv.remove();
		const removeDiv = file.previewElement.querySelector('.dz-remove');
		if (removeDiv) removeDiv.remove();
		const imageDiv = file.previewElement.querySelector('.dz-image');
		if (imageDiv) imageDiv.remove();
	}

	/**
	 * Get Accepted Files
	 *
	 * @public
	 */
	getAcceptedFiles(): File[] {
		return this.#fileUploader.getAcceptedFiles();
	}

	/**
	 * Get Queued Files
	 *
	 * @public
	 */
	getQueuedFiles(): File[] {
		return this.#fileUploader.getQueuedFiles();
	}

	/**
	 * Get Files With Error Status
	 *
	 * @public
	 */
	getFilesWithErrorStatus(): File[] {
		return this.#fileUploader.getFilesWithStatus(Dropzone.ERROR);
	}

	/**
	 * Add file
	 *
	 * @public
	 */
	addFile(file: File): void {
		this.#fileUploader.addFile(file as DropzoneFile);
	}

	/**
	 * Remove file
	 *
	 * @public
	 */
	removeFile(file: File): void {
		this.#fileUploader.removeFile(file as DropzoneFile);
	}

	/**
	 * Process Queue
	 *
	 * @public
	 */
	processQueue(): void {
		this.#fileUploader.processQueue();
	}

	handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.#chooseFile();
		}
		return true;
	}

	#chooseFile(): void {
		if (this.#fileUploader.hiddenFileInput) {
			this.#fileUploader.hiddenFileInput.click();
		}
	}
}

export interface FileUploader extends FormElementHelperText { }
applyMixins(FileUploader, FormElementHelperText);
