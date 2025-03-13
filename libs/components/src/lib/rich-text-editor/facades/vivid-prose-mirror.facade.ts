import {
	EditorState,
	Plugin,
	Selection,
	TextSelection,
} from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import type { RichTextEditorSelection } from '../rich-text-editor';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema';

const NEGATIVE_SELECTION = {
	start: -1,
	end: -1,
};

function createSelectionChangePlugin(
	onSelectionChange: (selection: RichTextEditorSelection) => void
) {
	return new Plugin({
		view: () => ({
			update: (view, prevState) => {
				const { from, to } = view.state.selection;
				const { from: prevFrom, to: prevTo } = prevState.selection;
				if (from !== prevFrom || to !== prevTo) {
					onSelectionChange({ start: from, end: to });
				}
			},
		}),
	});
}

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
	#view?: EditorView;

	#onSelectionChange = () => {
		this.#eventHandler.dispatchEvent(new CustomEvent('selection-changed'));
	};

	init(element: HTMLElement) {
		if (!(element instanceof HTMLElement)) {
			throw new Error(
				'ProseMirror Facade init accepts a valid HTMLElement as its first parameter'
			);
		}

		const plugins = [
			createSelectionChangePlugin(this.#onSelectionChange),
			keymap(baseKeymap),
		];
		const state = EditorState.create({
			schema: VVD_PROSE_MIRROR_SCHEMA,
			plugins,
		});
		this.#view = new EditorView(element, { state });
	}

	replaceContent(content: string) {
		if (!this.#view) {
			throw new Error(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		}
		const parser = DOMParser.fromSchema(VVD_PROSE_MIRROR_SCHEMA);
		const doc = parser.parse(
			new window.DOMParser().parseFromString(content, 'text/html').body
		);
		const transaction = this.#view.state.tr.replaceWith(
			0,
			this.#view.state.doc.content.size,
			doc.content
		);

		this.#view.dispatch(transaction);
	}

	selection(position?: RichTextEditorSelection): RichTextEditorSelection {
		if (this.#view && position) {
			const transaction = this.#view.state.tr.setSelection(
				TextSelection.create(this.#view.state.doc, position.start, position.end)
			);
			this.#view.dispatch(transaction);
		}

		return !this.#view
			? NEGATIVE_SELECTION
			: convertSelectionToVividFormat(this.#view.state.selection);
	}

	#eventHandler = document.createElement('div');
	addEventListener(
		eventName: string,
		callback: EventListenerOrEventListenerObject
	) {
		this.#eventHandler.addEventListener(eventName, callback);
	}
}
