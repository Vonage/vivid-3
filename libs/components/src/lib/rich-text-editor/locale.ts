export interface RichTextEditorLocale {
	paragraphStyles: string;
	textSize: string;
	bold: string;
	italic: string;
	underline: string;
	strikethrough: string;
	monospace: string;
	textColor: string;
	undo: string;
	redo: string;
	bulletList: string;
	numberedList: string;
	alignment: string;
	alignments: {
		left: string;
		center: string;
		right: string;
	};
	hyperlink: string;
	linkText: string;
	linkUrl: string;
	linkTextPlaceholder: string;
	linkUrlPlaceholder: string;
	cancel: string;
	apply: string;
	close: string;
	edit: string;
	delete: string;
	imageSizes: {
		small: string;
		fit: string;
		original: string;
	};
}
