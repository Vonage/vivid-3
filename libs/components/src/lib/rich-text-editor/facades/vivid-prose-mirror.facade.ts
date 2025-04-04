import {
	EditorState,
	Plugin,
	Selection,
	TextSelection,
} from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import type { RichTextEditorSelection } from '../rich-text-editor';
import VVD_PROSE_MIRROR_SCHEMA from './prose-mirror-vivid.schema';

const NEGATIVE_SELECTION = {
	start: -1,
	end: -1,
};

interface NodeDefinition {
	type: string;
	attrs: Record<string, any>;
}

class TagToSchemaMap {
	static [key: string]: NodeDefinition;
	static get h2() {
		return {
			type: 'heading',
			attrs: { level: 2 },
		};
	}

	static get h3() {
		return {
			type: 'heading',
			attrs: { level: 3 },
		};
	}

	static get p() {
		return {
			type: 'paragraph',
			attrs: {},
		};
	}
}
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
	#userContentChange = false;
	#view?: EditorView;

	#verifyViewInitiation() {
		if (!this.#view) {
			throw new Error(
				'ProseMirror was not initiated. Please use the `init` method first.'
			);
		}
	}

	#onSelectionChange = () => {
		this.#dispatchEvent('selection-changed');
	};

	#handleInputEvent = (e: Event) => {
		e.stopPropagation();
		this.#userContentChange = true;
		this.#dispatchEvent('input');
	};

	#handleChangeEvent = () => {
		if (!this.#userContentChange) {
			return;
		}
		this.#dispatchEvent('change');
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
		this.#view.dom.addEventListener('input', this.#handleInputEvent);
		this.#view.dom.addEventListener('blur', this.#handleChangeEvent);
	}

	replaceContent(content: string) {
		this.#verifyViewInitiation();
		const parser = DOMParser.fromSchema(VVD_PROSE_MIRROR_SCHEMA);
		const doc = parser.parse(
			new window.DOMParser().parseFromString(content, 'text/html').body
		);
		const transaction = this.#view!.state.tr.replaceWith(
			0,
			this.#view!.state.doc.content.size,
			doc.content
		);

		this.#view!.dispatch(transaction);
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

	#dispatchEvent = (eventName: string, detail?: any) => {
		this.#eventHandler.dispatchEvent(new CustomEvent(eventName, { detail }));
	};

	setSelectionTag(tag: string) {
		this.#verifyViewInitiation();

		const nodeDefinitions = TagToSchemaMap[tag] ?? {
			type: tag,
		};

		const { state, dispatch } = this.#view!;
		const { from, to } = state.selection;
		const tr = state.tr;

		state.doc.nodesBetween(from, to, (node) => {
			const nodeType = state.schema.nodes[nodeDefinitions.type];

			if (!nodeType) {
				throw new Error('Node type tag does not exist in the schema');
			}

			if (node.type === nodeType) {
				return;
			}

			tr.setBlockType(from, to, nodeType, nodeDefinitions.attrs);
		});

		dispatch(tr);
	}

	setSelectionDecoration(decoration: string) {
		const SUPPORTED_DECORATIONS = {
			bold: 'strong',
			italics: 'em',
			underline: 'u',
			strikethrough: 's',
			monospace: 'tt',
		};

		this.#verifyViewInitiation();

		const { state, dispatch } = this.#view!;

		const decorationKey = decoration as keyof typeof SUPPORTED_DECORATIONS;
		const markType = state.schema.marks[SUPPORTED_DECORATIONS[decorationKey]];
		if (!markType) {
			throw new Error(`${decoration} is not a supported decoration`);
		}
		toggleMark(markType)(state, dispatch);
	}
}
