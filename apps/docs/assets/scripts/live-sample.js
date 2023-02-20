import { EditorView, minimalSetup } from "codemirror"
import { keymap } from "@codemirror/view"
import { bracketMatching } from "@codemirror/language"
import { html } from "@codemirror/lang-html"
import { Compartment } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'

window.onload = () => {
	addSamplesEditors();
	addButtonsHandlers();
};

const samplesEditors = new Map();
const theme = new Compartment();

window.setEditorsTheme = function() {
	for (const {view} of samplesEditors.values()) {
		view.dispatch({ effects: theme.reconfigure(window._darkTheme ? oneDark : EditorView.theme({})) });
	}
}

function addButtonsHandlers() {
	const copyCodeButtons = document.querySelectorAll('vwc-button[icon="copy-2-line"]')
	copyCodeButtons.forEach(btn => btn.addEventListener('click', codeCopyButtonClick))
}

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
				theme.of(EditorView.theme({})),
				EditorView.updateListener.of(sampleChanged(idx)),
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
		});
	});
	
	setEditorsTheme();
}

function sampleChanged(idx) {
	let debounceID;
	
	return v => {
		if (!v.docChanged) return;
		
		clearTimeout(debounceID);
		debounceID = setTimeout(() => updateiFrameCode(idx), 500)
	}
}

function codeCopyButtonClick(event) {
	const button = event.target;
	const { view } = samplesEditors.get(+button.dataset.index);

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