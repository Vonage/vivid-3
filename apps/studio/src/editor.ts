import { EditorView, basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';

export interface StudioEditor {
	view: EditorView;
	getValue(): string;
	setValue(value: string): void;
	insertSnippet(snippet: string): void;
}

export function createEditor(
	parent: HTMLElement,
	initialValue: string,
	onChange: (value: string) => void
): StudioEditor {
	const view = new EditorView({
		parent,
		state: makeState(initialValue),
	});

	function makeState(doc: string): EditorState {
		return EditorState.create({
			doc,
			extensions: [
				basicSetup,
				keymap.of([indentWithTab]),
				html(),
				oneDark,
				EditorView.lineWrapping,
				EditorView.theme({
					'&': { height: '100%', fontSize: '13px' },
					'.cm-scroller': {
						fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
					},
				}),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) onChange(update.state.doc.toString());
				}),
			],
		});
	}

	return {
		view,
		getValue: () => view.state.doc.toString(),
		setValue(value) {
			view.setState(makeState(value));
		},
		insertSnippet(snippet) {
			const { from, to } = view.state.selection.main;
			const line = view.state.doc.lineAt(from);
			// Insert on a fresh line if the cursor line already has content.
			const needsNewline = line.length > 0 && from === line.to;
			const insert = needsNewline ? `\n${snippet}` : snippet;
			view.dispatch({
				changes: { from, to, insert },
				selection: { anchor: from + insert.length },
				scrollIntoView: true,
			});
			view.focus();
		},
	};
}
