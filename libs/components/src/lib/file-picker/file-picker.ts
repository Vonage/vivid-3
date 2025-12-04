/* eslint-disable max-len */
import {
	attr,
	ExecutionContext,
	type ExpressionNotifier,
	observable,
	Observable,
	volatile,
} from '@microsoft/fast-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { FormElement, Localized, WithErrorText } from '../../shared/patterns';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import type { Size } from '../enums';
import { WithFeedback } from '../../shared/feedback/mixins';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { FormAssociated } from '../../shared/foundation/form-associated/form-associated';
import { WithContextualHelp } from '../../shared/patterns/form-elements/with-contextual-help';
import { filesFromDataTransfer } from './data-transfer';
import { isAcceptedFileType } from './accept';

export type ValidatedFile = {
	file: File;
	validationError: string | null;
};

/**
 * Types of file uploader size.
 *
 * @public
 */
export type FilePickerSize = ExtractFromEnum<Size, Size.Normal | Size.Expanded>;

/**
 * @public
 * @component file-picker
 * @slot helper-text - Describes how to use the file-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emitted when files are added or removed.
 */
export class FilePicker extends WithContextualHelp(
	WithFeedback(
		WithErrorText(
			FormElement(DelegatesAria(Localized(FormAssociated(VividElement))))
		)
	)
) {
	/**
	 * Whether to allow only a single file. Subsequent added file will replace the current file.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: single-file
	 */
	@attr({ attribute: 'single-file', mode: 'boolean' }) singleFile = false;

	/**
	 * The max number of files that can be selected. Additional files will be rejected.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files
	 */
	@attr({ attribute: 'max-files' }) maxFiles?: number;

	/**
	 * The maximum file size (in megabytes) for each file.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-file-size
	 */
	@attr({ mode: 'fromView', attribute: 'max-file-size' })
	maxFileSize = 256;

	/**
	 * List of accepted files types
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: accept
	 */
	@attr accept?: string;

	/**
	 * The size the file-uploader should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: FilePickerSize;

	/**
	 * Overrides the localized error message for invalid file type
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: invalid-file-type-error
	 */
	@attr({ attribute: 'invalid-file-type-error' }) invalidFileTypeError?: string;

	/**
	 * Overrides the localized error message for max file exceed
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-files-exceeded-error
	 */
	@attr({ attribute: 'max-files-exceeded-error' })
	maxFilesExceededError?: string;

	/**
	 * Overrides the localized error message for file too big
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: file-too-big-error
	 */
	@attr({ attribute: 'file-too-big-error' }) fileTooBigError?: string;

	/**
	 * @internal
	 */
	override nameChanged(previous: string, next: string) {
		super.nameChanged!(previous, next);
		this.#updateFormValue();
	}

	/**
	 * @internal
	 */
	override valueChanged = (previous: string, next: string) => {
		super.valueChanged(previous, next);
		if (next === '' && this.files.length) {
			this.removeAllFiles();
		}
	};

	/**
	 * @internal
	 */
	control!: HTMLElement;

	/**
	 * @internal
	 */
	override proxy = document.createElement('input');

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

	/**
	 * @internal
	 */
	override setFormValue = (
		value: File | string | FormData | null,
		state?: File | string | FormData | null
	) => {
		// Ignore calls from FormAssociated mixin which attempts to use `.value` as the form value
		if (typeof value === 'string') {
			return;
		}

		super.setFormValue(value, state);
	};

	/** @internal */
	override validate() {
		super.validate(this.control);
	}

	/**
	 * @internal
	 */
	override formResetCallback() {
		this.removeAllFiles();
		super.formResetCallback();
	}

	#getCustomValidationError(): string | null {
		if (this.rejectedFiles.length > 0) {
			return this.locale.filePicker.invalidFilesError;
		}

		return null;
	}

	/**
	 * Stores the current error to be able to react to changes.
	 * @internal
	 */
	@observable _customValidationError: string | null = null;
	/**
	 * @internal
	 */
	_customValidationErrorChanged() {
		/* v8 ignore if -- @preserve */
		if (this.proxy) {
			this.proxy.setCustomValidity(this._customValidationError ?? '');
		}
		this.validate();
	}

	// Use an observer to keep the validation error up to date
	#customValidationChangeHandler = {
		handleChange: () => {
			this._customValidationError =
				this.#customValidationChangeObserver.observe(
					this,
					ExecutionContext.default
				);
		},
	};
	#customValidationChangeObserver!: ExpressionNotifier;
	#startObservingCustomValidation() {
		this.#customValidationChangeObserver = Observable.binding(
			() => this.#getCustomValidationError(),
			this.#customValidationChangeHandler,
			true
		);
		this.#customValidationChangeHandler.handleChange();
	}
	#stopObservingCustomValidation() {
		this.#customValidationChangeObserver.dispose();
	}

	override connectedCallback() {
		super.connectedCallback();
		this.#startObservingCustomValidation();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#stopObservingCustomValidation();
	}

	/**
	 * @internal
	 */
	@observable _dragHover = false;

	/**
	 * @internal
	 */
	_onDragEnter() {
		this._dragHover = true;
		return true;
	}

	/**
	 * @internal
	 */
	_onDragOver(e: DragEvent) {
		if (!e.dataTransfer) {
			return true;
		}

		// Makes it possible to drag files from chrome's download bar
		// http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
		const effect = e.dataTransfer.effectAllowed;
		e.dataTransfer.dropEffect =
			'move' === effect || 'linkMove' === effect ? 'move' : 'copy';

		return false; // Prevent default to allow drop
	}

	/**
	 * @internal
	 */
	_onDragLeave(e: DragEvent) {
		// Only remove the class if we're leaving the control element itself
		/* v8 ignore else -- @preserve */
		if (e.currentTarget === e.target) {
			this._dragHover = false;
		}
		return true;
	}

	/**
	 * @internal
	 */
	_onDrop(e: DragEvent) {
		this._dragHover = false;

		if (!e.dataTransfer) {
			return true;
		}

		filesFromDataTransfer(e.dataTransfer)
			.then((files) => this.#addFiles(files))
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.error(err);
			});

		return false; // Prevent browser default
	}

	/**
	 * @internal
	 */
	_onDragEnd() {
		this._dragHover = false;
		return true;
	}

	/**
	 * @internal
	 */
	_onControlClick() {
		this._hiddenInput.click(); // Forward click to trigger the file dialog
	}

	/**
	 * @internal
	 */
	_onRemoveFileClick(file: File) {
		this._allFiles = this._allFiles.filter((f) => f !== file);
		this.$emit('change');
	}

	/**
	 * All files currently in the file picker, prior to validation.
	 * @internal
	 */
	@observable _allFiles: File[] = [];
	/**
	 * @internal
	 */
	_allFilesChanged() {
		this.#updateFormValue();
	}

	#addFiles(files: File[] | FileList) {
		if (this.singleFile) {
			/* v8 ignore else -- @preserve */
			if (files.length > 0) {
				// Only keep the last file
				this._allFiles = [files[files.length - 1]];
			}
		} else {
			this._allFiles = [...this._allFiles, ...files];
		}
		this.$emit('change');
	}

	/**
	 * Removes all files from the File Picker.
	 */
	removeAllFiles() {
		this._allFiles = [];
	}

	/**
	 * All files with their current validation status.
	 * @internal
	 */
	@volatile
	get _validatedFiles() {
		const validationError = (file: File, validFileIndex: number) => {
			if (this.maxFileSize && file.size > this.maxFileSize * 1024 * 1024) {
				return (this.fileTooBigError || this.locale.filePicker.fileTooBigError)
					.replace(
						'{{filesize}}',
						this._formatNumber(Math.round(file.size / 1024 / 10.24) / 100)
					)
					.replace('{{maxFilesize}}', this._formatNumber(this.maxFileSize));
			} else if (!isAcceptedFileType(file, this.accept)) {
				return (
					this.invalidFileTypeError ||
					this.locale.filePicker.invalidFileTypeError
				);
			} else if (
				typeof this.maxFiles === 'number' &&
				validFileIndex >= this.maxFiles
			) {
				return (
					this.maxFilesExceededError ||
					this.locale.filePicker.maxFilesExceededError
				).replace('{{maxFiles}}', String(this.maxFiles));
			} else {
				return null;
			}
		};

		const result: ValidatedFile[] = [];

		let validFileIndex = 0;
		for (const file of this._allFiles) {
			const validatedFile = {
				file,
				validationError: validationError(file, validFileIndex),
			};
			result.push(validatedFile);

			if (!validatedFile.validationError) {
				validFileIndex++;
			}
		}

		return result;
	}

	/**
	 * Files that have been added to the file picker and passed validation.
	 *
	 * @public
	 */
	get files(): File[] {
		return this._validatedFiles
			.filter((f) => !f.validationError)
			.map((f) => f.file);
	}

	/**
	 * Files that have been rejected by the file picker for failing validation.
	 *
	 * @public
	 */
	get rejectedFiles(): File[] {
		return this._validatedFiles
			.filter((f) => !!f.validationError)
			.map((f) => f.file);
	}

	/**
	 * @internal
	 */
	_hiddenInput!: HTMLInputElement;

	/**
	 * @internal
	 */
	_onHiddenInputChange(e: InputEvent) {
		this.#addFiles(this._hiddenInput.files!);

		// Remove files from input
		this._hiddenInput.value = '';

		// Prevent the change event from bubbling into light DOM
		e.stopPropagation();
	}

	/**
	 * @internal
	 */
	_formatNumber(value: number) {
		const str = String(value);
		if (this.locale.common.useCommaAsDecimalSeparator) {
			return str.replace('.', ',');
		}
		return str;
	}
}
