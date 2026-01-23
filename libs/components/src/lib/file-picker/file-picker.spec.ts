import userEvent from '@testing-library/user-event';
import {
	createFormHTML,
	elementUpdated,
	fixture,
	getControlElement,
} from '@repo/shared';
import '.';
import deDE from '../../locales/de-DE';
import enUS from '../../locales/en-US';
import {
	allAriaPropertiesExcept,
	itShouldDelegateAriaAttributes,
} from '../../shared/aria/should-delegate-aria.spec';
import { setLocale } from '../../shared/localization';
import type { Button } from '../button/button';
import { Size } from '../enums';
import {
	itShouldDisplayErrorTextFeedback,
	itShouldDisplayHelperTextFeedback,
	itShouldDisplayValidationErrorFeedback,
} from '../../shared/feedback/should-display-feedback.spec';
import { FilePicker } from './file-picker';
import {
	mockDir,
	mockTransfer,
	simulateDirReadError,
} from './__mocks__/data-transfer';

const COMPONENT_TAG = 'vwc-file-picker';

async function generateFile(
	fileName: string,
	sizeMb: number,
	type = 'text/plain'
): Promise<File> {
	const blob = new Blob(['x'.repeat(sizeMb * 1024 * 1024)], { type });
	return new File([blob], fileName, { type: blob.type });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('vwc-file-picker', () => {
	let element: FilePicker;
	let hiddenInput: HTMLInputElement;

	function setupFixture(template: string) {
		element = fixture(template) as FilePicker;
		hiddenInput = element.shadowRoot!.querySelector(
			'input[type=file]'
		) as HTMLInputElement;
	}

	function addFiles(files: File[]) {
		Object.defineProperty(hiddenInput, 'files', {
			value: files,
			configurable: true,
		});
		hiddenInput.dispatchEvent(new Event('change'));
	}

	function getErrorMessage(forFileAtIndex: number) {
		return element
			.shadowRoot!.querySelectorAll('.preview-list .error-message')
			[forFileAtIndex]!.textContent!.trim();
	}

	function getRemoveButton(forFileAtIndex: number) {
		return element.shadowRoot!.querySelectorAll('.preview-list .remove-btn')[
			forFileAtIndex
		] as Button;
	}

	beforeEach(async () => {
		setupFixture(
			`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
		);
	});

	afterEach(() => {
		element.remove();
		setLocale(enUS);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-file-picker', async () => {
			expect(element).toBeInstanceOf(FilePicker);
			expect(element.label).toBeUndefined();
			expect(element.helperText).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.maxFileSize).toEqual(256);
			expect(element.maxFiles).toBeUndefined();
			expect(element.accept).toBeUndefined();
			expect([element.files, element.rejectedFiles]).toEqual([[], []]);
			expect(element.invalidFileTypeError).toBeUndefined();
			expect(element.maxFilesExceededError).toBeUndefined();
			expect(element.fileTooBigError).toBeUndefined();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should allow accessing the component in unmounted state and mounting later without error', async () => {
			const unmountedElement = document.createElement(
				COMPONENT_TAG
			) as FilePicker;
			unmountedElement.maxFileSize = 256;
			unmountedElement.maxFiles = 1;
			unmountedElement.accept = '.jpg';
			unmountedElement.removeAllFiles();

			expect([unmountedElement.files, unmountedElement.rejectedFiles]).toEqual([
				[],
				[],
			]);
			expect(() => {
				document.body.appendChild(unmountedElement);
				document.body.removeChild(unmountedElement);
			}).not.toThrow();
		});
	});

	describe('drag and drop', () => {
		it('should show drag-hover state on dragenter', async () => {
			const dragEnterEvent = new DragEvent('dragenter', {
				bubbles: true,
				cancelable: true,
			});

			getControlElement(element).dispatchEvent(dragEnterEvent);
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains('drag-hover')).toBe(
				true
			);
		});

		it('should stop showing drag-hover state on dragleave', async () => {
			getControlElement(element).dispatchEvent(
				new DragEvent('dragenter', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			getControlElement(element).dispatchEvent(
				new DragEvent('dragleave', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains('drag-hover')).toBe(
				false
			);
		});

		it('should stop showing drag-hover state on drop', async () => {
			getControlElement(element).dispatchEvent(
				new DragEvent('dragenter', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			getControlElement(element).dispatchEvent(
				new DragEvent('drop', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains('drag-hover')).toBe(
				false
			);
		});

		it('should stop showing drag-hover state on dragend', async () => {
			getControlElement(element).dispatchEvent(
				new DragEvent('dragenter', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			getControlElement(element).dispatchEvent(
				new DragEvent('dragend', {
					bubbles: true,
					cancelable: true,
				})
			);
			await elementUpdated(element);

			expect(getControlElement(element).classList.contains('drag-hover')).toBe(
				false
			);
		});

		it('should have upload icon with correct attributes', async () => {
			const uploadIcon = element.shadowRoot!.querySelector(
				'.upload-icon'
			) as HTMLElement;

			expect(uploadIcon).toBeTruthy();
			expect(uploadIcon.getAttribute('name')).toBe('cloud-upload-line');
			expect(uploadIcon.getAttribute('size')).toBe('-4');
		});

		it('should ignore drop events without dataTransfer', async () => {
			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
			});
			Object.defineProperty(dropEvent, 'dataTransfer', {
				value: null,
			});

			getControlElement(element).dispatchEvent(dropEvent);

			expect(dropEvent.defaultPrevented).toBe(false);
		});

		it('should prevent default of drop events with dataTransfer', async () => {
			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
				dataTransfer: new DataTransfer(),
			});

			getControlElement(element).dispatchEvent(dropEvent);

			expect(dropEvent.defaultPrevented).toBe(true);
		});

		it('should ignore dragover events without dataTransfer', async () => {
			const dragOverEvent = new DragEvent('dragover', {
				bubbles: true,
				cancelable: true,
			});
			Object.defineProperty(dragOverEvent, 'dataTransfer', {
				value: null,
			});

			getControlElement(element).dispatchEvent(dragOverEvent);

			expect(dragOverEvent.defaultPrevented).toBe(false);
		});

		it('should prevent default of dragover events with dataTransfer', async () => {
			const dragOverEvent = new DragEvent('dragover', {
				bubbles: true,
				cancelable: true,
				dataTransfer: new DataTransfer(),
			});

			getControlElement(element).dispatchEvent(dragOverEvent);

			expect(dragOverEvent.defaultPrevented).toBe(true);
		});

		describe('allows dragging files from chrome download bar', () => {
			it('should set dropEffect to "copy" by default', async () => {
				const dataTransfer = new DataTransfer();
				const dragOverEvent = new DragEvent('dragover', {
					bubbles: true,
					cancelable: true,
					dataTransfer,
				});

				getControlElement(element).dispatchEvent(dragOverEvent);

				expect(dataTransfer.dropEffect).toBe('copy');
			});

			it.each(['move', 'linkMove'] as const)(
				'should set dropEffect to "move" when effectAllowed is "%s"',
				async (effectAllowed) => {
					const dataTransfer = new DataTransfer();
					dataTransfer.effectAllowed = effectAllowed;
					const dragOverEvent = new DragEvent('dragover', {
						bubbles: true,
						cancelable: true,
						dataTransfer,
					});

					getControlElement(element).dispatchEvent(dragOverEvent);

					expect(dataTransfer.dropEffect).toBe('move');
				}
			);
		});
	});

	describe('label', function () {
		it('should set a file picker label if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement?.textContent?.trim()).toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement).toBeNull();
		});
	});

	describe('value', function () {
		it('should be set to a fake path when a file is added', async function () {
			addFiles([await generateFile('london.png', 1)]);
			await elementUpdated(element);
			expect(element.value).toBe('C:\\fakepath\\london.png');
		});

		it('should remove all files when setting value to an empty string', async function () {
			element.maxFileSize = 1;
			addFiles([
				await generateFile('london-1.png', 1),
				await generateFile('london-2.png', 1),
				await generateFile('london-3.png', 2),
			]);
			await elementUpdated(element);

			expect([
				element.files.length,
				element.rejectedFiles.length,
			]).toStrictEqual([2, 1]);

			element.value = '';

			expect([
				element.files.length,
				element.rejectedFiles.length,
			]).toStrictEqual([0, 0]);
		});
	});

	describe('max file size', function () {
		it('should show an error message for files larger than maxFileSize', async function () {
			element.maxFileSize = 1; // 1 MB
			addFiles([await generateFile('london.png', 2)]);
			await elementUpdated(element);

			expect(getErrorMessage(0)).toBe(
				'File is too big (2MiB). Max filesize: 1MiB.'
			);
		});

		it('should show a custom error message (when supplied) for files larger than maxFileSize', async function () {
			element.maxFileSize = 1; // 1 MB
			element.fileTooBigError =
				'File size of {{filesize}}MB is too big. Limit is {{maxFilesize}}MB.';
			addFiles([await generateFile('london.png', 2)]);
			await elementUpdated(element);

			expect(getErrorMessage(0)).toBe(
				'File size of 2MB is too big. Limit is 1MB.'
			);

			element.fileTooBigError = undefined;
			await elementUpdated(element);

			expect(getErrorMessage(0)).toBe(
				'File is too big (2MiB). Max filesize: 1MiB.'
			);
		});

		it('should show the error only once when the same file is reuploaded', async () => {
			element.maxFileSize = 0.1; // 1 MB
			const largeFile = await generateFile('large-file.png', 0.5); // 10 MB

			addFiles([largeFile]);
			await elementUpdated(element);

			expect(element.rejectedFiles.length).toBe(1);
			expect(getErrorMessage(0)).toBe(
				'File is too big (0.5MiB). Max filesize: 0.1MiB.'
			);

			// Reupload the same file
			addFiles([largeFile]);
			await elementUpdated(element);

			expect(element.rejectedFiles.length).toBe(1);
			expect(getErrorMessage(0)).toBe(
				'File is too big (0.5MiB). Max filesize: 0.1MiB.'
			);
		});

		it('should replace the existing file with the last file when singleFile is true', async () => {
			element.singleFile = true;
			const file1 = await generateFile('file1.txt', 1);
			const file2 = await generateFile('file2.txt', 1);

			addFiles([file1]);
			await elementUpdated(element);

			expect(element.files).toEqual([file1]);

			addFiles([file2]);
			await elementUpdated(element);

			expect(element.files).toEqual([file2]);
		});
	});

	describe('maxFiles', function () {
		describe('error message', () => {
			it('should show an error message for files added after the maxFiles limit is reached', async function () {
				element.maxFiles = 1;
				addFiles([
					await generateFile('london.png', 1),
					await generateFile('london.png', 1),
				]);
				await elementUpdated(element);

				expect(getErrorMessage(0)).toBe('');
				expect(getErrorMessage(1)).toBe("You can't select any more files.");
			});

			it('should show an custom error message (when supplied) for files added after the maxFiles limit is reached', async function () {
				element.maxFiles = 1;
				element.maxFilesExceededError = 'Max files exceeded.';
				await elementUpdated(element);

				addFiles([
					await generateFile('london.png', 1),
					await generateFile('london.png', 1),
				]);
				await elementUpdated(element);

				expect(getErrorMessage(0)).toBe('');
				expect(getErrorMessage(1)).toBe('Max files exceeded.');

				element.maxFilesExceededError = undefined;
				await elementUpdated(element);

				expect(getErrorMessage(1)).toBe("You can't select any more files.");
			});
		});

		it('should add multiple attribute to the hidden file input when maxFiles is not set', function () {
			expect(hiddenInput.multiple).toBe(true);
		});

		it('should remove multiple attribute from the hidden file input when maxFiles is 1', async function () {
			element.maxFiles = 1;
			await elementUpdated(element);
			expect(hiddenInput.multiple).toBe(false);
		});

		it('should add multiple attribute to the hidden file input when maxFiles is > 1', async function () {
			element.maxFiles = 2;
			await elementUpdated(element);
			expect(hiddenInput.multiple).toBe(true);
		});
	});

	describe('single-file', () => {
		it('should not set multiple on the hidden input attribute', async () => {
			element.singleFile = true;
			await elementUpdated(element);

			expect(hiddenInput.hasAttribute('multiple')).toBe(false);
		});

		it('should only add the last file when uploading multiple files', async () => {
			element.singleFile = true;
			const file1 = await generateFile('london.png', 1, 'image/png');
			const file2 = await generateFile('london2.png', 1, 'image/png');

			addFiles([file1, file2]);

			expect(element.files).toEqual([file2]);
		});

		it('should replace existing file when uploading a new file', async () => {
			element.singleFile = true;
			const file1 = await generateFile('london.png', 1, 'image/png');
			const file2 = await generateFile('london2.png', 1, 'image/png');

			addFiles([file1]);
			addFiles([file2]);

			expect(element.files).toEqual([file2]);
		});
	});

	describe('accept', function () {
		it('should show an error message for files added that do not match the accept attribute', async function () {
			element.accept = 'image/*, text/html, .zip';

			addFiles([
				await generateFile('london.png', 1, 'image/png'),
				await generateFile('london.html', 1, 'text/html'),
				await generateFile('london.zip', 1, 'application/zip'),
				await generateFile('london.txt', 1, 'text/plain'),
			]);
			await elementUpdated(element);

			expect(getErrorMessage(0)).toBe('');
			expect(getErrorMessage(1)).toBe('');
			expect(getErrorMessage(2)).toBe('');
			expect(getErrorMessage(3)).toBe("You can't select files of this type.");
		});

		it('should show an custom error message (when supplied) for files added that do not match the accept attribute', async function () {
			element.accept = 'image/*, text/html, .zip';
			element.invalidFileTypeError = 'File type not allowed.';
			await elementUpdated(element);

			addFiles([
				await generateFile('london.png', 1, 'image/png'),
				await generateFile('london.html', 1, 'text/html'),
				await generateFile('london.zip', 1, 'application/zip'),
				await generateFile('london.txt', 1, 'text/plain'),
			]);
			await elementUpdated(element);

			expect(getErrorMessage(3)).toBe('File type not allowed.');

			element.invalidFileTypeError = undefined;
			await elementUpdated(element);

			expect(getErrorMessage(3)).toBe("You can't select files of this type.");
		});
	});

	describe('size', function () {
		it('should add expanded class to base element if size is set to expanded', async function () {
			element.size = Size.Expanded;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('size-expanded'));
		});
	});

	describe('default slot', function () {
		it('should have a default slot', async () => {
			expect(
				element.shadowRoot?.querySelector('slot:not([name])')
			).toBeTruthy();
		});
	});

	describe('change', function () {
		it('should fire a "change" event after files are added', async () => {
			let filesLengthInChangeHandler = -1;
			const onChange = vi.fn().mockImplementation(() => {
				filesLengthInChangeHandler = element.files.length;
			});
			element.addEventListener('change', onChange);

			addFiles([
				await generateFile('london.png', 1),
				await generateFile('paris.png', 1),
			]);

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(filesLengthInChangeHandler).toBe(2);
		});

		it('should fire "change" event after files are removed', async () => {
			addFiles([await generateFile('london.png', 1)]);
			await elementUpdated(element);
			let filesLengthInChangeHandler = -1;
			const onChange = vi.fn().mockImplementation(() => {
				filesLengthInChangeHandler = element.files.length;
			});
			element.addEventListener('change', onChange);

			getRemoveButton(0).click();

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(filesLengthInChangeHandler).toBe(0);
		});
	});

	describe('files', function () {
		it('should contain added files', async function () {
			const file = await generateFile('london.png', 2);
			addFiles([file]);
			expect(element.files).toEqual([file]);
		});

		it('should exclude files that have not been accepted', async function () {
			element.maxFileSize = 1; // 1 MB
			const acceptableFile = await generateFile('london.png', 1);
			const unacceptableFile = await generateFile('paris.png', 2);
			addFiles([acceptableFile, unacceptableFile]);
			expect(element.files).toEqual([acceptableFile]);
		});

		it('should remove files when clicking remove button', async function () {
			addFiles([await generateFile('london.png', 1)]);
			await elementUpdated(element);

			getRemoveButton(0).click();

			expect(element.files.length).toEqual(0);
		});
	});

	describe('rejectedFiles', function () {
		it('should include files that have been rejected', async function () {
			element.maxFileSize = 1;
			const acceptableFile = await generateFile('london.png', 1);
			const unacceptableFile = await generateFile('paris.png', 2);
			addFiles([acceptableFile, unacceptableFile]);

			expect([element.files, element.rejectedFiles]).toEqual([
				[acceptableFile],
				[unacceptableFile],
			]);
		});

		it('should remove rejectedFiles when clicking remove button', async function () {
			element.maxFileSize = 1;
			addFiles([await generateFile('london.png', 1)]);
			await elementUpdated(element);

			getRemoveButton(0).click();

			expect(element.rejectedFiles.length).toEqual(0);
		});
	});

	describe('removeAllFiles()', function () {
		it('should remove all files', async function () {
			element.maxFileSize = 1;

			addFiles([
				await generateFile('london.png', 1),
				await generateFile('london.png', 1),
				await generateFile('london.png', 2),
			]);

			expect([
				element.files.length,
				element.rejectedFiles.length,
			]).toStrictEqual([2, 1]);
			element.removeAllFiles();
			expect([
				element.files.length,
				element.rejectedFiles.length,
			]).toStrictEqual([0, 0]);
		});
	});

	describe.each([
		{
			lang: 'en-US',
			locale: enUS,
			localizedErrorMessage: 'File is too big (2.5MiB). Max filesize: 1.5MiB.',
			localizedFileSize: /0\.1\s+MB/,
		},
		{
			lang: 'de-DE',
			locale: deDE,
			localizedErrorMessage:
				'Die Datei ist zu groß (2,5MiB). Maximale Dateigröße: 1,5MiB.',
			localizedFileSize: /0,1\s+MB/,
		},
	])(
		'localized error messages for $lang',
		function ({ locale, localizedErrorMessage, localizedFileSize }) {
			beforeEach(async () => {
				element.remove();
				setLocale(locale);
				setupFixture(
					`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
				);
			});

			it('should localize error message for oversize file', async function () {
				element.maxFileSize = 1.5;
				const file = await generateFile('london.png', 2.5);
				addFiles([file]);
				await elementUpdated(element);

				expect(getErrorMessage(0)).toBe(localizedErrorMessage);
			});

			it('should localize displayed file size', async function () {
				const file = await generateFile('london.png', 0.1);
				addFiles([file]);
				await elementUpdated(element);

				expect(element.shadowRoot!.querySelector('.size')!.textContent).toMatch(
					localizedFileSize
				);
			});
		}
	);

	describe('adding files', () => {
		it('should open file picker dialog when clicking on the control element', async () => {
			const clickSpy = vi.spyOn(hiddenInput, 'click');

			await userEvent.click(getControlElement(element));

			expect(clickSpy).toHaveBeenCalled();
		});

		it('should add files selected in the file picker dialog', async () => {
			Object.defineProperty(hiddenInput, 'files', {
				value: [await generateFile('london.png', 1)],
				configurable: true,
			});
			hiddenInput.dispatchEvent(
				new Event('change', { bubbles: true, composed: true, cancelable: true })
			);

			expect(element.files.length).toBe(1);
		});

		it('should add files dropped into the control', async () => {
			const file = await generateFile('london.png', 1);
			const dataTransfer = new DataTransfer();
			Object.defineProperty(dataTransfer, 'files', {
				value: [file],
				configurable: true,
			});

			const dropEvent = new DragEvent('drop', {
				bubbles: true,
				cancelable: true,
				dataTransfer,
			});

			getControlElement(element).dispatchEvent(dropEvent);
			await elementUpdated(element);

			expect(element.files).toEqual([file]);
		});

		it('should log errors occurring while reading files from the drop data transfer', async () => {
			const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
				/* ignore */
			});
			const error = new DOMException('Dir read error');

			getControlElement(element).dispatchEvent(
				new DragEvent('drop', {
					bubbles: true,
					cancelable: true,
					dataTransfer: mockTransfer([
						simulateDirReadError(mockDir('a', []), error),
					]),
				})
			);
			await sleep(1); // Wait for the async file reading to complete

			expect(errorSpy).toHaveBeenCalledWith(error);
			expect(element.files).toEqual([]);
		});
	});

	describe('feedback messages', () => {
		itShouldDisplayHelperTextFeedback(() => element);
		itShouldDisplayErrorTextFeedback(() => element);
		itShouldDisplayValidationErrorFeedback(() => element);
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getControlElement(element),
			allAriaPropertiesExcept([])
		);
	});
});

