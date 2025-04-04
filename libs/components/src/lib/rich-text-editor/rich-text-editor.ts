import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { ProseMirrorFacade } from './facades/vivid-prose-mirror.facade';

export interface RichTextEditorSelection {
	start: number;
	end?: number;
}

export const RichTextEditorTextSizes = {
	title: 'h2',
	subtitle: 'h3',
	body: 'p',
} as const;

export type RichTextEditorTextSizes = keyof typeof RichTextEditorTextSizes;

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
	get value(): string {
		return this.#editorWrapperElement.firstElementChild?.innerHTML as string;
	}

	set value(content: string) {
		if (this.#editor) {
			this.#editor.replaceContent(content);
		}
	}
	#editor?: ProseMirrorFacade;

	get #editorWrapperElement(): HTMLElement {
		return this.shadowRoot!.querySelector('#editor') as HTMLElement;
	}

	@attr({ converter: nullableNumberConverter, attribute: 'selection-start' })
	selectionStart: number | null = null;
	selectionStartChanged() {
		if (this.#selectionChangedByUser) {
			return;
		}
		if (
			!this.selectionStart ||
			(this.selectionEnd && this.selectionStart > this.selectionEnd)
		) {
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
			// eslint-disable-next-line no-console
			console.warn(e.message);
		}
	};

	@attr({ converter: nullableNumberConverter, attribute: 'selection-end' })
	selectionEnd: number | null = null;
	selectionEndChanged() {
		if (this.#selectionChangedByUser) {
			this.#selectionChangedByUser = false;
			return;
		}
		if (this.selectionEnd && !this.selectionStart) {
			this.selectionStart = 1;
		}

		this.#updateEditorSelection();
	}

	constructor() {
		super();
	}

	#selectionChangedByUser = false;

	#handleSelectionChange = () => {
		if (!this.#editor!.selection()) {
			return;
		}
		const { start, end } = this.#editor!.selection();
		this.#selectionChangedByUser = true;
		this.selectionStart = start;
		this.selectionEnd = end as number;
		this.$emit('selection-changed');
	};

	#handleChange = () => {
		this.$emit('change');
	};

	#handleInput = () => {
		this.$emit('input');
	};

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.#editor) {
			this.#editor = new ProseMirrorFacade();
			this.#editor.init(this.#editorWrapperElement);
			this.#editor.addEventListener(
				'selection-changed',
				this.#handleSelectionChange
			);
			this.#editor.addEventListener('change', this.#handleChange);
			this.#editor.addEventListener('input', this.#handleInput);
		}
	}

	setTextSize(size: 'title' | 'subtitle' | 'body') {
		try {
			this.#editor?.setSelectionTag(RichTextEditorTextSizes[size]);
		} catch (e: any) {
			// eslint-disable-next-line no-console
			console.warn(`Invalid text size: ${size}`);
		}
	}

	setSelectionDecoration(decoration: string) {
		try {
			this.#editor?.setSelectionDecoration(decoration);
		} catch (e: any) {
			// eslint-disable-next-line no-console
			console.warn(`Invalid decoration: ${decoration}`);
		}
	}
}
