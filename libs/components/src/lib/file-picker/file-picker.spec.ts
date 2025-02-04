import {
	axe,
	createFormHTML,
	elementUpdated,
	fixture,
	getBaseElement,
	getControlElement,
} from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { Size } from '../enums';
import { setLocale } from '../../shared/localization';
import deDE from '../../locales/de-DE';
import enUS from '../../locales/en-US';
import { FilePicker } from './file-picker';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

async function generateFile(
	fileName: string,
	sizeMb: number,
	type = 'text/plain'
): Promise<File> {
	const blob = new Blob(['x'.repeat(sizeMb * 1024 * 1024)], { type });
	return new File([blob], fileName, { type: blob.type });
}

function getHiddenInput() {
	return document.querySelector('input[type=file]') as HTMLInputElement;
}

function addFiles(files: File[]) {
	// Use hidden input element that dropzone adds to the body to add files
	const hiddenInput = getHiddenInput();
	Object.defineProperty(hiddenInput, 'files', {
		value: files,
	});
	hiddenInput.dispatchEvent(new Event('change'));
}

describe('vwc-file-picker', () => {
	let element: FilePicker;

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
		) as FilePicker;
	});

	afterEach(() => {
		element.remove();
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
			expect(element.files).toEqual([]);
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

			expect(unmountedElement.files).toEqual([]);
			expect(() => {
				document.body.appendChild(unmountedElement);
				document.body.removeChild(unmountedElement);
			}).not.toThrow();
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

		it('should set aria-label on base element if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label')).toEqual(
				labelText
			);
		});
	});

	describe('value', function () {
		it('should be set to a fake path when a file is added', async function () {
			addFiles([await generateFile('london.png', 1)]);
			expect(element.value).toBe('C:\\fakepath\\london.png');
		});

		it('should remove all files when setting value to an empty string', async function () {
			addFiles([
				await generateFile('london.png', 1),
				await generateFile('london.png', 1),
			]);

			element.value = '';

			expect(element.files.length).toBe(0);
		});
	});

	describe('max file size', function () {
		it('should show an error message for files larger than maxFileSize', async function () {
			element.maxFileSize = 1; // 1 MB
			const file = await generateFile('london.png', 2);
			addFiles([file]);

			expect(getErrorMessage(0)).toBe(
				'File is too big (2MiB). Max filesize: 1MiB.'
			);
		});

		it('should show a custom error message (when supplied) for files larger than maxFileSize', async function () {
			element.maxFileSize = 1; // 1 MB
			element.fileTooBigError =
				'File size of {{filesize}}MB is too big. Limit is {{maxFilesize}}MB.';
			const file = await generateFile('london.png', 2);
			addFiles([file]);

			expect(getErrorMessage(0)).toBe(
				'File size of 2MB is too big. Limit is 1MB.'
			);
		});

		it('should revert back to the standard message when the custom message is removed', async function () {
			element.maxFileSize = 1; // 1 MB
			element.fileTooBigError =
				'File size of {{filesize}}MB is too big. Limit is {{maxFilesize}}MB.';
			const file = await generateFile('london.png', 2);
			addFiles([file]);

			expect(getErrorMessage(0)).toBe(
				'File size of 2MB is too big. Limit is 1MB.'
			);
			element.fileTooBigError = undefined;
			element.removeAllFiles();
			await elementUpdated(element);

			addFiles([file]);

			await elementUpdated(element);

			expect(getErrorMessage(0)).toBe(
				'File is too big (2MiB). Max filesize: 1MiB.'
			);
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

				expect(getErrorMessage(0)).toBe('');
				expect(getErrorMessage(1)).toBe('Max files exceeded.');
			});

			it('should show an custom error message (when supplied) for files added after the maxFiles limit is reached', async function () {
				element.maxFiles = 1;
				element.maxFilesExceededError = 'Max files exceeded.';
				await elementUpdated(element);

				addFiles([
					await generateFile('london.png', 1),
					await generateFile('london.png', 1),
				]);

				expect(getErrorMessage(0)).toBe('');
				expect(getErrorMessage(1)).toBe('Max files exceeded.');
			});

			it('should revert back to the standard message when the custom message is removed', async function () {
				element.maxFiles = 1;
				element.maxFilesExceededError = 'Max files exceeded.';
				await elementUpdated(element);

				addFiles([
					await generateFile('london.png', 1),
					await generateFile('london.png', 1),
				]);

				expect(getErrorMessage(1)).toBe('Max files exceeded.');

				element.maxFilesExceededError = undefined;
				element.removeAllFiles();

				await elementUpdated(element);

				addFiles([
					await generateFile('london.png', 1),
					await generateFile('london.png', 1),
				]);

				expect(getErrorMessage(1)).toBe("You can't select any more files.");
			});
		});

		it('should add multiple attribute to the hidden file input when maxFiles is not set', function () {
			expect(getHiddenInput().multiple).toBe(true);
		});

		it('should remove multiple attribute from the hidden file input when maxFiles is 1', async function () {
			element.maxFiles = 1;
			expect(getHiddenInput().multiple).toBe(false);
		});

		it('should add multiple attribute to the hidden file input when maxFiles is > 1', async function () {
			element.maxFiles = 2;
			expect(getHiddenInput().multiple).toBe(true);
		});
	});

	describe('single-file', () => {
		beforeEach(async () => {
			element.singleFile = true;
			await elementUpdated(element);
		});

		it('should initiate in single file mode', async () => {
			element = fixture(
				`<${COMPONENT_TAG} single-file>Drag & drop or click to upload</${COMPONENT_TAG}>`
			) as FilePicker;

			await elementUpdated(element);

			expect(element.singleFile).toBe(true);
			expect(getHiddenInput().hasAttribute('multiple')).toBe(false);
		});

		it('should reflect the attribute single-file', async () => {
			expect(element.hasAttribute('single-file')).toBe(true);
		});

		it('should reflect the property to an attribute', async () => {
			element.singleFile = false;
			await elementUpdated(element);

			element.toggleAttribute('single-file');
			await elementUpdated(element);

			expect(element.singleFile).toBe(true);
		});

		it('should remove the hidden input multiple attribute when true', async () => {
			expect(getHiddenInput()?.hasAttribute('multiple')).toBe(false);
		});

		it('should add the hidden input multiple attribute when false', async () => {
			element.singleFile = false;
			await elementUpdated(element);
			expect(getHiddenInput()?.getAttribute('multiple')).toBe('multiple');
		});

		it('should remove after change event', async () => {
			addFiles([await generateFile('london.png', 1)]);

			getHiddenInput().dispatchEvent(new Event('change'));
			await elementUpdated(element);
			expect(getHiddenInput()?.hasAttribute('multiple')).toBe(false);
		});

		it('should add a file to the list when uploading a file for the first time', async () => {
			const file = await generateFile('london.png', 1, 'image/png');
			addFiles([file]);
			expect(element.files).toEqual([file]);
		});

		it('should replace existing file in the list when uploading a new file', async () => {
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

			expect(getErrorMessage(0)).toBe('');
			expect(getErrorMessage(1)).toBe('');
			expect(getErrorMessage(2)).toBe('');
			expect(getErrorMessage(3)).toBe("You can't select files of this type.");
		});

		it('should display message from error property if error message is an object', async () => {
			element.accept = 'image/*, text/html, .zip';
			(element.invalidFileTypeError as any) = {
				error: 'error from object',
			};

			await elementUpdated(element);

			addFiles([
				await generateFile('london.png', 1, 'image/png'),
				await generateFile('london.html', 1, 'text/html'),
				await generateFile('london.zip', 1, 'application/zip'),
				await generateFile('london.txt', 1, 'text/plain'),
			]);

			expect(getErrorMessage(3)).toBe('error from object');
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

			expect(getErrorMessage(3)).toBe('File type not allowed.');
		});

		it('should revert back to the standard message when the custom message is removed', async function () {
			element.accept = 'image/*, text/html, .zip';
			element.invalidFileTypeError = 'File type not allowed.';
			await elementUpdated(element);

			addFiles([
				await generateFile('london.png', 1, 'image/png'),
				await generateFile('london.html', 1, 'text/html'),
				await generateFile('london.zip', 1, 'application/zip'),
				await generateFile('london.txt', 1, 'text/plain'),
			]);

			expect(getErrorMessage(3)).toBe('File type not allowed.');

			element.invalidFileTypeError = undefined;
			element.removeAllFiles();
			await elementUpdated(element);

			addFiles([
				await generateFile('london.png', 1, 'image/png'),
				await generateFile('london.html', 1, 'text/html'),
				await generateFile('london.zip', 1, 'application/zip'),
				await generateFile('london.txt', 1, 'text/plain'),
			]);

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
		it('should fire "change" event after a file is added', async () => {
			let filesLengthInChangeHandler = -1;
			const onChange = vi.fn().mockImplementation(() => {
				filesLengthInChangeHandler = element.files.length;
			});
			element.addEventListener('change', onChange);

			addFiles([await generateFile('london.png', 1)]);

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(filesLengthInChangeHandler).toBe(1);
		});

		it('should fire "change" event after a file is removed', async () => {
			addFiles([await generateFile('london.png', 1)]);
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

			getRemoveButton(0).click();

			expect(element.files.length).toEqual(0);
		});
	});

	describe('removeAllFiles()', function () {
		it('should remove all files', async function () {
			addFiles([
				await generateFile('london.png', 1),
				await generateFile('london.png', 1),
			]);
			element.removeAllFiles();
			expect(element.files.length).toEqual(0);
		});
	});

	describe('choose file with keyboard', function () {
		it.each([
			['Space', ' '],
			['Enter', 'Enter'],
		])(
			'should click on the hidden file input when pressing %s key',
			async function (_, key) {
				const hiddenInputClick = vi.fn();
				const hiddenInput = getHiddenInput();
				hiddenInput.click = hiddenInputClick;

				element.focus();
				getControlElement(element).dispatchEvent(
					new KeyboardEvent('keydown', { key })
				);

				expect(hiddenInputClick).toHaveBeenCalledTimes(1);
			}
		);
	});

	describe.each([
		{
			lang: 'en-US',
			locale: enUS,
			localizedErrorMessage: 'File is too big (2.5MiB). Max filesize: 1.5MiB.',
			localizedFileSize: '0.1 MB',
		},
		{
			lang: 'de-DE',
			locale: deDE,
			localizedErrorMessage:
				'Die Datei ist zu groß (2,5MiB). Maximale Dateigröße: 1,5MiB.',
			localizedFileSize: '0,1 MB',
		},
	])(
		'localized error messages for $lang',
		function ({ locale, localizedErrorMessage, localizedFileSize }) {
			beforeEach(async () => {
				element.remove();
				setLocale(locale);
				element = fixture(
					`<${COMPONENT_TAG}>Drag & drop or click to upload</${COMPONENT_TAG}>`
				) as FilePicker;
			});

			it('should localize error message for oversize file', async function () {
				element.maxFileSize = 1.5;
				const file = await generateFile('london.png', 2.5);
				addFiles([file]);

				expect(getErrorMessage(0)).toBe(localizedErrorMessage);
			});

			it('should localize displayed file size', async function () {
				const file = await generateFile('london.png', 0.1);
				addFiles([file]);

				expect(
					element.shadowRoot!.querySelector('[data-dz-size]')!.textContent
				).toBe(localizedFileSize);
			});
		}
	);

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.label = 'Test label';
			element.helperText = 'Helper text';
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});

	function getErrorMessage(forFileAtIndex: number) {
		return element.shadowRoot
			?.querySelectorAll('.preview-list .dz-error-message')
			[forFileAtIndex]?.textContent?.trim();
	}

	function getRemoveButton(forFileAtIndex: number) {
		return element.shadowRoot?.querySelectorAll('.preview-list .remove-btn')[
			forFileAtIndex
		] as Button;
	}
});

