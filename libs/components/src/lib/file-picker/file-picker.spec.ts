import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { FilePicker } from './file-picker';
import { filePickerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-file-picker';

describe('vwc-file-picker', () => {
	let element: FilePicker;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as FilePicker;
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
			expect(element?.filePicker.options.maxFiles).toEqual(maxFiles);
		});
	});

	describe('max file size', function () {
		it('should set maxFileSize if it is set', async function () {
			const maxFileSize = 0.1;
			element.maxFileSize = maxFileSize;
			await elementUpdated(element);
			expect(element?.filePicker.options.maxFilesize).toEqual(maxFileSize);
		});
	});

	describe('upload multiple', function () {
		it('should set uploadMultiple if it is set', async function () {
			const uploadMultiple = true;
			element.uploadMultiple = uploadMultiple;
			await elementUpdated(element);
			expect(element?.filePicker.options.uploadMultiple).toEqual(uploadMultiple);
		});
	});

	describe('accepted files', function () {
		it('should set acceptedFiles if it is set', async function () {
			const acceptedFiles = '.jpg';
			element.acceptedFiles = acceptedFiles;
			await elementUpdated(element);
			expect(element?.filePicker.options.acceptedFiles).toEqual(acceptedFiles);
		});
	});
});
