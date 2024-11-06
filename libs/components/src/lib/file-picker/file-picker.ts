/* eslint-disable max-len */
import { attr } from '@microsoft/fast-element';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import type { Size } from '../enums';
import { Connotation } from '../enums';
import {
	type ErrorText,
	errorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	Localized,
} from '../../shared/patterns';
import type { Button } from '../button/button';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';
import type { Locale } from '../../shared/localization/Locale';
import { FormAssociatedFilePicker } from './file-picker.form-associated';

/**
 * Types of file uploader size.
 *
 * @public
 */
export type FilePickerSize = Extract<Size, Size.Normal | Size.Expanded>;

const isFormAssociatedTryingToSetFormValueToFakePath = (
	value: File | string | FormData | null
) => typeof value === 'string';

const generateFilePreviewTemplate = (
	buttonTag: string,
	locale: Locale
): string => {
	return `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-filename"><span data-dz-name></span></div>
    <div class="dz-size"><span data-dz-size></span></div>
  </div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <${buttonTag} class="remove-btn" icon="delete-line" appearance="ghost" size="condensed" aria-label="${locale.filePicker.removeFileLabel}"></${buttonTag}>
</div>`;
};
/**
 * @public
 * @component file-picker
 * @slot helper-text - Describes how to use the file-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emitted when a file is added or removed.
 */
@errorText
@formElements
export class FilePicker extends FormAssociatedFilePicker {
	/**
	 * @internal
	 */
	_dropzone?: Dropzone;

	/**
	 * Files that have been added to the file picker and passed validation.
	 *
	 * @public
	 */
	get files(): File[] {
		return this._dropzone?.getAcceptedFiles() ?? [];
	}

