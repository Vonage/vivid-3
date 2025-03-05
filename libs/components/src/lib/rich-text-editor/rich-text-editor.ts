import { attr } from '@microsoft/fast-element';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DOMParser } from 'prosemirror-model';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

const vividProseMirrorSchema = schema;

/**
 * @public
 * @component rich-text-editor
 */
export class RichTextEditor extends VividElement {
	/**
	 * Indicates the rich text editor's value.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr value?: string;

	#state?: EditorState;
	#view?: EditorView;

	valueChanged(_: string, newValue: string): void {
		if (this.#view) {
			const parser = DOMParser.fromSchema(vividProseMirrorSchema);
			const doc = parser.parse(
				new window.DOMParser().parseFromString(newValue, 'text/html').body
			);
			const transaction = this.#state!.tr.replaceWith(
				0,
				this.#state!.doc.content.size,
				doc.content
			);
			this.#view!.dispatch(transaction);
		}
	}

	get #editorWrapperElement(): HTMLElement {
		return this.shadowRoot!.querySelector('#editor') as HTMLElement;
	}

	constructor() {
		super();
		this.value = '';
	}

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.#state) {
			this.#state = EditorState.create({ schema: vividProseMirrorSchema });
		}

		if (!this.#view) {
			this.#view = new EditorView(this.#editorWrapperElement, {
				state: this.#state,
			});
		}
	}
}
