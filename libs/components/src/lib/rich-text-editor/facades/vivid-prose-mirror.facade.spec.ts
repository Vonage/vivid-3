import { EditorState, type EditorStateConfig } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { Mock, MockedObject } from 'vitest';
import type { RichTextEditorSelection } from '../rich-text-editor.js';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema.ts';
import { ProseMirrorFacade } from './vivid-prose-mirror.facade.ts';

vi.mock('prosemirror-view', () => ({
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
		if (EditorState.create.isMockFunction) {
			EditorState.create.mockRestore();
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

	describe('init()', () => {
		let StateMock = {};

		beforeEach(async () => {
			StateMock = {};
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
	});

	describe('replaceContent()', () => {
		it('should throw if facade was not initiated', async () => {
			expect(() => facadeInstance.replaceContent('content')).toThrowError(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		});

		it('should replace the content in the editor HTML', async () => {
			// Import the actual module
			const { EditorView: ActualEditorView } = await vi.importActual(
				'prosemirror-view'
			);

			// Use the actual implementation for this test
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
			async function setSelectionInState(mockStateSelection) {
				await useOriginalEditorState();
				const originalCreate = EditorState.create;
				vi.spyOn(EditorState, 'create').mockImplementation(
					(stateInput: EditorStateConfig) => {
						const originalState = originalCreate(stateInput);
						originalState.selection = {
							...originalState.selection,
							...mockStateSelection.selection,
						};
						return originalState;
					}
				);
			}

			await useOriginalEditorView();
			const MOCK_STATE = {
				selection: {
					from: 6,
					to: 10,
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
			spy = vi.fn();
			facadeInstance.addEventListener('change', spy);
			return spy;
		}

		let element: HTMLElement;
		let spy: Mock<(...args: any[]) => any> | EventListenerOrEventListenerObject;

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
		beforeEach(async () => {
			await useOriginalEditorView();
			initViewer();
		});

		it('should handle Enter key press', async () => {
			const NEWLINE_POSITION_VALUE = 3;
			const content = '123';
			const element = initViewer();
			facadeInstance.replaceContent(`<p>${content}</p>`);

			const event = new KeyboardEvent('keydown', { key: 'Enter' });
			getOutputElement(element).dispatchEvent(event);

			// Verify the expected behavior for Enter key press
			expect(facadeInstance.selection()).toEqual({
				start: content.length + NEWLINE_POSITION_VALUE,
				end: content.length + NEWLINE_POSITION_VALUE,
			});
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
			expect(() => facadeInstance.setSelectionDecoration('unSupportedMark')).toThrowError(
				'unSupportedMark is not a supported decoration'
			);
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
	});
});
