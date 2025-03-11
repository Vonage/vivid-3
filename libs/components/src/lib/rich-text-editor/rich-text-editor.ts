import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { ProseMirrorFacade } from './facades/vivid-prose-mirror.facade';

export interface RichTextEditorSelection {
	start: number;
	end?: number;
}

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

	#editor?: ProseMirrorFacade;

	valueChanged(_: string, newValue: string): void {
		if (this.#editor) {
			this.#editor.replaceContent(newValue);
		}
	}

	get #editorWrapperElement(): HTMLElement {
		return this.shadowRoot!.querySelector('#editor') as HTMLElement;
	}

	@attr({ converter: nullableNumberConverter, attribute: 'selection-start' })
	selectionStart: number | null = null;
	selectionStartChanged() {
		if (!this.selectionStart) {
			return;
		}
		this.#updateEditorSelection();
	}

	#updateEditorSelection = () => {
		try {
			this.#editor?.selection({
				start: this.selectionStart!,
				end: this.selectionEnd ? this.selectionEnd : this.selectionStart!,
			});
		} catch (e: any) {
			console.warn(e.message);
		}
	};

	@attr({ converter: nullableNumberConverter, attribute: 'selection-end' })
	selectionEnd: number | null = null;
	selectionEndChanged() {
		if (this.selectionEnd && !this.selectionStart) {
			this.selectionStart = 1;
		}

		this.#updateEditorSelection();
	}
	constructor() {
		super();
		this.value = '';
	}

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.#editor) {
			this.#editor = new ProseMirrorFacade();
			this.#editor.init(this.#editorWrapperElement);
		}
	}
}