	#syncSingleFileState() {
		if (this.singleFile) {
			this._dropzone?.hiddenFileInput?.removeAttribute('multiple');
		} else {
			this._dropzone?.hiddenFileInput?.setAttribute('multiple', 'multiple');
		}
	}
	/**
	 * Single file state.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: single-file
	 */
	@attr({ attribute: 'single-file', mode: 'boolean' }) singleFile = false;
	singleFileChanged() {
		this.#syncSingleFileState();
	}

	/**
	 * The max files that can be selected.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;
	maxFilesChanged(_oldValue: number, newValue: number): void {
		if (!this._dropzone) {
			return;
		}

		this._dropzone.options.maxFiles = newValue;
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
	maxFileSize = 256;
	maxFileSizeChanged(_oldValue: number, newValue: number): void {
		if (!this._dropzone) {
			return;
		}

		this._dropzone.options.maxFilesize = newValue;
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
		if (!this._dropzone) {
			return;
		}

		this._dropzone.options.acceptedFiles = newValue;
	}

	/**
	 * The size the file-uploader should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: FilePickerSize;

	override nameChanged(previous: string, next: string) {
		super.nameChanged!(previous, next);
		this.#updateFormValue();
	}

	/**
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		super.valueChanged(previous, next);
		// Like input[type=file], remove files when value is set to empty string
		if (next === '' && this.files.length) {
			this.removeAllFiles();
		}
	}

	/**
	 * @internal
	 */
	control!: HTMLElement;

	/**
	 * Used internally to hold the tag that button is registered at.
	 */
	private buttonTag = 'vwc-button';

	constructor() {
		super();
		Dropzone.autoDiscover = false;
	}

	#localizeErrorMessage = (file: DropzoneFile, message: string | any) => {
		if (file.previewElement) {
			file.previewElement.classList.add('dz-error');
			// istanbul ignore next
			if (typeof message !== 'string' && message.error) {
				message = message.error;
			}
			for (const node of file.previewElement.querySelectorAll(
				'[data-dz-errormessage]'
			)) {
				node.textContent = this.#formatNumbersInMessage(message);
			}
		}
	};

	#localizeFileSizeNumberAndUnits = () => {
		(this._dropzone as any).filesize = (size: number) => {
			return this.#formatNumbersInMessage(
				(Dropzone.prototype as any).filesize.call(this._dropzone, size)
			);
		};
	};

	#addRemoveButtonToFilesPreview() {
		this._dropzone!.on('addedfiles', (files) => {
			for (const file of files) {
				if (file.previewElement) {
					const removeButton = file.previewElement.querySelector(
						'.remove-btn'
					) as Button;
					removeButton.addEventListener('click', (e) => {
						e.preventDefault();
						e.stopPropagation();
						this._dropzone!.removeFile(file as File as DropzoneFile);
					});
				}
			}

			this.#handleFilesChanged();
		});

		this.#setRemoveButtonConnotationOnError();
	}

	#setRemoveButtonConnotationOnError() {
		this._dropzone!.on('error', (file) => {
			if (file.previewElement) {
				const removeButton = file.previewElement.querySelector(
					'.remove-btn'
				) as Button;
				removeButton.connotation = Connotation.Alert;
			}
		});
	}

	override connectedCallback() {
		super.connectedCallback();

		const control = this.shadowRoot!.querySelector(
			'.control'
		) as HTMLDivElement;
		const previewList = this.shadowRoot!.querySelector(
			'.preview-list'
		) as HTMLDivElement;
		this._dropzone = new Dropzone(control, {
			url: '/', // dummy url, we do not use dropzone's upload functionality
			maxFiles: this.maxFiles ?? (null as any),
			maxFilesize: this.maxFileSize,
			acceptedFiles: this.accept,
			autoProcessQueue: false,
			addRemoveLinks: false,
			previewsContainer: previewList,
			createImageThumbnails: false,
			previewTemplate: generateFilePreviewTemplate(this.buttonTag, this.locale),
			dictInvalidFileType: this.locale.filePicker.invalidFileTypeError,
			dictMaxFilesExceeded: this.locale.filePicker.maxFilesExceededError,
			dictFileTooBig: this.locale.filePicker.fileTooBigError,
			error: this.#localizeErrorMessage,
		});

		this.#localizeFileSizeNumberAndUnits();

		this.#addRemoveButtonToFilesPreview();

		this._dropzone.on('removedfile', () => {
			this.#handleFilesChanged();
		});

		this.#syncSingleFileState();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._dropzone!.destroy();
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
		if (this._dropzone!.hiddenFileInput) {
			this._dropzone!.hiddenFileInput.click();
		}
	}

	#updateHiddenFileInput(): void {
		this._dropzone!.hiddenFileInput!.dispatchEvent(
			new Event('change', { bubbles: false })
		);
	}

	#keepOnlyNewestFile() {
		for (let i = 0; i < this.files.length - 1; i++) {
			this._dropzone!.removeFile(this.files[i] as File as DropzoneFile);
		}
	}

	#handleFilesChanged(): void {
		if (this.singleFile && this.files.length >= 1) {
			this.#keepOnlyNewestFile();
		}
		this.$emit('change');
		this.#updateFormValue();
		requestAnimationFrame(() => this.#syncSingleFileState());
	}

	#updateFormValue() {
		const files = this.files;

		if (!this.name) {
			this.setFormValue(null);
		} else {
			const formData = new FormData();
			for (const file of files) {
				formData.append(this.name, file);
			}
			this.setFormValue(formData);
		}

		this.#setValueToAFakePathLikeNativeInput();
	}

	#setValueToAFakePathLikeNativeInput() {
		this.value =
			this.files.length > 0 ? `C:\\fakepath\\${this.files[0].name}` : '';
	}

	override setFormValue = (
		value: File | string | FormData | null,
		state?: File | string | FormData | null
	) => {
		if (isFormAssociatedTryingToSetFormValueToFakePath(value)) {
			return;
		}

		super.setFormValue(value, state);
	};

	override validate(): void {
		super.validate(this.control);
	}

	override formResetCallback(): void {
		super.formResetCallback();
		this._dropzone!.removeAllFiles();
	}

	#formatNumbersInMessage(message: string) {
		if (this.locale.common.useCommaAsDecimalSeparator) {
			return message.replace(/(\d+)\.(\d+)/g, '$1,$2');
		}
		return message;
	}

	/**
	 * Removes all files from the File Picker.
	 */
	removeAllFiles() {
		this._dropzone?.removeAllFiles();
	}
}

export interface FilePicker
	extends FormElementHelperText,
		Localized,
		ErrorText,
		FormElement,
		FormElementHelperText {}
applyMixinsWithObservables(FilePicker, FormElementHelperText, Localized);
