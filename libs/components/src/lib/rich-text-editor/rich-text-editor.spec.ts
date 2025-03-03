import { elementUpdated, fixture } from '@vivid-nx/shared';
import { RichTextEditor } from './rich-text-editor';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('vwc-rich-text-editor', () => {
	function getOutputElement(): HTMLElement {
		return element.shadowRoot!.querySelector('#editor') as HTMLElement;
	}

	let element: RichTextEditor;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as RichTextEditor;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-rich-text-editor', async () => {
			expect(element).toBeInstanceOf(RichTextEditor);
		});

		it('should allow being created via createElement', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('value', () => {
		function userInput(value: string) {
			getOutputElement().innerHTML = value;
			getOutputElement().dispatchEvent(new Event('input'));
		}

		it('should init as empty string', async () => {
			expect(element.value).toBe('');
		});

		it('should display HTML inside the editor', async () => {
			const value = '<b>bold</b>';
			element.value = value;
			await elementUpdated(element);
			expect(getOutputElement().innerHTML).toBe(value);
		});

		it('should return the HTML inside the editor if changed', async () => {
			const value = '<b>bold</b>';
			userInput(value);

			await elementUpdated(element);
			expect(element.value).toBe(value);
		});

		it('should reflect the attribute value', async () => {
			element.setAttribute('value', '<b>bold</b>');
			await elementUpdated(element);
			expect(getOutputElement().innerHTML).toBe('<b>bold</b>');
		});
	});
});
