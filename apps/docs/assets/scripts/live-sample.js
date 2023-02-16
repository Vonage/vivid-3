import { EditorView, minimalSetup } from "codemirror"
import { keymap } from "@codemirror/view"
import { bracketMatching } from "@codemirror/language"
import { html } from "@codemirror/lang-html"

window.onload = () => {
	addSamplesEditors();
	window.updateiFrameCode = updateiFrameCode;
	window.codeCopyButtonClick = codeCopyButtonClick;
};

const samplesEditors = new Map();

function updateiFrameCode(idx) {
	const { view, iframe } = samplesEditors.get(idx);

	const placeholder = iframe.contentDocument.querySelector('#_target');
	const updatedCode = view.state.doc.toString().trim();
	const replacement = iframe.contentDocument.createRange().createContextualFragment(updatedCode);

	placeholder.replaceChildren(replacement);

	return true;
}

function addSamplesEditors() {
	const codeBlocks = document.querySelectorAll('.cbd-live-sample');

	codeBlocks.forEach(cbd => {
		const code = cbd.textContent.trim();
		cbd.innerHTML = '';
		const idx = +cbd.dataset.index;

		const iframe = document.querySelector(`#iframe-sample-${idx}`);
		const view = new EditorView({
			doc: code,
			extensions: [
				keymap.of([{ key: "Ctrl-Enter", run: () => updateiFrameCode(idx) }]),
				minimalSetup,
				bracketMatching(),
				html()
			],
			parent: cbd,
			root: window.document
		});

		samplesEditors.set(idx, {
			view,
			iframe
		})
	});
}

function codeCopyButtonClick(idx, button) {
	const { view } = samplesEditors.get(idx);

	navigator.clipboard.writeText(view.state.doc.toString().trim())
		.then(() => {
		/* clipboard successfully set */
		button.icon = 'check-line';
		})
		.catch(() => {
		/* clipboard write failed */
		button.icon = 'close-line';
		});

	setTimeout(() => {
		button.icon = 'copy-2-line';
	}, 1000);
}