describe('form associated vwc-file-picker', function () {
	let formWrapper: HTMLDivElement;

	beforeEach(function () {
		formWrapper = document.createElement('div');
		document.body.appendChild(formWrapper);
	});

	afterEach(function () {
		formWrapper.remove();
	});

	it('should reset the value and files when the form is reset', async function () {
		const { form: formElement, element } = createFormHTML<FilePicker>({
			fieldName: 'file',
			formId: 'form-id',
			componentTagName: COMPONENT_TAG,
			formWrapper,
		});

		addFiles([await generateFile('london.png', 1)]);
		const valueBeforeReset = element.value;
		const numFilesBeforeReset = element.files.length;

		formElement.reset();

		expect(valueBeforeReset).toBe('C:\\fakepath\\london.png');
		expect(numFilesBeforeReset).toBeGreaterThan(0);
		expect(element.value).toBe('');
		expect(element.files.length).toBe(0);
	});

	it('should update the form value when name attribute is added', async function () {
		const { form: formElement, element } = createFormHTML<FilePicker>({
			formId: 'form-id',
			componentTagName: COMPONENT_TAG,
			formWrapper,
		});
		addFiles([await generateFile('london.png', 1)]);

		element.name = 'file';

		expect(new FormData(formElement).get('file')).toBeTruthy();
	});
});
