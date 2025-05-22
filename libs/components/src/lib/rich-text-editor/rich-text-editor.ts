import { attr, DOM, nullableNumberConverter } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { ProseMirrorFacade } from './facades/vivid-prose-mirror.facade';

export type RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES =
	| 'extra-large'
	| 'large'
	| 'normal'
	| 'small';

export interface SelectionStyles {
	textBlockType?: string;
	textDecoration?: string[];
	textSize?: string;
}

export interface RichTextEditorSelection {
	start: number;
	end?: number;
}

export interface RichTextEditorInlineImageProps {
	file: File;
	position?: number;
	alt?: string;
}

export const RichTextEditorTextBlocks = {
	title: 'h2',
	subtitle: 'h3',
	body: 'p',
} as const;

export type RichTextEditorTextBlocks = keyof typeof RichTextEditorTextBlocks;

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
	get value(): string | undefined {
		return this.#editor?.getValue();
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
		if (this.selectionEnd && !this.selectionStart) {
			this.selectionStart = 1;
		}
		this.#updateEditorSelection();
	}

	@attr
	placeholder?: string;

	placeholderChanged() {
		this.#editor?.updatePlaceholder(this.placeholder);
	}

	constructor() {
		super();
	}

	#handleSelectionChange = () => {
		if (!this.#editor!.selection()) {
			return;
		}
		const { start, end } = this.#editor!.selection();
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
		this.placeholderChanged();
	}

	setTextBlock(blockType: 'title' | 'subtitle' | 'body') {
		try {
			this.#editor?.setSelectionTag(RichTextEditorTextBlocks[blockType]);
		} catch (e: any) {
			// eslint-disable-next-line no-console
			console.warn(`Invalid text block: ${blockType}`);
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

	setSelectionTextSize(textSize: RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES) {
		this.#editor?.setTextSize(textSize);
	}

	get selectionStyles(): SelectionStyles {
		if (!this.#editor) {
			return {};
		}
		return this.#editor.getSelectionStyles();
	}

	override focus() {
		super.focus();
		setTimeout(() => {
			this.#editableAreaElement.focus();
		}, 0);
	}

	get #editableAreaElement(): HTMLElement {
		return this.#editorWrapperElement.querySelector(
			'[contenteditable="true"]'
		) as HTMLElement;
	}

	scrollToAttachments(additionalPixels = 0) {
		DOM.queueUpdate(() => {
			this.#editorWrapperElement.scrollTop =
				this.#editableAreaElement.getBoundingClientRect().height -
				this.#editorWrapperElement.getBoundingClientRect().height +
				additionalPixels;
		});
	}

	async addInlineImage(imageProps: {
		file: File;
		position?: number;
		alt?: string;
	}) {
		try {
			await this.#editor!.addInlineImage(imageProps);
		} catch (e: any) {
			console.warn(e.message);
		}
	}
}
