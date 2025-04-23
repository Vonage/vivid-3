import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../../shared/foundation/vivid-element/vivid-element';
import type { RichTextEditor } from '../rich-text-editor';

export class MenuBar extends VividElement {
	@attr({ attribute: 'menu-items' })
	menuItems?: string;

	get #textEditorElement() {
		return this.parentElement as RichTextEditor;
	}

	#updateTextStyleState: EventListener = (() => {
		this.dispatchEvent(
			new CustomEvent('text-styles-changed', {
				detail: this.#textEditorElement?.selectionStyles,
			})
		);
	}) as EventListener;

	override connectedCallback(): void {
		super.connectedCallback();
		this.#textEditorElement.addEventListener(
			'selection-changed',
			this.#updateTextStyleState
		);
		this.#textEditorElement.addEventListener(
			'change',
			this.#updateTextStyleState
		);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#textEditorElement?.removeEventListener(
			'selection-changed',
			this.#updateTextStyleState
		);
		this.#textEditorElement?.removeEventListener(
			'change',
			this.#updateTextStyleState
		);
	}
}
