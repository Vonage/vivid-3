import { elementUpdated, fixture } from '@repo/shared';
import { ImagePlaceholder } from './image-placeholder';
import '.';

const COMPONENT_TAG = 'vwc-text-editor-image-placeholder';

describe('menuBar', () => {
	let element: ImagePlaceholder;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as unknown as ImagePlaceholder;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-placeholder', async () => {
			expect(element).toBeInstanceOf(ImagePlaceholder);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('icon', () => {
		it('should have "clear-file-solid" icon as default', async () => {
			const icon = element.shadowRoot?.querySelector('.icon vwc-icon');
			expect(icon?.getAttribute('name')).toBe('clear-file-solid');
		});

		it('should set the icon name according to icon property', async () => {
			element.icon = 'png';
			await elementUpdated(element);
			const icon = element.shadowRoot?.querySelector('.icon vwc-icon');
			expect(icon?.getAttribute('name')).toBe('file-png-solid');
		});

		it('should reflect the icon property from the attribute', async () => {
			element.setAttribute('icon', 'jpg');
			await elementUpdated(element);
			expect(element.icon).toBe('jpg');
		});
	});

	describe('fileName', () => {
		it('should reflect the file name from the attribute', async () => {
			element.setAttribute('file-name', 'test.pdf');
			await elementUpdated(element);
			expect(element.fileName).toBe('test.pdf');
		});

		it('should reflect the file name from the property', async () => {
			element.fileName = 'test.pdf';
			await elementUpdated(element);
			expect(element.getAttribute('file-name')).toBe('test.pdf');
		});

		it('should display the file name in the template', async () => {
			element.fileName = 'test.pdf';
			await elementUpdated(element);
			const fileNameElement = element.shadowRoot?.querySelector(
				'.name'
			);
			expect(fileNameElement?.textContent).toBe('test');
		});

		it('should display the file suffix in the template', async () => {
			element.fileName = 'test.pdf';
			await elementUpdated(element);
			const fileSuffixElement = element.shadowRoot?.querySelector(
				'.suffix'
			);
			expect(fileSuffixElement?.textContent).toBe('pdf');
		});
	});

	describe('errorMessage', () => {
		it('should reflect the error message from the attribute', async () => {
			element.setAttribute('error-message', 'Failed to attach');
			await elementUpdated(element);
			expect(element.errorMessage).toBe('Failed to attach');
		});

		it('should reflect the error message from the property', async () => {
			element.errorMessage = 'Failed to attach';
			await elementUpdated(element);
			expect(element.getAttribute('error-message')).toBe('Failed to attach');
		});

		it('should display the error message in the template', async () => {
			element.errorMessage = 'File too large';
			await elementUpdated(element);
			const errorTextElement = element.shadowRoot?.querySelector(
				'.error-text'
			);
			expect(errorTextElement?.textContent).toBe(element.errorMessage);
		});

		it('should remove error element when errorMessage is undefined', async () => {
			element.errorMessage = undefined;
			await elementUpdated(element);
			const errorMessageElement = element.shadowRoot?.querySelector('.error');
			expect(errorMessageElement).toBeNull();
		});
	});
});
