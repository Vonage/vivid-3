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
	
	const codePenButtons = document.querySelectorAll('vwc-button[icon="open-line"]')
	codePenButtons.forEach(btn => btn.addEventListener('click', openCodePen))
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

let codePenForm = null;

function openCodePen(event) {
	const button = event.target;
	const { view } = samplesEditors.get(+button.dataset.index);

	const codePenPayload = JSON.stringify({
		html: `<div class="vvd-root">\n${view.state.doc.toString().trim()}\n</div>`,
		head: `<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >
		<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >`,
		css:  `@import "https://unpkg.com/@vonage/vivid@latest/styles/tokens/theme-light.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/core/all.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/fonts/spezia-variable.css";`,
		js:	  button.dataset.deps.split(',').map(d => `import 'https://unpkg.com/@vonage/vivid@latest/${d}';`).join('\n')
	}).replace(/"/g, '&quot;')
	  .replace(/'/g, '&apos;');

	if (!codePenForm) {
		codePenForm = document.createElement('form');
		Object.assign(codePenForm, {
			action: 'https://codepen.io/pen/define',
			method: 'post',
			target: '_blank'
		})
		document.lastElementChild.insertAdjacentElement('beforeend', codePenForm);
	}
	codePenForm.innerHTML = `<input type="hidden" name="data" value="${codePenPayload}"/>`;
	codePenForm.submit();
}

