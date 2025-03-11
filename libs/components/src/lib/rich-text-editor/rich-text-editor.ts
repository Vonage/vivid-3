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

	get selection(): RichTextEditorSelection | undefined {
		return this.#editor?.selection();
	}

	set selection(value: RichTextEditorSelection) {
		this.#editor?.selection(value);
	}

	@attr({converter: nullableNumberConverter, attribute: 'selection-start'}) selectionStart:number | null = null;

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
