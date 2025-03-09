import { EditorState, type EditorStateConfig } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { MockedObject } from 'vitest';
import type { RichTextEditorSelection } from '../rich-text-editor.js';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema.ts';
import { ProseMirrorFacade } from './vivid-prose-mirror.facade.ts';

vi.mock('prosemirror-view', () => ({
	EditorView: vi.fn(),
}));

describe('ProseMirrorFacade', () => {
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
		EditorState.create.mockRestore();
	}

	function getOutputElement(element: HTMLElement): HTMLElement {
		return element.querySelector('[contenteditable="true"]') as HTMLElement;
	}

	let EditorViewMock: MockedObject<typeof EditorView>;
	let facadeInstance: ProseMirrorFacade;

	beforeEach(async () => {
		EditorViewMock = vi.mocked(EditorView);
		EditorViewMock.mockReset();
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
			const element = document.createElement('div');
			facadeInstance.init(element);

			expect(EditorState.create).toHaveBeenCalledWith({
				schema: VVD_PROSE_MIRROR_SCHEMA,
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

			const element = document.createElement('div');
			facadeInstance.init(element);
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
			async function setFirstSelectionInState(mockStateSelection) {
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
			await setFirstSelectionInState(MOCK_STATE);

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
	});
});
