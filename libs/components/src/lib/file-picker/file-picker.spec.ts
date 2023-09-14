import { elementUpdated, fixture, getBaseElement, getControlElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import type { Button } from '../button/button';
import { Size } from '../enums';
import { FilePicker } from './file-picker';
import { filePickerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

describe('vwc-file-picker', () => {
	let element: FilePicker;

	beforeEach(async () => {
		element = fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		) as FilePicker;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-file-picker', async () => {
			expect(filePickerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(FilePicker);
			expect(element.label).toBeUndefined();
			expect(element.helperText).toBeUndefined();
			expect(element.size).toBeUndefined();
			expect(element.maxFileSize).toEqual(256);
			expect(element.maxFiles).toBeUndefined();
			expect(element.accept).toBeUndefined();
			expect(element.files).toEqual([]);
		});

		it('should allow accessing the component in unmounted state and mounting later without error', async () => {
			const unmountedElement = document.createElement(COMPONENT_TAG) as FilePicker;
			unmountedElement.maxFileSize = 256;
			unmountedElement.maxFiles = 1;
			unmountedElement.accept = '.jpg';

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
			expect(labelElement?.textContent?.trim())
				.toEqual(labelText);
		});

		it('should show label element only if label is set', async function () {
			const labelElement = element.shadowRoot?.querySelector('label');
			expect(labelElement)
				.toBeNull();
		});

		it('should set aria-label on base element if label is set', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label'))
				.toEqual(labelText);
		});
	});

	describe('helper text', function () {
		it('should render the helper text when attribute is set on file picker', async function () {
			const helperTextElementWithoutText = element.shadowRoot?.querySelector('.helper-text');
			const helperText = 'Helper Text';
			element.helperText = helperText;
			await elementUpdated(element);
			expect(helperTextElementWithoutText)
				.toBeNull();
			expect(element.shadowRoot?.querySelector('.helper-message')
				?.textContent
				?.trim())
				.toEqual(helperText);
		});
	});

	describe('max file size', function () {
		it('should show an error message for files larger than maxFileSize', async function() {
			element.maxFileSize = 1; // 1 MB
			const file = await generateFile('london.png', 2);
			addFiles([file]);

			expect(getErrorMessage(0)).toBe('File is too big (2MiB). Max filesize: 1MiB.');
		});
	});

	describe('max files', function () {
		it('should show an error message for files added after the maxFiles limit is reached', async function() {
			element.maxFiles = 1;
			addFiles([
				await generateFile('london.png', 1),
				await generateFile('london.png', 1),
			]);

			expect(getErrorMessage(0)).toBe('');
			expect(getErrorMessage(1)).toBe('You can not select any more files.');
		});

		it('should add multiple attribute to the hidden file input when maxFiles is not set', function() {
			expect(getHiddenInput().multiple).toBe(true);
		});

		it('should remove multiple attribute from the hidden file input when maxFiles is 1', async function() {
			element.maxFiles = 1;
			expect(getHiddenInput().multiple).toBe(false);
		});

		it('should add multiple attribute to the hidden file input when maxFiles is > 1', async function() {
			element.maxFiles = 2;
			expect(getHiddenInput().multiple).toBe(true);
		});
	});

	describe('accept', function () {
		it('should show an error message for files added that do not match the accept attribute', async function() {
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
			expect(getErrorMessage(3)).toBe('You can\'t select files of this type.');
		});
	});

	describe('size', function () {
		it('should add expanded class to base element if size is set to expanded', async function() {
			element.size = Size.Expanded;
			await elementUpdated(element);
			expect(getControlElement(element).classList.contains('size-expanded'));
		});
	});

	describe('default slot', function () {
		it('should have a default slot', async () => {
			expect(element.shadowRoot?.querySelector('slot:not([name])')).toBeTruthy();
		});
	});

	describe('change', function () {
		it('should fire "change" event after a file is added', async () => {
			let filesLengthInChangeHandler = -1;
			const onChange = jest.fn().mockImplementation(() => {
				filesLengthInChangeHandler = element.files.length;
			});
			element.addEventListener('change', onChange);

			addFiles([await generateFile('london.png', 1)]);
			await nextTick();

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(filesLengthInChangeHandler).toBe(1);
		});

		it('should fire "change" event after a file is removed', async () => {
			addFiles([await generateFile('london.png', 1)]);
			await nextTick();
			let filesLengthInChangeHandler = -1;
			const onChange = jest.fn().mockImplementation(() => {
				filesLengthInChangeHandler = element.files.length;
			});
			element.addEventListener('change', onChange);

			getRemoveButton(0).click();
			await nextTick();

			expect(onChange).toHaveBeenCalledTimes(1);
			expect(filesLengthInChangeHandler).toBe(0);
		});
	});

	describe('files property', function () {
		it('should contain added files', async function() {
			const file = await generateFile('london.png', 2);
			addFiles([file]);
			expect(element.files).toEqual([file]);
		});

		it('should exclude files that have not been accepted', async function() {
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

	describe('choose file with keyboard', function () {
		it.each([
			['Space', ' '],
			['Enter', 'Enter'],
		])('should click on the hidden file input when pressing %s key', async function (_, key) {
			const hiddenInputClick = jest.fn();
			const hiddenInput = getHiddenInput();
			hiddenInput.click = hiddenInputClick;

			element.focus();
			getControlElement(element).dispatchEvent(new KeyboardEvent('keydown', { key }));

			expect(hiddenInputClick).toHaveBeenCalledTimes(1);
		});
	});

	async function generateFile(fileName: string, sizeMb: number, type = 'text/plain'): Promise<File> {
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
			value: files
		});
		hiddenInput.dispatchEvent(new Event('change'));
	}

	function getErrorMessage(forFileAtIndex: number) {
		return element.shadowRoot?.querySelectorAll('.preview-list .dz-error-message')[forFileAtIndex]?.textContent?.trim();
	}

	function getRemoveButton(forFileAtIndex: number) {
		return element.shadowRoot?.querySelectorAll('.preview-list .remove-btn')[forFileAtIndex] as Button;
	}
});
