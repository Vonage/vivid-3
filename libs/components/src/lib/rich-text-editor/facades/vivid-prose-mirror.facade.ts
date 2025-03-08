import { EditorState, Selection } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import type { RichTextEditorSelection } from '../rich-text-editor';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema';

const NEGATIVE_SELECTION = {
	start: -1,
	end: -1,
};

function convertSelectionToVividFormat({
	to,
	from,
}: Selection): RichTextEditorSelection {
	return {
		start: from,
		end: to,
	};
}
export class ProseMirrorFacade {
	#state?: EditorState;
	#view?: EditorView;

	init(element: HTMLElement) {
		if (!(element instanceof HTMLElement)) {
			throw new Error(
				'ProseMirror Facade init accepts a valid HTMLElement as its first parameter'
			);
		}

		this.#state = EditorState.create({ schema: VVD_PROSE_MIRROR_SCHEMA });
		this.#view = new EditorView(element, { state: this.#state });
	}

	replaceContent(content: string) {
		if (!this.#state || !this.#view) {
			throw new Error(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		}
		const parser = DOMParser.fromSchema(VVD_PROSE_MIRROR_SCHEMA);
		const doc = parser.parse(
			new window.DOMParser().parseFromString(content, 'text/html').body
		);
		const transaction = this.#state.tr.replaceWith(
			0,
			this.#state.doc.content.size,
			doc.content
		);

		this.#view.dispatch(transaction);
	}

	selection(): RichTextEditorSelection {
		return !this.#state
			? NEGATIVE_SELECTION
			: convertSelectionToVividFormat(this.#state.selection);
	}
}
