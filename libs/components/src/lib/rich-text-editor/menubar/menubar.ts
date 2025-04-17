import { attr, observable } from '@microsoft/fast-element';
import { VividElement } from '../../../shared/foundation/vivid-element/vivid-element';
import type { RichTextEditor } from '../rich-text-editor';

export class MenuBar extends VividElement {
	@attr({ attribute: 'menu-items' })
	menuItems?: string;

	@observable
	textStylesState: Record<string, any> = {};

	get #textEditorElement() {
		return this.parentElement as RichTextEditor;
	}

	#updateTextStyleState: EventListener = ((event: Event) => {
        this.textStylesState = (event as CustomEvent).detail;
    }) as EventListener;
	
	override connectedCallback(): void {
		super.connectedCallback();
		this.#textEditorElement.addEventListener('selection-changed', this.#updateTextStyleState);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#textEditorElement?.removeEventListener('selection-changed', this.#updateTextStyleState);
	}
}
