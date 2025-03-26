import type { Mock, MockInstance } from 'vitest';
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

	function spyOnOriginalFacadeSelect() {
		editorFacadeSelectSpy.mockRestore();
		const originalFacadeSelect = EditorFacade.prototype.selection;
		return vi
			.spyOn(EditorFacade.prototype, 'selection')
			.mockImplementation(originalFacadeSelect);
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
			expect(element.value).toMatchInlineSnapshot(
				`"<p><br class="ProseMirror-trailingBreak"></p>"`
			);
		});

		it('should display HTML inside the editor', async () => {
			const value = '<b>bold</b>';
			element.value = value;
			await elementUpdated(element);
			expect(getOutputElement().innerHTML).toBe('<p><strong>bold</strong></p>');
		});

		it('should return the HTML inside the editor if changed', async () => {
			const value = 'bold';
			userInput(value);
			await elementUpdated(element);

			expect(element.value).toBe(`<p>${value}</p>`);
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

			element.value = '123456789';
			await elementUpdated(element);

			expect(element.selectionStart).toEqual('123456789'.length + 1);
		});

		it('should update when the value changes by the user', async () => {
			editorFacadeSelectSpy.mockRestore();
			element.value = '123456789';
			await elementUpdated(element);

			selectInEditor(5, 10);
			await elementUpdated(element);

			expect(element.selectionStart).toBe(5);
		});

		it('should trigger only a single update', async () => {
			editorFacadeSelectSpy = spyOnOriginalFacadeSelect();
			element.value = '123456789';
			await elementUpdated(element);
			moveMarkerToPosition(5);
			await elementUpdated(element);
			editorFacadeSelectSpy.mockReset();

			moveMarkerToPosition(6);
			await elementUpdated(element);

			expect(editorFacadeSelectSpy).toHaveBeenCalledOnce();
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

	describe('setTextSize', () => {
		it('should gracefully fail with a warning when given an invalid size', async () => {
			const consoleWarnSpy = vi.spyOn(console, 'warn');

			(element.setTextSize as any)('not a given size');
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Invalid text size: not a given size'
			);
		});

		it('should change the text type of current text part to h2 when size is `title`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><p>abcdefghi</p>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextSize('title');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><h2>abcdefghi</h2>');
		});

		it('should change the text type of current text part to h3 when size is `subtitle`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><p>abcdefghi</p>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextSize('subtitle');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><h3>abcdefghi</h3>');
		});

		it('should change the text type of current text part to p when size is `body`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><h3>abcdefghi</h3>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextSize('body');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><p>abcdefghi</p>');
		});
	});

	describe('change event', () => {
		it('should fire the change event when on facade change', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getOutputElement().dispatchEvent(new Event('input'));
			getOutputElement().dispatchEvent(new Event('blur'));

			expect(spy).toHaveBeenCalledOnce();
		});

		it('should bubble and set to composed', async () => {
			const spy = vi.fn();
			element.addEventListener('change', spy);

			getOutputElement().dispatchEvent(new Event('input'));
			getOutputElement().dispatchEvent(new Event('blur'));

			expect(spy.mock.calls[0][0].bubbles).toBe(true);
			expect(spy.mock.calls[0][0].composed).toBe(true);
		});
	});

	describe('selection event', () => {
		let selectionChangedListenerCallback: Mock<(...args: any[]) => any>;

		function setSelectionChangedListener() {
			const spy = vi.fn();
			element.addEventListener('selection-changed', spy);
			return spy;
		}

		function getEventObject() {
			return selectionChangedListenerCallback.mock.calls[0][0];
		}

		beforeEach(async () => {
			element.value = '<p>123456789</p>';
			selectionChangedListenerCallback = setSelectionChangedListener();
			editorFacadeSelectSpy.mockRestore();
			moveMarkerToPosition(5);
			await elementUpdated(element);
		});

		it('should set the event to bubble and composed', async () => {
			expect(getEventObject().bubbles).toBe(true);
			expect(getEventObject().composed).toBe(true);
		});

		it('should fire the selection-changed event when selection changes', async () => {
			expect(selectionChangedListenerCallback).toHaveBeenCalledOnce();
		});

		it('should prevent call to facade select when updating values from the event', async () => {
			editorFacadeSelectSpy = spyOnOriginalFacadeSelect();
			editorFacadeSelectSpy.mockReset();
			selectInEditor(4, 5);
			await elementUpdated(element);
			selectInEditor(3, 5);
			await elementUpdated(element);
			expect(editorFacadeSelectSpy).toHaveBeenCalledTimes(2);
		});
	});

	describe('input event', () => {
		it('should fire the input event when on facade input', async () => {
			const spy = vi.fn();
			element.addEventListener('input', spy);

			getOutputElement().dispatchEvent(
				new Event('input', { bubbles: true, composed: true })
			);

			expect(spy).toHaveBeenCalledOnce();
		});

		it('should bubble and set to composed', async () => {
			const spy = vi.fn();
			element.addEventListener('input', spy);

			getOutputElement().dispatchEvent(
				new Event('input', { bubbles: true, composed: true })
			);

			expect(spy.mock.calls[0][0].bubbles).toBe(true);
			expect(spy.mock.calls[0][0].composed).toBe(true);
		});
	});

	describe('menu-bar slot', () => {
		it('should accept only the first menu-bar element', async () => {
			const menuBar = document.createElement('vwc-menubar');
			const menuBar2 = document.createElement('vwc-menubar');
			const notMenuBar = document.createElement('div');
			menuBar.slot = 'menu-bar';
			menuBar2.slot = 'menu-bar';
			menuBar.slot = 'menu-bar';
			notMenuBar.slot = 'menu-bar';
			element.appendChild(menuBar);
			element.appendChild(menuBar2);
			element.appendChild(notMenuBar);
			await elementUpdated(element);

			expect(getComputedStyle(menuBar).display).not.toBe('none');
			expect(getComputedStyle(menuBar2).display).toBe('none');
			expect(getComputedStyle(notMenuBar).display).toBe('none');
		});

		it('should change text size on `text-size-selected` event from menubar', async () => {
			const newTextSize = 'title';
			const setTextSizeSpy = vi.spyOn(element, 'setTextSize');
			const menuBar = document.createElement('vwc-menubar');
			menuBar.slot = 'menu-bar';
			element.appendChild(menuBar);
			await elementUpdated(element);

			menuBar.dispatchEvent(
				new CustomEvent('text-size-selected', { detail: newTextSize })
			);

			expect(setTextSizeSpy).toHaveBeenCalledWith(newTextSize);
		});
	});
});
