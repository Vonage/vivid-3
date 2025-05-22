import {
	EditorState,
	Plugin,
	PluginKey,
	Selection,
	TextSelection,
} from 'prosemirror-state';
import { DOMParser, Node } from 'prosemirror-model';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import type {
	RichTextEditorInlineImageProps,
	RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES,
	RichTextEditorSelection,
	SelectionStyles,
} from '../rich-text-editor';
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

function setTextBlockType(styles: SelectionStyles, type: string) {
	if (
		(styles.textBlockType && styles.textBlockType !== type) ||
		styles.textBlockType === ''
	) {
		styles.textBlockType = '';
	} else {
		styles.textBlockType = type;
	}
}

function createEnterKeymapPlugin() {
	return keymap({
		['Shift-Enter']: (state, dispatch) => {
			const { schema } = state;
			const br = schema.nodes.hard_break;
			const { $from, $to } = state.selection;
			if ($from.sameParent($to)) {
				dispatch &&
					dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
			} else {
				if (dispatch) {
					const tr = state.tr;

					const lastSelectionBlock = state.doc.resolve($to.end());

					tr.delete(lastSelectionBlock.start(), $to.pos);
					tr.delete($from.pos, lastSelectionBlock.start() - 1);
					tr.insert($from.pos, br.create());

					const newSelection = TextSelection.create(tr.doc, $from.pos + 1);
					tr.setSelection(newSelection);

					dispatch(tr.scrollIntoView());
				}
			}
			return true;
		},
		Enter: (state, dispatch) => {
			const { schema } = state;
			const paragraph = schema.nodes.paragraph;
			const { $from, empty } = state.selection;

			if (!empty || $from.parent.type !== paragraph) {
				return false;
			}

			const tr = state.tr;

			const marks = $from.marks();
			tr.split($from.pos);

			if (marks.length > 0) {
				const newParaStart = $from.pos + 1;

				const zeroWidthSpace = '\u200B';
				const content = schema.text(zeroWidthSpace, marks);

				tr.insert(newParaStart, content);

				tr.setSelection(TextSelection.create(tr.doc, newParaStart + 1));
			}

			dispatch && dispatch(tr.scrollIntoView());
			return true;
		},
	});
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

const isEmptyParagraph = (node: Node): boolean => {
	return node.type.name === 'paragraph' && node.nodeSize === 2;
};

const DEFAULT_TEXT_EDITOR_PLACEHOLDER = 'Start typing...';

export const placeholderPluginKey = new PluginKey('placeholderPlugin');

export const createPlaceholderPlugin = (
	placeholder = DEFAULT_TEXT_EDITOR_PLACEHOLDER
) => {
	return new Plugin({
		key: placeholderPluginKey,
		props: {
			decorations(state) {
				const { $from } = state.selection;
				const decorations: Decoration[] = [];
				if (state.doc.childCount === 1 && isEmptyParagraph($from.parent)) {
					const decoration = Decoration.node($from.before(), $from.after(), {
						'data-placeholder': placeholder,
						class: 'placeholder',
					});
					decorations.push(decoration);
				}
				return DecorationSet.create(state.doc, decorations);
			},
		},
	});
};

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
			this.#userContentChange = false;
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
			createPlaceholderPlugin(),
			createSelectionChangePlugin(this.#onSelectionChange),
			createEnterKeymapPlugin(),
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

	updatePlaceholder(placeholderText?: string) {
		this.#verifyViewInitiation();

		const { state } = this.#view!;
		const plugins = state.plugins.filter(
			(plugin) => plugin !== placeholderPluginKey.get(state)
		);

		const newPlaceholderPlugin = createPlaceholderPlugin(placeholderText);

		const newState = state.reconfigure({
			plugins: [...plugins, newPlaceholderPlugin],
		});

		this.#view!.updateState(newState);
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
		this.#verifyViewInitiation();

		const SUPPORTED_DECORATIONS = {
			bold: 'strong',
			italics: 'em',
			underline: 'u',
			strikethrough: 's',
			monospace: 'tt',
		};
		const { state, dispatch } = this.#view!;

		const decorationKey = decoration as keyof typeof SUPPORTED_DECORATIONS;
		const markType = state.schema.marks[SUPPORTED_DECORATIONS[decorationKey]];
		if (!markType) {
			throw new Error(`${decoration} is not a supported decoration`);
		}
		toggleMark(markType)(state, dispatch);
		this.#userContentChange = true;
		this.#handleChangeEvent();
	}

	#getSelectionBlockType() {
		const { state } = this.#view!;
		const { from, to } = state.selection;

		const styles: SelectionStyles = {};
		state.doc.nodesBetween(from, to, (node) => {
			if (node.type.name === 'heading' && node.attrs.level === 2) {
				setTextBlockType(styles, 'title');
			} else if (node.type.name === 'heading' && node.attrs.level === 3) {
				setTextBlockType(styles, 'subtitle');
			} else if (node.type.name === 'paragraph') {
				setTextBlockType(styles, 'body');
			}
		});
		return styles.textBlockType;
	}

	#getSelectionTextDecoration() {
		const { state } = this.#view!;
		const { from, to, empty } = state.selection;

		const decorations: string[] = [];
		if (empty) {
			// If the selection is a cursor (collapsed), check marks at the cursor position
			const marks = state.doc.resolve(from).marks();
			if (
				state.schema.marks.strong &&
				marks.some((mark) => mark.type === state.schema.marks.strong)
			) {
				decorations.push('bold');
			}
			if (
				state.schema.marks.em &&
				marks.some((mark) => mark.type === state.schema.marks.em)
			) {
				decorations.push('italics');
			}
			if (
				state.schema.marks.u &&
				marks.some((mark) => mark.type === state.schema.marks.u)
			) {
				decorations.push('underline');
			}
			if (
				state.schema.marks.s &&
				marks.some((mark) => mark.type === state.schema.marks.s)
			) {
				decorations.push('strikethrough');
			}
			if (
				state.schema.marks.tt &&
				marks.some((mark) => mark.type === state.schema.marks.tt)
			) {
				decorations.push('monospace');
			}
		} else {
			// If the selection is a range, check marks across the range
			if (
				state.schema.marks.strong &&
				state.doc.rangeHasMark(from, to, state.schema.marks.strong)
			) {
				decorations.push('bold');
			}
			if (
				state.schema.marks.em &&
				state.doc.rangeHasMark(from, to, state.schema.marks.em)
			) {
				decorations.push('italics');
			}
			if (
				state.schema.marks.u &&
				state.doc.rangeHasMark(from, to, state.schema.marks.u)
			) {
				decorations.push('underline');
			}
			if (
				state.schema.marks.s &&
				state.doc.rangeHasMark(from, to, state.schema.marks.s)
			) {
				decorations.push('strikethrough');
			}
			if (
				state.schema.marks.tt &&
				state.doc.rangeHasMark(from, to, state.schema.marks.tt)
			) {
				decorations.push('monospace');
			}
		}

		return decorations.length ? decorations : undefined;
	}

	#getSelectionTextSize() {
		const { state } = this.#view!;
		const { from, to, empty } = state.selection;

		const defaultSize = 'normal';

		if (empty) {
			const marks = state.doc.resolve(from).marks();
			const textSizeMark = marks.find(
				(mark) => mark.type === state.schema.marks.textSize
			);
			return textSizeMark ? textSizeMark.attrs.size : defaultSize;
		} else {
			let textSize: string | null = null;
			let foundMixedSizes = false;

			state.doc.nodesBetween(from, to, (node) => {
				if (node.isText) {
					const mark = node.marks.find(
						(mark) => mark.type === state.schema.marks.textSize
					);

					if (mark) {
						if (textSize === null) {
							textSize = mark.attrs.size;
						} else if (textSize !== mark.attrs.size) {
							foundMixedSizes = true;
							return false;
						}
					} else if (textSize !== null) {
						foundMixedSizes = true;
						return false;
					}
				}
				return true;
			});

			if (foundMixedSizes) {
				return '';
			}

			return textSize !== null ? textSize : defaultSize;
		}
	}

	getSelectionStyles(): SelectionStyles {
		this.#verifyViewInitiation();

		const styles: SelectionStyles = {};

		styles.textBlockType = this.#getSelectionBlockType();
		styles.textDecoration = this.#getSelectionTextDecoration();
		styles.textSize = this.#getSelectionTextSize();

		return styles;
	}

	setTextSize(size: RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES = 'normal') {
		this.#verifyViewInitiation();

		const { state, dispatch } = this.#view!;
		const { schema, selection, tr } = state;
		const { from, to } = selection;

		const textSizeMark = schema.marks.textSize;

		tr.removeMark(from, to, textSizeMark);

		tr.addMark(from, to, textSizeMark.create({ size }));

		// Dispatch the transaction
		dispatch(tr.scrollIntoView());
		this.#userContentChange = true;
		this.#handleChangeEvent();
	}

	getValue(): string {
		return this.#view!.dom.innerHTML;
	}

	async addInlineImage({
		file,
		position,
		alt,
	}: RichTextEditorInlineImageProps): Promise<void> {
		this.#verifyViewInitiation();

		const reader = new FileReader();
		const src: string = await new Promise((resolve, reject) => {
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});

		const { state, dispatch } = this.#view!;
		const { schema } = state;
		const imageAlt = alt ?? `inline image from file ${file.name}`;
		const imageNode = schema.nodes.image.create({ src, alt: imageAlt });

		let insertPos = position;
		if (typeof insertPos !== 'number') {
			insertPos = state.selection.from;
		}

		const tr = state.tr.insert(insertPos, imageNode);
		dispatch(tr.scrollIntoView());
	}
}