describe('form associated vwc-file-picker', function () {
	let formWrapper: HTMLDivElement;

	function getHiddenInput(element: FilePicker) {
		return element.shadowRoot!.querySelector(
			'input[type=file]'
		) as HTMLInputElement;
	}

	function addFiles(element: FilePicker, files: File[]) {
		const hiddenInput = getHiddenInput(element);
		Object.defineProperty(hiddenInput, 'files', {
			value: files,
			configurable: true,
		});
		hiddenInput.dispatchEvent(new Event('change'));
	}

	beforeEach(function () {
		formWrapper = document.createElement('div');
		document.body.appendChild(formWrapper);
	});

	afterEach(function () {
		formWrapper.remove();
	});

	function getFormAssociatedErrorMessage(element: FilePicker) {
		return element.shadowRoot
			?.querySelector('vwc-feedback-message')
			?.textContent?.trim();
	}

	it('should show custom error message when files are rejected', async () => {
		const {
			form: formElement,
			element,
			button,
		} = createFormHTML<FilePicker>({
			formId: 'form-id',
			fieldName: 'file',
			componentTagName: COMPONENT_TAG,
			formWrapper,
		});
		element.accept = '.txt';
		element.maxFileSize = 1;

		const submitHandler = vi.fn();
		formElement.addEventListener('submit', submitHandler);

		// Try to add a PDF file (wrong type)
		addFiles(element, [await generateFile('test.pdf', 0.5, 'application/pdf')]);
		await elementUpdated(element);
		// simulate form submission
		await userEvent.click(button as Element);
		await elementUpdated(element);

		expect(getFormAssociatedErrorMessage(element)).toBe(
			'One or more selected files are invalid. Please, upload only valid file types under the size limit.'
		);
		expect(submitHandler).toHaveBeenCalledTimes(0);

		// Try to add a file that's too big
		const bigFile = await generateFile('test.txt', 2);
		addFiles(element, [bigFile]);
		await elementUpdated(element);
		await userEvent.click(button as Element);
		await elementUpdated(element);

		expect(getFormAssociatedErrorMessage(element)).toBe(
			'One or more selected files are invalid. Please, upload only valid file types under the size limit.'
		);
		expect(submitHandler).toHaveBeenCalledTimes(0);

		element.removeAllFiles();

		// Add a valid file
		const validFile = await generateFile('valid.txt', 0.5);
		addFiles(element, [validFile]);
		await elementUpdated(element);
		await userEvent.click(button as Element);
		await elementUpdated(element);

		// Check that validation message is cleared
		expect(getFormAssociatedErrorMessage(element)).toBe('');
		expect(submitHandler).toHaveBeenCalledTimes(1);
	});

	it('should reset the value and all files when the form is reset', async function () {
		const { form: formElement, element } = createFormHTML<FilePicker>({
			fieldName: 'file',
			formId: 'form-id',
			componentTagName: COMPONENT_TAG,
			formWrapper,
		});
		element.maxFileSize = 1;

		addFiles(element, [
			await generateFile('london-1.png', 1),
			await generateFile('london-2.png', 2),
		]);
		await elementUpdated(element);

		const valueBeforeReset = element.value;
		const numValidFilesBeforeReset = element.files.length;
		const numInvalidFilesBeforeReset = element.rejectedFiles.length;

		formElement.reset();

		expect(valueBeforeReset).toStrictEqual('C:\\fakepath\\london-1.png');
		expect([
			numValidFilesBeforeReset,
			numInvalidFilesBeforeReset,
		]).toStrictEqual([1, 1]);
		expect(element.value).toBe('');
		expect([element.files.length, element.rejectedFiles.length]).toStrictEqual([
			0, 0,
		]);
	});

	it('should update the form value when name attribute is added', async function () {
		const { form: formElement, element } = createFormHTML<FilePicker>({
			formId: 'form-id',
			componentTagName: COMPONENT_TAG,
			formWrapper,
		});
		addFiles(element, [await generateFile('london.png', 1)]);

		element.name = 'file';

		expect(new FormData(formElement).get('file')).toBeTruthy();
	});
});
