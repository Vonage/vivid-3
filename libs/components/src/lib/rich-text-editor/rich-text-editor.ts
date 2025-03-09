import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { ProseMirrorFacade } from './facades/vivid-prose-mirror.facade';

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
