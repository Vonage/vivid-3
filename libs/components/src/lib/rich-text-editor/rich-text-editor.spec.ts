import type { Mock, MockInstance } from 'vitest';
import { elementUpdated, fixture } from '@repo/shared';
import deDE from '../../locales/de-DE';
import { setLocale } from '../../shared/localization';
import { ProseMirrorFacade as EditorFacade } from './facades/vivid-prose-mirror.facade';
import {
	RichTextEditor,
	type RichTextEditorInlineImageProps,
	type RichTextEditorSelection,
} from './rich-text-editor';
import '.';

const COMPONENT_TAG = 'vwc-rich-text-editor';

describe('vwc-rich-text-editor', () => {
	function getEditorElement() {
		return element.shadowRoot?.querySelector('#editor') as HTMLElement;
	}

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

		editorFacadeSelectSpy.mockClear();
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

		it('should set drag-over class when user drags something over the editor area', async () => {
			const editor = getEditorElement();

			const dragEnterEvent = new Event('dragenter', {
				bubbles: true,
				cancelable: true,
			});

			editor.dispatchEvent(dragEnterEvent);
			await elementUpdated(element);

			expect(editor.classList.contains('drag-over')).toBe(true);
		});

		it('should remove drag-over class when user exits the drag area', async () => {
			const editor = getEditorElement();

			const dragEnterEvent = new Event('dragenter', {
				bubbles: true,
				cancelable: true,
			});

			const dragLeaveEvent = new Event('dragleave', {
				bubbles: true,
				cancelable: true,
			});

			editor.dispatchEvent(dragEnterEvent);
			editor.dispatchEvent(dragLeaveEvent);
			await elementUpdated(element);

			expect(editor.classList.contains('drag-over')).toBe(false);
		});

		it('should remove drag-over class when user drops the file', async () => {
			const editor = getEditorElement();

			const dragEnterEvent = new Event('dragenter', {
				bubbles: true,
				cancelable: true,
			});

			const dropEvent = new Event('drop', {
				bubbles: true,
				cancelable: true,
			});

			(dropEvent as any).dataTransfer = {};
			editor.dispatchEvent(dragEnterEvent);
			editor.dispatchEvent(dropEvent);
			await elementUpdated(element);

			expect(editor.classList.contains('drag-over')).toBe(false);
		});

		it('should leave drag-over class when user drag-leaves to a child element', async () => {
			const editor = getEditorElement();

			const dragEnterEvent = new Event('dragenter', {
				bubbles: true,
				cancelable: true,
			});

			const dragLeaveEvent = new Event('dragleave', {
				bubbles: true,
				cancelable: true,
			});

			const child = editor.children[0];
			Object.defineProperty(dragLeaveEvent, 'relatedTarget', {
				value: child,
			});

			editor.dispatchEvent(dragEnterEvent);
			editor.dispatchEvent(dragLeaveEvent);
			await elementUpdated(element);

			expect(editor.classList.contains('drag-over')).toBe(true);
		});

		it('should replace drag and drop string with locale values', async () => {
			const dragOverlay = getEditorElement().querySelector(
				'.drag-overlay'
			) as HTMLElement;

			setLocale(deDE);
			await elementUpdated(element);

			expect(dragOverlay.textContent?.trim()).toBe(
				deDE.richTextEditor.dragAndDropFilesHere
			);
		});
	});

	describe('value', () => {
		function userInput(value: string) {
			getOutputElement().innerHTML = value;
			getOutputElement().dispatchEvent(new Event('input', { bubbles: true }));
		}

		it('should init as empty paragraph', async () => {
			const div = document.createElement('div');
			div.innerHTML = element.value as string;
			expect(div.textContent).toBe('');
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
			const callCountBefore = editorFacadeSelectSpy.mock.calls.length;

			moveMarkerToPosition(6);
			await elementUpdated(element);

			const callCountAfter = editorFacadeSelectSpy.mock.calls.length;
			expect(callCountAfter - callCountBefore).toBe(3);
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
			editorFacadeSelectSpy.mockClear();

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
			editorFacadeSelectSpy.mockClear();

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

	describe('setTextBlock()', () => {
		it('should gracefully fail with a warning when given an invalid block', async () => {
			const consoleWarnSpy = vi.spyOn(console, 'warn');

			(element.setTextBlock as any)('not a given block');
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Invalid text block: not a given block'
			);
		});

		it('should change the text block of current text part to h2 when block is `title`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><p>abcdefghi</p>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextBlock('title');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><h2>abcdefghi</h2>');
		});

		it('should change the text block of current text part to h3 when block type is `subtitle`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><p>abcdefghi</p>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextBlock('subtitle');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><h3>abcdefghi</h3>');
		});

		it('should change the text block of current text part to p when block type is `body`', async () => {
			editorFacadeSelectSpy.mockRestore();

			element.value = '<p>123456789</p><h3>abcdefghi</h3>';
			await elementUpdated(element);
			const positionInTheSecondParagraph = 15;
			moveMarkerToPosition(positionInTheSecondParagraph);

			element.setTextBlock('body');
			await elementUpdated(element);

			expect(element.value).toEqual('<p>123456789</p><p>abcdefghi</p>');
		});
	});

	describe('setSelectionDecoration()', () => {
		it('should gracefully fail with a warning when given an invalid decoration value', async () => {
			const consoleWarnSpy = vi.spyOn(console, 'warn');

			(element.setSelectionDecoration as any)('unsupported-decoration');
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				'Invalid decoration: unsupported-decoration'
			);
		});

		it('should call facade setSelectionDecoration with the decoration parameter', async () => {
			const setSelectionDecorationSpy = vi.spyOn(
				EditorFacade.prototype,
				'setSelectionDecoration'
			);
			const decoration = 'bold';
			element.setSelectionDecoration(decoration);
			expect(setSelectionDecorationSpy).toHaveBeenCalledWith(decoration);
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
			expect(selectionChangedListenerCallback).toHaveBeenCalled();
			expect(
				selectionChangedListenerCallback.mock.calls.length
			).toBeGreaterThanOrEqual(1);
		});

		it('should prevent call to facade select when updating values from the event', async () => {
			editorFacadeSelectSpy = spyOnOriginalFacadeSelect();
			const callCountBefore = editorFacadeSelectSpy.mock.calls.length;

			selectInEditor(4, 5);
			await elementUpdated(element);
			selectInEditor(3, 5);
			await elementUpdated(element);

			const callCountAfter = editorFacadeSelectSpy.mock.calls.length;
			expect(callCountAfter - callCountBefore).toBe(6);
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
			const notMenubar = document.createElement('div');
			const menubar = document.createElement('vwc-menubar');
			const menubar2 = document.createElement('vwc-menubar');
			notMenubar.slot = 'menu-bar';
			menubar.slot = 'menu-bar';
			menubar2.slot = 'menu-bar';
			element.appendChild(notMenubar);
			element.appendChild(menubar);
			element.appendChild(menubar2);
			await elementUpdated(element);

			expect(getComputedStyle(menubar).display).not.toBe('none');
			expect(getComputedStyle(menubar2).display).toBe('none');
			expect(getComputedStyle(notMenubar).display).toBe('none');
		});

		it('should change text block type on `text-block-selected` event from menubar', async () => {
			const newTextBlock = 'title';
			const setTextBlockSpy = vi.spyOn(element, 'setTextBlock');
			const menubar = document.createElement('vwc-menubar');
			menubar.slot = 'menu-bar';
			element.appendChild(menubar);
			await elementUpdated(element);

			menubar.dispatchEvent(
				new CustomEvent('text-block-selected', { detail: newTextBlock })
			);

			expect(setTextBlockSpy).toHaveBeenCalledWith(newTextBlock);
		});

		it('should change text decoration on `text-decoration-selected` event from menubar', async () => {
			const newTextDecoration = 'bold';
			const setTextDecorationSpy = vi.spyOn(element, 'setSelectionDecoration');
			const menubar = document.createElement('vwc-menubar');
			menubar.slot = 'menu-bar';
			element.appendChild(menubar);
			await elementUpdated(element);

			menubar.dispatchEvent(
				new CustomEvent('text-decoration-selected', {
					detail: newTextDecoration,
				})
			);

			expect(setTextDecorationSpy).toHaveBeenCalledWith(newTextDecoration);
		});

		it('should change text size on `text-size-selected` event from menubar', async () => {
			const newTextSize = 'large';
			const setTextSizeSpy = vi.spyOn(element, 'setSelectionTextSize');
			const menubar = document.createElement('vwc-menubar');
			menubar.slot = 'menu-bar';
			element.appendChild(menubar);
			await elementUpdated(element);

			menubar.dispatchEvent(
				new CustomEvent('text-size-selected', {
					detail: newTextSize,
				})
			);

			expect(setTextSizeSpy).toHaveBeenCalledWith(newTextSize);
		});

		it('should focus on the editable after a textBlock selection', async () => {
			const newTextBlock = 'title';
			const menubar = document.createElement('vwc-menubar');
			menubar.slot = 'menu-bar';
			element.appendChild(menubar);
			await elementUpdated(element);
			vi.useFakeTimers();
			menubar.dispatchEvent(
				new CustomEvent('text-block-selected', { detail: newTextBlock })
			);
			await vi.advanceTimersToNextTimerAsync();
			vi.useRealTimers();

			expect(document.activeElement).toBe(element);
			expect(element.shadowRoot?.activeElement).toBe(getOutputElement());
		});

		it('should async focus on the editable after a textDecoration selection', async () => {
			const newTextDecoration = 'bold';
			const menubar = document.createElement('vwc-menubar');
			menubar.slot = 'menu-bar';
			element.appendChild(menubar);
			await elementUpdated(element);

			vi.useFakeTimers();
			menubar.dispatchEvent(
				new CustomEvent('text-decoration-selected', {
					detail: newTextDecoration,
				})
			);

			await vi.advanceTimersToNextTimerAsync();
			vi.useRealTimers();
			expect(document.activeElement).toBe(element);
			expect(element.shadowRoot?.activeElement).toBe(getOutputElement());
			vi.useRealTimers();
		});
	});

	describe('selectionStyles', () => {
		it('should initiate as empty object', async () => {
			const unconnectedElement = document.createElement(COMPONENT_TAG);
			expect(unconnectedElement.selectionStyles).toEqual({});
		});

		it('should return the styles from the facade', async () => {
			const styles = { textBlockType: 'title' };
			vi.spyOn(
				EditorFacade.prototype,
				'getSelectionStyles'
			).mockReturnValueOnce(styles);

			expect(element.selectionStyles).toEqual(styles);
		});
	});

	describe('setSelectionTextSize', () => {
		it('should call facade.setTextSize with the text size', async () => {
			const setSelectionDecorationSpy = vi.spyOn(
				EditorFacade.prototype,
				'setTextSize'
			);
			const textSize = 'small';
			element.setSelectionTextSize(textSize);
			expect(setSelectionDecorationSpy).toHaveBeenCalledWith(textSize);
		});
	});

	describe('placeholder', () => {
		function getPlaceholderText() {
			return getOutputElement()
				.querySelector('[data-placeholder]')
				?.getAttribute('data-placeholder');
		}

		it('should default to undefined', async () => {
			expect(element.placeholder).toBeUndefined();
		});

		it('should have default placeholder text when not set', async () => {
			expect(getPlaceholderText()).toBe('Start typing...');
		});

		it('should set a different placeholder text when set', async () => {
			element.placeholder = 'some text';
			await elementUpdated(element);

			expect(getPlaceholderText()).toBe('some text');
		});

		it('should set placeholder to default when removed', async () => {
			element.placeholder = 'some text';
			await elementUpdated(element);

			element.placeholder = undefined;
			await elementUpdated(element);

			expect(getPlaceholderText()).toBe('Start typing...');
		});

		it('should set empty placeholder when set to empty string', async () => {
			element.placeholder = '';
			await elementUpdated(element);

			expect(getPlaceholderText()).toBe('');
		});

		it('should reflect the attribute in the property', async () => {
			const text = 'some text';
			element.setAttribute('placeholder', text);
			await elementUpdated(element);

			expect(element.placeholder).toBe(text);
		});

		it('should upadte the placeholder when the component loads', async () => {
			const text = 'some text';
			const div = document.createElement('div');
			document.body.appendChild(div);
			div.innerHTML = `
				<${COMPONENT_TAG} placeholder="${text}"></${COMPONENT_TAG}>
			`;

			const newElementPlaceholderText = div.children[0].shadowRoot
				?.querySelector('[data-placeholder]')
				?.getAttribute('data-placeholder');
			div.remove();
			expect(newElementPlaceholderText).toBe(text);
		});
	});

	describe('attachments slot', () => {
		it('should default with class "hidden" to attachments wrapper if no slotted items', async () => {
			expect(
				element.shadowRoot
					?.querySelector('#attachments-wrapper')
					?.classList.contains('hidden')
			).toBe(true);
		});

		it('should remove class "hidden" from attachments wrapper if slotted items exist', async () => {
			const div = document.createElement('div');
			div.slot = 'attachments';
			element.appendChild(div);
			await elementUpdated(element);
			expect(
				element.shadowRoot
					?.querySelector('#attachments-wrapper')
					?.classList.contains('hidden')
			).toBe(false);
		});

		it('should add class "hidden" from attachments wrapper if slotted items are removed', async () => {
			const div = document.createElement('div');
			div.slot = 'attachments';
			element.appendChild(div);
			div.remove();
			await elementUpdated(element);
			expect(
				element.shadowRoot
					?.querySelector('#attachments-wrapper')
					?.classList.contains('hidden')
			).toBe(true);
		});
	});

	describe('scrollToAttachments()', () => {
		let editorBoundsSpy: MockInstance<() => DOMRect>,
			editableAreaBoundsSpy: MockInstance<() => DOMRect>;

		beforeEach(async () => {
			const editableAreaElement = getOutputElement();
			const editorElement = getEditorElement();

			editorBoundsSpy = vi
				.spyOn(editorElement, 'getBoundingClientRect')
				.mockReturnValue({
					height: 30,
				} as DOMRect);
			editableAreaBoundsSpy = vi
				.spyOn(editableAreaElement, 'getBoundingClientRect')
				.mockReturnValue({
					height: 200,
				} as DOMRect);
		});

		afterEach(() => {
			editorBoundsSpy.mockRestore();
			editableAreaBoundsSpy.mockRestore();
		});

		it('should allow consumer to set the editor scrolTop to where the attachments element is visible', async () => {
			const editorElement = getEditorElement();
			element.scrollToAttachments();
			await elementUpdated(element);

			expect(editorElement.scrollTop).toBe(170);
		});

		it('should set the scrollTop value async', async () => {
			const editorElement = getEditorElement();

			element.scrollToAttachments();
			const scrollTopValueAfterMethodCall = editorElement.scrollTop;
			await elementUpdated(element);
			const scrollTopValueAfterAsyncQueue = editorElement.scrollTop;

			expect(scrollTopValueAfterMethodCall).toBe(0);
			expect(scrollTopValueAfterAsyncQueue).toBe(170);
		});

		it('should set the scrollTop with additional pixels when given in parameters', async () => {
			const editorElement = getEditorElement();
			element.scrollToAttachments(10);
			await elementUpdated(element);

			expect(editorElement.scrollTop).toBe(180);
		});
	});

	describe('file-drop event', () => {
		const FILES = [
			new File(['file-content'], 'test.txt', { type: 'text/plain' }),
		];
		function createDropEvent(files = FILES) {
			const dataTransfer = {
				files,
				types: ['Files'],
				getData: () => '',
			} as unknown as DataTransfer;

			const dropEvent = new Event('drop', {
				bubbles: true,
				cancelable: true,
			});

			(dropEvent as any).dataTransfer = dataTransfer;

			return dropEvent;
		}

		it('should fire "file-drop" event when file is dropped file drop and process files', async () => {
			const editor = getEditorElement();
			const spy = vi.fn();
			element.addEventListener('file-drop', spy);
			const dropEvent = createDropEvent(FILES);

			editor.dispatchEvent(dropEvent);

			expect(spy.mock.calls[0][0].detail).toEqual(FILES);
		});
	});

	describe('addInlineImage()', () => {
		it('should gracefully fail if facade fails', async () => {
			const input = {
				file: {},
				position: 5,
				alt: 'alt text',
			} as RichTextEditorInlineImageProps;

			vi.spyOn(EditorFacade.prototype, 'addInlineImage').mockRejectedValueOnce({
				message: 'Error',
			});
			const consoleWarnSpy = vi.spyOn(console, 'warn');

			await expect(element.addInlineImage(input)).resolves.toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith('Error');
		});

		it('should call facade addInlineImage with given parameters', async () => {
			const input = {
				file: {},
				position: 5,
				alt: 'alt text',
			} as RichTextEditorInlineImageProps;
			const editorFacadeAddInlineImageSpy = vi
				.spyOn(EditorFacade.prototype, 'addInlineImage')
				.mockResolvedValueOnce(undefined);
			await element.addInlineImage(input);

			expect(editorFacadeAddInlineImageSpy).toHaveBeenCalledWith(input);
		});
	});
});
