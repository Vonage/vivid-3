import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view"
import { html } from "@codemirror/lang-html"

window.onload = () => {
	addEditors();
};

function test(view, idx) {
	const iframe = document.querySelector(`#iframe-sample-${idx}`);
	const placeholder = iframe.contentDocument.querySelector('#replaceme');

	const replacement = document.createRange().createContextualFragment(view.state.doc.toString().trim());
	placeholder.replaceChildren(replacement);

	// const replacement = document.createElement('template');
	// replacement.innerHTML = view.state.doc.toString().trim();
	
	// placeholder.replaceChildren(replacement.content);

	return true;
}

function addEditors() {
	const codeBlocks = document.querySelectorAll('.cbd-live-sample');

	codeBlocks.forEach(cbd => {
		const prevCodeBlock = cbd.previousElementSibling;
		const idx = prevCodeBlock.id[prevCodeBlock.id.length - 1];
		const editor = new EditorView({
			doc: prevCodeBlock.textContent.trim(),
			extensions: [
				keymap.of([{ key: "Ctrl-Enter", run: (view) => test(view, idx) }]),
				basicSetup,
				html()
			],
			parent: cbd,
			root: window.document
		});
		
		prevCodeBlock.style.display = 'none';
	});
}