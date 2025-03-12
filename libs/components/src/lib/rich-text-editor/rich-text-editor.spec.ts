import type { MockInstance } from 'vitest';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { ProseMirrorFacade as EditorFacade } from './facades/vivid-prose-mirror.facade';
import {
	RichTextEditor,
	type RichTextEditorSelection,
} from './rich-text-editor';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('vwc-rich-text-editor', () => {
	function getOutputElement(): HTMLElement {
		return element.shadowRoot!.querySelector(
			'[contenteditable="true"]'
		) as HTMLElement;
	}

	function moveMarkerToPosition(position: number) {
		element.selectionStart = position;
		element.selectionEnd = position;
	}

	function selectInEditor(selectionStart: number, selectionEnd: number) {
		element.selectionStart = selectionStart;
		element.selectionEnd = selectionEnd;
	}

	let editorFacadeSelectSpy: MockInstance<
		(position?: RichTextEditorSelection) => RichTextEditorSelection
	>;
	let element: RichTextEditor;

	beforeEach(async () => {
		editorFacadeSelectSpy = vi.spyOn(EditorFacade.prototype, 'selection');

		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as unknown as RichTextEditor;

		editorFacadeSelectSpy.mockReset();
	});

	afterEach(() => {
		editorFacadeSelectSpy.mockRestore();
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
			getOutputElement().dispatchEvent(new Event('input', { bubbles: true }));
		}

		it('should init as empty string', async () => {
			expect(element.value).toBe('');
		});

		it('should display HTML inside the editor', async () => {
			const value = '<b>bold</b>';
			element.value = value;
			await elementUpdated(element);
			expect(getOutputElement().innerHTML).toBe('<p><strong>bold</strong></p>');
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
			expect(getOutputElement().innerHTML).toBe('<p><strong>bold</strong></p>');
		});
	});

	describe('selectionStart', () => {
		it('should default to null', async () => {
			expect(element.selectionStart).toBeNull();
		});

		it('should reflect in the selection-start attribute', async () => {
			element.selectionStart = 5;
			await elementUpdated(element);
			expect(element.getAttribute('selection-start')).toEqual('5');
		});

		it('should reflect the attribute in the property', async () => {
			element.setAttribute('selection-start', '10');
			await elementUpdated(element);
			expect(element.selectionStart).toEqual(10);
		});

		it('should return null when given a non number value', async () => {
			(element.selectionStart as any) = 'a string';
			await elementUpdated(element);
			expect(element.selectionStart).toBeNull();
			expect(element.hasAttribute('selection-start')).toBe(false);
		});

		it('should call the facade select method with the start value when selectionStart changes', async () => {
			element.selectionStart = 5;
			await elementUpdated(element);
			expect(editorFacadeSelectSpy).toHaveBeenCalledWith({
				start: 5,
				end: 5,
			});
		});

		it('should call the facade select method with start and end values when selectionStart changes and both are defined', async () => {
			element.selectionEnd = 15;
			await elementUpdated(element);

			element.selectionStart = 5;
			await elementUpdated(element);

			expect(editorFacadeSelectSpy).toHaveBeenCalledWith({
				start: 5,
				end: 15,
			});
		});

		it('should gracefully fail with a warning when entering a number out of bounds', async () => {
			const warnSpy = vi.spyOn(console, 'warn');
			editorFacadeSelectSpy.mockRestore();

			element.selectionStart = 5;
			await elementUpdated(element);

			expect(warnSpy).toHaveBeenCalledWith('Position 5 out of range');
			warnSpy.mockRestore();
		});

		it('should set selectionStart to the length of newly added input', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p>';
			await elementUpdated(element);

			expect(element.selectionStart).toEqual('123456789'.length + 1);
		});

		it('should update when the value changes by the user', async () => {
			editorFacadeSelectSpy.mockRestore();
			element.value = '<p>123456789</p>';
			await elementUpdated(element);

			selectInEditor(5, 10);
			await elementUpdated(element);

			expect(element.selectionStart).toBe(5);
		});
	});

	describe('selectionEnd', () => {
		it('should default to null', async () => {
			expect(element.selectionEnd).toBeNull();
		});

		it('should reflect in the selection-end attribute', async () => {
			element.selectionEnd = 5;
			await elementUpdated(element);
			expect(element.getAttribute('selection-end')).toEqual('5');
		});

		it('should reflect the attribute in the property', async () => {
			element.setAttribute('selection-end', '10');
			await elementUpdated(element);
			expect(element.selectionEnd).toEqual(10);
		});

		it('should return null when given a non number value', async () => {
			(element.selectionEnd as any) = 'a string';
			await elementUpdated(element);
			expect(element.selectionEnd).toBeNull();
			expect(element.hasAttribute('selection-end')).toBe(false);
		});

		it('should call the facade select method with the start and end value when selectionEnd changes', async () => {
			element.selectionStart = 5;
			await elementUpdated(element);
			editorFacadeSelectSpy.mockReset();

			element.selectionEnd = 10;
			await elementUpdated(element);

			expect(editorFacadeSelectSpy).toHaveBeenCalledWith({
				start: 5,
				end: 10,
			});
		});

		it('should call the facade select method with the start value when selectionEnd changes to null', async () => {
			const selectionStart = 5;
			const selectionEnd = 10;
			selectInEditor(selectionStart, selectionEnd);
			await elementUpdated(element);
			editorFacadeSelectSpy.mockReset();

			element.selectionEnd = null;
			await elementUpdated(element);

			expect(editorFacadeSelectSpy).toHaveBeenCalledWith({
				start: selectionStart,
				end: selectionStart,
			});
		});

		it('should set selectionStart to 1 if undefined when selectionEnd changes', async () => {
			element.selectionEnd = 5;
			await elementUpdated(element);

			expect(editorFacadeSelectSpy).toHaveBeenCalledWith({
				start: 1,
				end: 5,
			});
		});

		it('should gracefully fail with a warning when entering a number out of bounds', async () => {
			const warnSpy = vi.spyOn(console, 'warn');
			editorFacadeSelectSpy.mockRestore();

			element.selectionEnd = 5;
			await elementUpdated(element);

			expect(warnSpy).toHaveBeenCalledWith('Position 5 out of range');
			warnSpy.mockRestore();
		});

		it('should set selectionEnd to the length of newly added input', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p>';
			await elementUpdated(element);

			expect(element.selectionEnd).toEqual('123456789'.length + 1);
		});

		it('should update when the value changes by the user', async () => {
			editorFacadeSelectSpy.mockRestore();
			element.value = '<p>123456789</p>';
			await elementUpdated(element);

			moveMarkerToPosition(5);
			await elementUpdated(element);

			expect(element.selectionEnd).toBe(5);
		});
	});
});
