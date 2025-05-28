import { EditorView, minimalSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { bracketMatching, indentUnit } from '@codemirror/language';
import { html } from '@codemirror/lang-html';
import { Compartment } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import enUS from '@vonage/vivid/locales/en-US';
import enGB from '@vonage/vivid/locales/en-GB';
import deDE from '@vonage/vivid/locales/de-DE';
import zhCN from '@vonage/vivid/locales/zh-CN';
import jaJP from '@vonage/vivid/locales/ja-JP';
import { getCurrentThemeCss } from './theme-handler';

const samplesEditors = new Map();
const theme = new Compartment();

function setEditorsTheme() {
	for (const { view } of samplesEditors.values()) {
		view.dispatch({ effects: theme.reconfigure(oneDark) });
	}
}

function addButtonsHandlers() {
	const copyCodeButtons = document.querySelectorAll(
		'vwc-button[id^="buttonCopy"]'
	);
	copyCodeButtons.forEach((btn) =>
		btn.addEventListener('click', codeCopyButtonClick)
	);

	const codePenButtons = document.querySelectorAll(
		'vwc-button[id^="buttonCPen"]'
	);
	codePenButtons.forEach((btn) => btn.addEventListener('click', openCodePen));
}

function updateiFrameCode(id) {
	const { view, iframe } = samplesEditors.get(id);

	const placeholder = iframe.contentDocument.querySelector('#_target');
	const updatedCode = view.state.doc.toString().trim();
	const replacement = iframe.contentDocument
		.createRange()
		.createContextualFragment(updatedCode);

	placeholder.replaceChildren(replacement);

	return true;
}

function addSamplesEditors() {
	const codeBlocks = document.querySelectorAll('.cbd-live-sample');

	codeBlocks.forEach((cbd) => {
		const code = cbd.textContent.trim();
		cbd.innerHTML = '';
		const id = cbd.dataset.exampleId;

		const iframe = document.querySelector(`#iframe-sample-${id}`);
		const view = new EditorView({
			doc: code,
			extensions: [
				keymap.of([{ key: 'Ctrl-Enter', run: () => updateiFrameCode(id) }]),
				theme.of(EditorView.theme({})),
				EditorView.updateListener.of(sampleChanged(id)),
				minimalSetup,
				bracketMatching(),
				html(),
				indentUnit.of('\t'),
			],
			parent: cbd,
			root: window.document,
		});

		samplesEditors.set(id, {
			view,
			iframe,
		});
	});

	setEditorsTheme();
}

function sampleChanged(id) {
	let debounceID;

	return (v) => {
		if (!v.docChanged) return;

		clearTimeout(debounceID);
		debounceID = setTimeout(() => updateiFrameCode(id), 500);
	};
}

function codeCopyButtonClick(event) {
	const button = event.target;
	const { view } = samplesEditors.get(button.dataset.exampleId);

	navigator.clipboard
		.writeText(view.state.doc.toString().trim())
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
	const { view } = samplesEditors.get(button.dataset.exampleId);

	const codePenPayload = JSON.stringify({
		html: `<div class="vvd-root">\n${view.state.doc.toString().trim()}\n</div>`,
		head: `<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >
		<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >`,
		css: `@import "https://unpkg.com/@vonage/vivid@latest/styles/tokens/theme-light.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/core/all.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/fonts/spezia-variable.css";`,
		js: button.dataset.deps
			.split(',')
			.map((d) => `import 'https://unpkg.com/@vonage/vivid@latest/${d}';`)
			.join('\n'),
	})
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

	if (!codePenForm) {
		codePenForm = document.createElement('form');
		Object.assign(codePenForm, {
			action: 'https://codepen.io/pen/define',
			method: 'post',
			target: '_blank',
		});
		document.lastElementChild.insertAdjacentElement('beforeend', codePenForm);
	}
	codePenForm.innerHTML = `<input type="hidden" name="data" value="${codePenPayload}"/>`;
	codePenForm.submit();
}

const locales = {
	'en-US': enUS,
	'en-GB': enGB,
	'de-DE': deDE,
	'zh-CN': zhCN,
	'ja-JP': jaJP,
};

function addLocaleSwitcher() {
	const DefaultLocale = 'en-US';

	const localeSelects = document.querySelectorAll(
		'vwc-select[id^="selectLocale"]'
	);
	localeSelects.forEach((localeSelect) => {
		// Ensure default is first
		localeSelect.innerHTML += `<vwc-option value='${DefaultLocale}' text='${DefaultLocale}' selected></vwc-option>`;
		for (const locale of Object.keys(locales).filter(
			(locale) => locale !== DefaultLocale
		)) {
			localeSelect.innerHTML += `<vwc-option value='${locale}' text='${locale}'></vwc-option>`;
		}
		localeSelect.addEventListener('change', switchLocale);
	});
}

function switchLocale(event) {
	const select = event.target;
	const { iframe } = samplesEditors.get(select.dataset.exampleId);

	iframe.contentWindow.setLocale(locales[select.value]);
	iframe.contentWindow.document.documentElement.lang = select.value;
}

function cleanupEditors() {
	for (const { view } of samplesEditors.values()) {
		view.destroy();
	}
	samplesEditors.clear();
}

function setupLiveSamples() {
	cleanupEditors();
	addSamplesEditors();
	addButtonsHandlers();
	addLocaleSwitcher();
}

window.codeBlockButtonClick = (button) => {
	const details = button.closest('.cbd-actions').nextElementSibling;
	details.open = !details.open;
	button.ariaExpanded = details.open;
};

const iframeObservers = new WeakMap();

const autoResize = (iFrame) => {
	new ResizeObserver((entries, observer) => {
		if (entries.length === 0) return;
		iFrame.style.height = Math.max(30, entries[0].contentRect.height) + 'px';
		clearTimeout(iframeObservers.get(iFrame));
		iframeObservers.set(
			iFrame,
			setTimeout(() => {
				observer.disconnect();
				iframeObservers.delete(iFrame);
			}, 3000)
		);
	}).observe(iFrame.contentWindow.document.documentElement);
};

const setIframeTheme = (iFrame) => {
	iFrame.contentWindow.document.getElementById('vivid-theme')?.remove();

	const themeStyle = iFrame.contentWindow.document.createElement('style');
	themeStyle.id = 'vivid-theme';
	themeStyle.textContent = getCurrentThemeCss();
	iFrame.contentWindow.document.head.appendChild(themeStyle);

	iFrame.contentWindow.document.body.classList.remove('page-not-ready');
};

const updateThemeOfAllIframes = () => {
	for (const iframe of document.querySelectorAll('[data-vivid-iframe]')) {
		setIframeTheme(iframe);
	}
};

const setupIframeThemeUpdates = () => {
	document
		.querySelector('vwc-menu#dark-mode-menu')
		.addEventListener('change', updateThemeOfAllIframes);
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', updateThemeOfAllIframes);
};
window.addEventListener('load', setupIframeThemeUpdates);

window.onloadIframe = (iFrame) => {
	iFrame.setAttribute('data-vivid-iframe', '');
	setIframeTheme(iFrame);
	autoResize(iFrame);
};

// Handle iframes that were loaded before the script
window._bufferedLoadedIFrames.forEach(window.onloadIframe);
delete window._bufferedLoadedIFrames;

window.addEventListener('load', setupLiveSamples);
window.addEventListener('htmx:afterSwap', setupLiveSamples);
