import { EditorState, type EditorStateConfig } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { MockedObject } from 'vitest';
import type { RichTextEditorSelection } from '../rich-text-editor.js';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema';
import { ProseMirrorFacade } from './vivid-prose-mirror.facade';

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

vi.mock('prosemirror-view', async () => ({
	...(await vi.importActual('prosemirror-view')),
	EditorView: vi.fn(),
}));

describe('ProseMirrorFacade', () => {
	function initViewer() {
		const element = document.createElement('div');
		facadeInstance.init(element);
		return element;
	}

	async function useOriginalEditorView() {
		const { EditorView: ActualEditorView } = await vi.importActual(
			'prosemirror-view'
		);
		// Use the actual implementation for this test
		vi.mocked(EditorView).mockImplementation(
			(...args) => new (ActualEditorView as typeof EditorView)(...args)
		);
	}

	async function useOriginalEditorState() {
		if (vi.isMockFunction(EditorState.create)) {
			vi.mocked(EditorState.create).mockRestore();
		}
	}

	function getOutputElement(element: HTMLElement): HTMLElement {
		return element.querySelector('[contenteditable="true"]') as HTMLElement;
	}

	let EditorViewMock: MockedObject<typeof EditorView>;
	let facadeInstance: ProseMirrorFacade;

	beforeEach(async () => {
		EditorViewMock = vi.mocked(EditorView);
		EditorViewMock.mockReset();
		Object.defineProperty(EditorView.prototype, 'dom', {
			value: document.createElement('div'),
			writable: true,
		});
		facadeInstance = new ProseMirrorFacade();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should be defined', async () => {
		expect(facadeInstance instanceof ProseMirrorFacade).toBe(true);
	});

	it('should remove placeholder when there is text', async () => {
		await useOriginalEditorState();
		await useOriginalEditorView();

		const element = initViewer();
		facadeInstance.replaceContent('<p>This is a block</p>');

		const outputElement = getOutputElement(element);

		// Simulate pressing the Enter key
		const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
		outputElement.dispatchEvent(event);

		expect(
			getOutputElement(element).querySelector('[data-placeholder]')
		).toBeNull();
	});

	describe('init()', () => {
		let StateMock = {};

		beforeEach(async () => {
			StateMock = {
				selection: {
					$from: {},
				},
			};
			vi.spyOn(EditorState, 'create').mockReturnValue(StateMock as any);
		});

		it('should throw if first parameter is not an HTMLElement', async () => {
			expect(() => (facadeInstance as any).init('not HTMLElement')).toThrow(
				'ProseMirror Facade init accepts a valid HTMLElement as its first parameter'
			);
		});

		it('should use the element and state created with VIVID schema when creating the ProseMirror EditorView', async () => {
			const element = initViewer();

			expect(EditorState.create).toHaveBeenCalledWith({
				schema: VVD_PROSE_MIRROR_SCHEMA,
				plugins: expect.arrayContaining([]),
			});
			expect(EditorViewMock).toHaveBeenCalledWith(element, {
				state: StateMock,
			});
		});

		it('should set default placeholder text', async () => {
			await useOriginalEditorState();
			await useOriginalEditorView();

			const element = initViewer();
			document.body.appendChild(element);

			expect(
				getOutputElement(element)
					.querySelector('p')
					?.getAttribute('data-placeholder')
			).toBe('Start typing...');
		});
	});

	describe('updatePlaceholder', () => {
		it('should throw if editor is not initialized', async () => {
			expect(() => facadeInstance.updatePlaceholder('')).toThrow();
		});

		it('should replace the placeholder text', async () => {
			await useOriginalEditorState();
			await useOriginalEditorView();

			const element = initViewer();
			document.body.appendChild(element);

			facadeInstance.updatePlaceholder('New placeholder text');

			expect(
				getOutputElement(element)
					.querySelector('p')
					?.getAttribute('data-placeholder')
			).toBe('New placeholder text');
		});
	});

	describe('replaceContent()', () => {
		it('should throw if facade was not initiated', async () => {
			expect(() => facadeInstance.replaceContent('content')).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should replace the content in the editor HTML', async () => {
			const { EditorView: ActualEditorView } = await vi.importActual(
				'prosemirror-view'
			);

			vi.mocked(EditorView).mockImplementation(
				(...args) => new (ActualEditorView as typeof EditorView)(...args)
			);

			const element = initViewer();
			facadeInstance.replaceContent('<div>Hello</div>');
			expect(getOutputElement(element).innerHTML).toBe('<p>Hello</p>');
		});
	});

	describe('selection', () => {
		beforeEach(async () => {
			vi.spyOn(EditorState, 'create');
		});

		it('should return negative selection when editor is not initialized', async () => {
			expect(facadeInstance.selection()).toEqual({ start: -1, end: -1 });
		});

		it('should return ProseMirror selection', async () => {
			async function setSelectionInState(mockState: DeepPartial<EditorState>) {
				await useOriginalEditorState();
				const originalCreate = EditorState.create;
				vi.spyOn(EditorState, 'create').mockImplementation(
					(stateInput: EditorStateConfig) => {
						const originalState = originalCreate(stateInput);
						Object.assign(originalState, mockState);
						return originalState;
					}
				);
			}

			await useOriginalEditorView();
			const MOCK_STATE = {
				selection: {
					from: 6,
					to: 10,
					$from: {
						parent: {
							type: {},
						},
					},
				},
			};
			await setSelectionInState(MOCK_STATE);

			facadeInstance.init(document.createElement('div'));

			expect(facadeInstance.selection()).toEqual({
				start: 6,
				end: 10,
			});
		});

		it('should set the selected position in proseMirror', async () => {
			await useOriginalEditorState();
			await useOriginalEditorView();

			const initialPosition: RichTextEditorSelection = {
				start: 3,
				end: 10,
			};
			facadeInstance.init(document.createElement('div'));
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);

			facadeInstance.selection(initialPosition);

			expect(facadeInstance.selection()).toEqual(initialPosition);
		});

		it('should return start and end the same number if end is not given', async () => {
			await useOriginalEditorState();
			await useOriginalEditorView();

			const initialPosition: RichTextEditorSelection = {
				start: 3,
			};
			facadeInstance.init(document.createElement('div'));
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);

			facadeInstance.selection(initialPosition);
			expect(facadeInstance.selection()).toEqual({ start: 3, end: 3 });
		});

		it('should throw when range is out of editor bounds', async () => {
			await useOriginalEditorState();
			await useOriginalEditorView();

			const initialPosition: RichTextEditorSelection = {
				start: 250,
			};
			facadeInstance.init(document.createElement('div'));
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);

			expect(() => facadeInstance.selection(initialPosition)).toThrowError(
				'Position 250 out of range'
			);
		});
	});

	describe('setSelectionTag', () => {
		beforeEach(async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();
		});

		it('should throw if viewer is not initialized', async () => {
			expect(() => facadeInstance.setSelectionTag('tag')).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should throw if given tag does not exist', async () => {
			initViewer();
			expect(() => facadeInstance.setSelectionTag('not a tag')).toThrowError(
				'Node type tag does not exist in the schema'
			);
		});

		it('should do nothing when given the same tag', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
			facadeInstance.selection({
				start: 3,
			});

			facadeInstance.setSelectionTag('h2');

			expect(getOutputElement(element).innerHTML).toEqual(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
		});

		it('should change the tag when given the a different tag', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
			});

			facadeInstance.setSelectionTag('h2');

			expect(getOutputElement(element).innerHTML).toEqual(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
		});

		it('should change the tag to paragraph', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
			facadeInstance.selection({
				start: 3,
			});

			facadeInstance.setSelectionTag('p');

			expect(getOutputElement(element).innerHTML).toEqual(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
		});

		it('should change the tag to p', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
			facadeInstance.selection({
				start: 3,
			});

			facadeInstance.setSelectionTag('p');

			expect(getOutputElement(element).innerHTML).toEqual(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
		});

		it('should change the tag to h3', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<h2>This is a pretty long text for a sample, but it should work</h2>'
			);
			facadeInstance.selection({
				start: 3,
			});

			facadeInstance.setSelectionTag('h3');

			expect(getOutputElement(element).innerHTML).toEqual(
				'<h3>This is a pretty long text for a sample, but it should work</h3>'
			);
		});
	});

	describe('selection-changed event', () => {
		beforeEach(async () => {
			await useOriginalEditorView();

			facadeInstance.init(document.createElement('div'));
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
		});

		it('should emit "selection-changed" event when selection start is changed by the consumer', async () => {
			const spy = vi.fn();
			facadeInstance.addEventListener('selection-changed', spy);

			facadeInstance.selection({
				start: 3,
			});

			expect(spy).toHaveBeenCalled();
		});

		it('should emit "selection-changed" event when selection end is changed by the consumer', async () => {
			facadeInstance.selection({
				start: 1,
				end: 3,
			});
			const spy = vi.fn();
			facadeInstance.addEventListener('selection-changed', spy);

			facadeInstance.selection({
				start: 1,
				end: 5,
			});

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('change event', () => {
		function listenToChangeEvent() {
			const spy = vi.fn();
			facadeInstance.addEventListener('change', spy);
			return spy;
		}

		let element: HTMLElement;

		beforeEach(async () => {
			await useOriginalEditorView();
			element = document.createElement('div');
			facadeInstance.init(element);
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
		});

		it('should prevent change event when no change was made', async () => {
			const spy = listenToChangeEvent();
			getOutputElement(element).dispatchEvent(
				new Event('blur', { bubbles: true })
			);

			expect(spy.mock.calls.length).toBe(0);
		});

		it('should fire event after input area change', async () => {
			const spy = listenToChangeEvent();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work again</p>'
			);

			getOutputElement(element).dispatchEvent(
				new Event('input', { bubbles: true })
			);
			getOutputElement(element).dispatchEvent(
				new Event('blur', { bubbles: true })
			);

			expect(spy.mock.calls.length).toBe(1);
		});
	});

	describe('input event', () => {
		it('should emit an input event when user changes the content', async () => {
			await useOriginalEditorView();
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);

			const spy = vi.fn();
			facadeInstance.addEventListener('input', spy);
			getOutputElement(element).dispatchEvent(new Event('input'));

			expect(spy).toHaveBeenCalledOnce();
		});
	});

	describe('addEventListener', () => {
		it('should accept a callback', async () => {
			const spy = vi.fn();
			expect(() =>
				facadeInstance.addEventListener('eventName', spy)
			).toBeTruthy();
		});
	});

	describe('keyboard interaction', () => {
		function dispatchEditorKeyboardEvent(
			element: HTMLElement,
			key: string,
			shiftKey = false
		) {
			const event = new KeyboardEvent('keydown', { key, shiftKey });
			getOutputElement(element).dispatchEvent(event);
		}
		beforeEach(async () => {
			await useOriginalEditorView();
			initViewer();
		});

		it('should add a new block on Enter key press', async () => {
			const content = '123';
			const element = initViewer();
			facadeInstance.replaceContent(`<p>${content}</p>`);

			dispatchEditorKeyboardEvent(element, 'Enter');

			expect(getOutputElement(element).querySelectorAll('p').length).toBe(2);
		});

		it('should create a blank paragraph on enter press when in a different block', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(`<p>123</p>`);
			facadeInstance.setSelectionTag('h2');

			dispatchEditorKeyboardEvent(element, 'Enter');
			const postTitleStyles = facadeInstance.getSelectionStyles();

			facadeInstance.selection({ start: 3, end: 3 });
			facadeInstance.setSelectionTag('h3');
			facadeInstance.selection({ start: 4, end: 4 });

			dispatchEditorKeyboardEvent(element, 'Enter');

			const postSubTitleStyles = facadeInstance.getSelectionStyles();
			expect(postTitleStyles).toEqual({
				textBlockType: 'body',
				textDecoration: undefined,
				textSize: 'normal',
			});
			expect(postSubTitleStyles).toEqual({
				textBlockType: 'body',
				textDecoration: undefined,
				textSize: 'normal',
			});
		});

		it('should add paragraph with same style of former paragraph after enter press', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(`<p>123</p>`);

			facadeInstance.selection({ start: 2, end: 4 });
			facadeInstance.setTextSize('large');
			facadeInstance.setSelectionDecoration('underline');

			const firstParagraphStyles = facadeInstance.getSelectionStyles();

			facadeInstance.selection({ start: 4, end: 4 });

			dispatchEditorKeyboardEvent(element, 'Enter');

			facadeInstance.selection({ start: 6, end: 6 });

			expect(firstParagraphStyles).toEqual({
				textBlockType: 'body',
				textDecoration: ['underline'],
				textSize: 'large',
			});
			expect(facadeInstance.getSelectionStyles()).toEqual(firstParagraphStyles);
		});

		it('should add a new line in the same block when hitting shift+enter', async () => {
			const content = '123';
			const element = initViewer();
			facadeInstance.replaceContent(`<p>${content}</p>`);

			dispatchEditorKeyboardEvent(element, 'Enter', true);

			expect(getOutputElement(element).innerHTML).toBe(
				'<p>123<br><br class="ProseMirror-trailingBreak"></p>'
			);
			expect(facadeInstance.selection()).toEqual({ start: 5, end: 5 });
		});

		it('should remove the selection and add a new line at beginning of selection on Shift+Enter', async () => {
			const content = '<p>123456</p><p>789</p>';
			const element = initViewer();
			facadeInstance.replaceContent(`${content}`);

			facadeInstance.selection({ start: 4, end: 11 });

			dispatchEditorKeyboardEvent(element, 'Enter', true);

			expect(getOutputElement(element).innerHTML).toBe(
				'<p>123<br><br class="ProseMirror-trailingBreak"></p><p>9</p>'
			);
			expect(facadeInstance.selection()).toEqual({ start: 5, end: 5 });
		});
	});

	describe('setSelectionDecoration()', () => {
		beforeEach(async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();
		});

		it('should throw if viewer is not initialized', async () => {
			expect(() => facadeInstance.setSelectionDecoration('bold')).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should apply bold decoration to current selection when "bold" is sent', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('bold');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<strong>is is a</strong> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply italics decoration to current selection when "italics" is sent', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('italics');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<em>is is a</em> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should throw if used unsupported mark', async () => {
			initViewer();
			expect(() =>
				facadeInstance.setSelectionDecoration('unSupportedMark')
			).toThrowError('unSupportedMark is not a supported decoration');
		});

		it('should apply underline decoration to current selection when "underline" is sent', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('underline');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<u>is is a</u> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply strikethrough decoration to current selection when "strikethrough" is sent', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('strikethrough');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<s>is is a</s> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply monospace decoration to current selection when "monospace" is sent', async () => {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('monospace');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<tt>is is a</tt> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should emit change event on changing the decoration', async () => {
			initViewer();
			const spy = vi.fn();
			facadeInstance.addEventListener('change', spy);
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});

			facadeInstance.setSelectionDecoration('monospace');

			expect(spy).toHaveBeenCalledOnce();
		});
	});

	describe('getSelectionStyles', () => {
		function textDecorationInMarkerPositions({
			start,
			end,
		}: {
			start: number;
			end: number;
		}) {
			facadeInstance.selection({ start, end });
			return facadeInstance.getSelectionStyles().textDecoration;
		}

		function textBlockInMarkerPositions({
			start,
			end,
		}: {
			start: number;
			end: number;
		}) {
			facadeInstance.selection({ start, end });
			return facadeInstance.getSelectionStyles().textBlockType;
		}

		async function initViewerWithContent(content: string) {
			await useOriginalEditorView();
			await useOriginalEditorState();

			const element = initViewer();
			facadeInstance.replaceContent(content);

			return element;
		}

		it('should throw if view is not initiated', async () => {
			expect(() => facadeInstance.getSelectionStyles()).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should return the "title" text block type when selection is h2', async () => {
			await initViewerWithContent(
				'<h2>This is a title</h2><h3>This is a subtitle</h3><p>This is a body</p>'
			);

			expect(textBlockInMarkerPositions({ start: 1, end: 1 })).toEqual('title');
		});

		it('should return the "subtitle" text block type when selection is h3', async () => {
			await initViewerWithContent(
				'<h2>This is a title</h2><h3>This is a subtitle</h3><p>This is a body</p>'
			);

			expect(textBlockInMarkerPositions({ start: 25, end: 25 })).toEqual(
				'subtitle'
			);
		});

		it('should return the "body" text block type when selection is p', async () => {
			await initViewerWithContent(
				'<h2>This is a title</h2><h3>This is a subtitle</h3><p>This is a body</p>'
			);

			expect(textBlockInMarkerPositions({ start: 50, end: 50 })).toEqual(
				'body'
			);
		});

		it('should return empty block type when mixed content', async () => {
			await initViewerWithContent(
				'<h2>This is a title</h2><h3>This is a subtitle</h3><p>This is a body</p>'
			);

			expect(textBlockInMarkerPositions({ start: 25, end: 50 })).toEqual('');
		});

		it('should return the text decoration in the selection', async () => {
			await initViewerWithContent(
				'<strong>This is a title</strong><em>This is a subtitle</em><u>This is a body</u><s>1</s><tt>2<tt>'
			);

			expect(textDecorationInMarkerPositions({ start: 0, end: 50 })).toEqual([
				'bold',
				'italics',
				'underline',
				'strikethrough',
				'monospace',
			]);
		});

		it('should return the decoration of the marker position', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			await initViewerWithContent(
				'<strong>This is a title</strong><em>This is a subtitle</em><u>This is a body</u><s>1</s><tt>2<tt>'
			);
			expect(textDecorationInMarkerPositions({ start: 5, end: 5 })).toEqual([
				'bold',
			]);
			expect(textDecorationInMarkerPositions({ start: 19, end: 19 })).toEqual([
				'italics',
			]);
			expect(textDecorationInMarkerPositions({ start: 40, end: 40 })).toEqual([
				'underline',
			]);
			expect(textDecorationInMarkerPositions({ start: 49, end: 49 })).toEqual([
				'strikethrough',
			]);
			expect(textDecorationInMarkerPositions({ start: 50, end: 50 })).toEqual([
				'monospace',
			]);
		});

		it('should return undefined textDecoration property when no decoration exists', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent('<p>This is a title</p>');
			facadeInstance.selection({ start: 0, end: 5 });
			expect(
				textDecorationInMarkerPositions({ start: 0, end: 5 })
			).toBeUndefined();
		});

		it('should return fontSize according to text font size', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent('<p>This is a title</p>');
			facadeInstance.selection({ start: 2, end: 4 });
			facadeInstance.setTextSize('extra-large');

			expect(facadeInstance.getSelectionStyles().textSize).toBe('extra-large');
		});

		it('should return empty string if mixed sizes', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent('<p>This is a title</p>');
			facadeInstance.selection({ start: 2, end: 4 });
			facadeInstance.setTextSize('extra-large');
			facadeInstance.selection({ start: 5, end: 7 });
			facadeInstance.setTextSize('large');

			facadeInstance.selection({ start: 2, end: 7 });

			expect(facadeInstance.getSelectionStyles().textSize).toBe('');
		});

		it('should return text size of a single marker', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent('<p>This is a title</p>');
			facadeInstance.selection({ start: 2, end: 4 });
			facadeInstance.setTextSize('extra-large');

			facadeInstance.selection({ start: 3, end: 3 });

			expect(facadeInstance.getSelectionStyles().textSize).toBe('extra-large');
		});

		it('should return font from replaced HTML', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent(
				'<p><span style="font: var(--vvd-typography-heading-4);">Extra-large text</span></p>'
			);

			facadeInstance.selection({ start: 3, end: 5 });

			expect(facadeInstance.getSelectionStyles().textSize).toBe('extra-large');
		});

		it('should return normal font when font size is invalid', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent(
				'<p><span style="font: var(--vvd-typography-heading-3);">Strange text</span></p>'
			);

			facadeInstance.selection({ start: 3, end: 5 });

			expect(facadeInstance.getSelectionStyles().textSize).toBe('normal');
		});

		it('should return normal font size when no size applied', async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();

			initViewer();
			facadeInstance.replaceContent('<p>This is a title</p>');
			facadeInstance.selection({ start: 2, end: 4 });

			expect(facadeInstance.getSelectionStyles().textSize).toBe('normal');
		});
	});

	describe('setTextSize', () => {
		function setViewer() {
			const element = initViewer();
			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);
			facadeInstance.selection({
				start: 3,
				end: 10,
			});
			return element;
		}

		beforeEach(async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();
		});

		it('should throw if view is not initiated', async () => {
			expect(() => facadeInstance.setTextSize()).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should apply span with font for extra-large text', async () => {
			const element = setViewer();

			facadeInstance.setTextSize('extra-large');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<span style="font: var(--vvd-typography-heading-4);">is is a</span> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply span with font for large text', async () => {
			const element = setViewer();

			facadeInstance.setTextSize('large');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<span style="font: var(--vvd-typography-base-extended);">is is a</span> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply span with font for normal text', async () => {
			const element = setViewer();

			facadeInstance.setTextSize('normal');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<span style="font: var(--vvd-typography-base);">is is a</span> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply span with font for small text', async () => {
			const element = setViewer();

			facadeInstance.setTextSize('small');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<span style="font: var(--vvd-typography-base-condensed);">is is a</span> pretty long text for a sample, but it should work</p>`
			);
		});

		it('should apply span with normal font size when given invalid size', async () => {
			const element = setViewer();

			facadeInstance.setTextSize('not-normal' as 'normal');

			expect(getOutputElement(element).innerHTML).toBe(
				`<p>Th<span style="font: var(--vvd-typography-base);">is is a</span> pretty long text for a sample, but it should work</p>`
			);
		});
	});

	describe('getValue', () => {
		function setViewer() {
			const element = initViewer();
			return element;
		}

		beforeEach(async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();
		});

		it('should return empty value', async () => {
			const element = setViewer();

			expect(getOutputElement(element).innerHTML).toEqual(
				facadeInstance.getValue()
			);
		});

		it('should return the content', async () => {
			const element = setViewer();

			facadeInstance.replaceContent(
				'<p>This is a pretty long text for a sample, but it should work</p>'
			);

			expect(getOutputElement(element).innerHTML).toEqual(
				facadeInstance.getValue()
			);
		});
	});

	describe('addInlineImage', () => {
		beforeEach(async () => {
			await useOriginalEditorView();
			await useOriginalEditorState();
		});

		function createImageFile() {
			return new File(['dummy'], 'test.png', { type: 'image/png' });
		}

		it('should throw if view is not initiated', async () => {
			const image = createImageFile();
			await expect(facadeInstance.addInlineImage({file: image})).rejects.toThrow(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should insert an image at the current selection if position is not provided', async () => {
			const element = initViewer();
			facadeInstance.replaceContent('<p>abc</p>');
			facadeInstance.selection({ start: 3, end: 3 });
			const image = createImageFile();

			await facadeInstance.addInlineImage({ file: image });

			const output = getOutputElement(element).innerHTML;
			const img = getOutputElement(element).querySelector('img');
			const expected = /^<p>ab<img[^>]+>c<\/p>$/;
			expect(output).toMatch(expected);
			expect(img?.src).toContain('data:image/png;base64');
		});

		it('should insert an image at the given position', async () => {
			const element = initViewer();
			facadeInstance.replaceContent('<p>a b</p>');
			const image = createImageFile();

			await facadeInstance.addInlineImage({ file: image, position: 3 });

			const output = getOutputElement(element).innerHTML;
			const expected = /^<p>a <img[^>]+>b<\/p>$/;
			expect(output).toMatch(expected);
		});

		it('should insert the image with custom alt attribute', async () => {
			const element = initViewer();
			facadeInstance.replaceContent('<p>abc</p>');
			const image = createImageFile();

			await facadeInstance.addInlineImage({ file: image, alt: 'custom alt' });

			const img = getOutputElement(element).querySelector('img');
			expect(img?.alt).toBe('custom alt');
		});

		it('should insert the image with default alt attribute if not provided', async () => {
			const element = initViewer();
			facadeInstance.replaceContent('<p>abc</p>');
			const image = createImageFile();

			await facadeInstance.addInlineImage({ file: image });

			const img = getOutputElement(element).querySelector('img');
			expect(img?.alt).toBe('inline image from file test.png');
		});
	});
});
