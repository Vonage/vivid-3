import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { MockedObject } from 'vitest';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema.ts';
import { ProseMirrorFacade } from './vivid-prose-mirror.facade.ts';

vi.mock('prosemirror-view', () => ({
	EditorView: vi.fn(),
}));

describe('ProseMirrorFacade', () => {
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

	it('should be defined', async () => {
		expect(facadeInstance instanceof ProseMirrorFacade).toBe(true);
	});

	describe('init()', () => {
		let StateMock = {};

		beforeEach(async () => {
			StateMock = {};
			vi.spyOn(EditorState, 'create').mockReturnValue(StateMock as any);
		});

		afterEach(() => {
			vi.restoreAllMocks();
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
});
