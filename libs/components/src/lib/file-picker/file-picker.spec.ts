import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import Dropzone from 'dropzone';
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
			expect(element.maxFiles).toBeUndefined();
			expect(element.maxFileSize).toEqual(256);
			expect(element.uploadMultiple).toEqual(false);
			expect(element.acceptedFiles).toBeUndefined();
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

		it('should set arialabel on host', async function () {
			const labelText = 'label';
			element.label = labelText;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label'))
				.toEqual(labelText);
		});

		it('should set ariaLabel and override label', async function () {
			const ariaLabel = 'arialabel';
			const label = 'label';
			element.ariaLabel = ariaLabel;
			element.label = label;
			await elementUpdated(element);
			expect(getBaseElement(element).getAttribute('aria-label'))
				.toEqual(ariaLabel);
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

	describe('max files', function () {
		it('should set maxFiles if it is set', async function () {
			const maxFiles = 2;
			element.maxFiles = maxFiles;
			await elementUpdated(element);
			expect(element.options.maxFiles).toEqual(maxFiles);
		});

		it('should upload two files when maxFiles is set to 2', async function () {
			const maxFiles = 2;
			element.maxFiles = maxFiles;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);

			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);

			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(2);
		});

		it('should upload only one file when maxFiles is set to 1', async function () {
			const maxFiles = 1;
			element.maxFiles = maxFiles;
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);

			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);

			await elementUpdated(element);
			expect(element.files.length).toEqual(2);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});
	});

	describe('max file size', function () {
		it('should set maxFileSize if it is set', async function () {
			const maxFileSize = 0.1;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);
			expect(element.options.maxFilesize).toEqual(maxFileSize);
		});

		it('should upload file with size 0.1 when max file size is set to 0.2', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 0.1);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});

		it('should not upload file with size 2 when max file size is set to 0.2', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(0);
		});
	});

	describe('preview classes', function () {
		it('should have dz-error class and status when files not added', async function () {
			const maxFileSize = 0.2;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);

			const preview = element.shadowRoot?.querySelector('.dz-preview') as HTMLElement;
			expect(preview.classList).toContain('dz-error');

			expect(element.getFilesWithStatus(Dropzone.ERROR).length).toEqual(1);
		});

		it('should have canceled status when cancel file', async function () {
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);
			element.cancelUpload(file);

			await elementUpdated(element);

			expect(element.getFilesWithStatus(Dropzone.CANCELED).length).toEqual(1);
		});
	});

	describe('upload multiple', function () {
		it('should set uploadMultiple if it is set', async function () {
			const uploadMultiple = true;
			element.uploadMultiple = uploadMultiple;
			await elementUpdated(element);
			expect(element.options.uploadMultiple).toEqual(uploadMultiple);
		});
	});

	describe('accepted files', function () {
		it('should set acceptedFiles if it is set', async function () {
			const acceptedFiles = '.jpg';
			element.acceptedFiles = acceptedFiles;
			await elementUpdated(element);
			expect(element.options.acceptedFiles).toEqual(acceptedFiles);
		});

		it('should add png file when acceptedFiles is null', async function () {
			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).toEqual(1);
		});

		it('should not add png file when acceptedFiles is set to .jpg', async function () {
			const acceptedFiles = '.jpg';
			element.acceptedFiles = acceptedFiles;
			await elementUpdated(element);

			const file = await generateFile('london.png', 2);
			element.addFile(file);

			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
			expect(element.getAcceptedFiles().length).not.toEqual(1);
		});

		it('should have 1 files after adding 2 files and calling removeFile', async function () {
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);

			element.removeFile(firstFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(1);
		});

		it('should have 0 files after adding 2 files and calling removeAllFiles', async function () {
			await elementUpdated(element);

			const firstFile = await generateFile('london.png', 2);
			element.addFile(firstFile);
			const secondFile = await generateFile('paris.png', 2);
			element.addFile(secondFile);
			await elementUpdated(element);
			expect(element.files.length).toEqual(2);

			element.removeAllFiles();
			await elementUpdated(element);
			expect(element.files.length).toEqual(0);
		});
	});

	async function generateFile(fileName: string, size: number): Promise<File> {
		const blob = new Blob(['x'.repeat(size * 1024 * 1024)], { type: 'text/plain' });
		return new File([blob], fileName, { type: blob.type });
	}
});