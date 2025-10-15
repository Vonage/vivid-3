import { EditorView, minimalSetup } from 'codemirror';
import { bracketMatching, indentUnit } from '@codemirror/language';
import { html as codeMirrorHtml } from '@codemirror/lang-html';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {
	attr,
	css,
	customElement,
	FASTElement,
	html,
	observable,
	ref,
	repeat,
	when,
} from '@microsoft/fast-element';
import _ from 'lodash';
import { getCurrentThemeCss } from '../theme-handler';
import { deDE, enGB, enUS, jaJP, zhCN } from '../locales-bundle';
import type { ViewUpdate } from '@codemirror/view';

const locales = {
	'en-US': enUS,
	'en-GB': enGB,
	'de-DE': deDE,
	'zh-CN': zhCN,
	'ja-JP': jaJP,
};

@customElement({
	name: 'docs-live-sample',
	styles: css`
		:host {
			display: block;
		}

		.container {
			position: relative;
		}

		iframe {
			overflow: hidden;
			width: 100%;
			border: none;
			border-radius: 8px 8px 0 0;
			block-size: 30px;
		}

		.actions {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.locale-switcher {
			margin: 8px;
		}

		#details > summary {
			display: none;
		}
	`,
	template: html<LiveSample>`
		<div class="container">
			<slot></slot>
			<vwc-card elevation="0">
				<iframe
					${ref('iframeEl')}
					src="${(x) => x.exampleSrc}"
					@load="${(x) => x.onIframeLoad()}"
					loading="lazy"
					aria-label="code block preview iframe"
					slot="main"
				></iframe>
				${when(
					(x) => !x.hideToolbar,
					html` <div class="actions" slot="main">
						<div>
							${when(
								(x) => x.localeSwitcher,
								html`<vwc-select
									class="locale-switcher"
									icon="globe-line"
									aria-label="Locale"
									:value="${(x) => x.locale}"
									@change="${(x, c) => x.onChangeLocale(c.event)}"
								>
									${repeat(
										() => Object.keys(locales),
										html`
											<vwc-option
												value="${(x) => x}"
												text="${(x) => x}"
											></vwc-option>
										`
									)}
								</vwc-select>`
							)}
						</div>
						<vwc-action-group appearance="ghost" style="direction: rtl;">
							${when(
								(x) => x.canOpenOnCodePen,
								html`<vwc-tooltip
									text="Edit on CodePen"
									placement="top"
									exportparts="vvd-theme-alternate"
								>
									<vwc-button
										slot="anchor"
										connotation="cta"
										aria-label="Edit on CodePen"
										icon="open-line"
										@click="${(x) => x.openCodePen()}"
									></vwc-button>
								</vwc-tooltip>`
							)}
							<vwc-tooltip
								text="View code"
								placement="top"
								exportparts="vvd-theme-alternate"
							>
								<vwc-button
									slot="anchor"
									connotation="cta"
									aria-label="View code"
									icon="code-line"
									aria-expanded="${(x) => (x.editorOpen ? 'true' : 'false')}"
									aria-controls="details"
									@click="${(x) => x.toggleEditorOpen()}"
								></vwc-button>
							</vwc-tooltip>
							<vwc-tooltip
								text="Copy code"
								placement="top"
								exportparts="vvd-theme-alternate"
							>
								<vwc-button
									slot="anchor"
									connotation="cta"
									aria-label="Copy code"
									icon="${(x) => x.copyIcon}"
									@click="${(x) => x.copyCode()}"
								></vwc-button>
							</vwc-tooltip>
							<vwc-tooltip
								text="Open example in new tab"
								placement="top"
								exportparts="vvd-theme-alternate"
							>
								<vwc-button
									slot="anchor"
									connotation="cta"
									aria-label="Open example in new tab"
									icon="trigger-node-line"
									href="${(x) => x.exampleSrc}"
									target="_blank"
								></vwc-button>
							</vwc-tooltip>
						</vwc-action-group>
					</div>`
				)}
				<details id="details" slot="main" :open="${(x) => x.editorOpen}">
					<summary></summary>
					<div ${ref('editorEl')} role="region"></div>
				</details>
			</vwc-card>
		</div>
	`,
})
export class LiveSample extends FASTElement {
	@attr({ attribute: 'example-lang' }) exampleLang!: 'html' | 'vue';

	get readonly() {
		return this.exampleLang === 'vue';
	}
	get canOpenOnCodePen() {
		return this.exampleLang === 'html';
	}

	@attr({ attribute: 'example-src' }) exampleSrc = '';

	@attr({ attribute: 'example-code' }) exampleCode = '';

	@attr({ attribute: 'hide-toolbar', mode: 'boolean' }) hideToolbar = false;

	view!: EditorView;
	editorEl!: HTMLDivElement;

	override connectedCallback() {
		super.connectedCallback();

		const code = this.readonly
			? this.exampleCode
			: `<!-- Feel free to edit the code below. The live preview will update as you make changes. -->\n${this.exampleCode}`;
		this.view = new EditorView({
			doc: code,
			extensions: [
				oneDark,
				...(this.readonly
					? [EditorState.readOnly.of(true), EditorView.editable.of(false)]
					: [EditorView.updateListener.of(this.updateIframeCode)]),
				minimalSetup,
				bracketMatching(),
				codeMirrorHtml(),
				indentUnit.of('\t'),
			],
			parent: this.editorEl,
			root: this.shadowRoot!,
		});

		this.listenForThemeChange();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		this.view.destroy();

		this.resizeObserver.disconnect();

		this.stopListeningForThemeChange();
	}

	@observable editorOpen = false;
	toggleEditorOpen() {
		this.editorOpen = !this.editorOpen;
	}

	@observable iframeEl!: HTMLIFrameElement;

	resizeObserver = new ResizeObserver((entries) => {
		if (entries.length === 0) return;
		this.iframeEl.style.height =
			Math.max(30, entries[0].contentRect.height) + 'px';
	});

	onIframeLoad() {
		this.iframeEl.setAttribute('data-vivid-iframe', '');
		this.setIframeTheme();
		this.resizeObserver.observe(
			this.iframeEl.contentWindow!.document.documentElement
		);
	}

	setIframeTheme = () => {
		this.iframeEl
			.contentWindow!.document.getElementById('vivid-theme')
			?.remove();

		const themeStyle =
			this.iframeEl.contentWindow!.document.createElement('style');
		themeStyle.id = 'vivid-theme';
		themeStyle.textContent = getCurrentThemeCss();
		this.iframeEl.contentWindow!.document.head.appendChild(themeStyle);

		this.iframeEl.contentWindow!.document.body.classList.remove(
			'page-not-ready'
		);
	};

	listenForThemeChange() {
		document
			.querySelector('vwc-menu#dark-mode-menu')!
			.addEventListener('change', this.setIframeTheme);
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', this.setIframeTheme);
	}

	stopListeningForThemeChange() {
		document
			.querySelector('vwc-menu#dark-mode-menu')!
			.removeEventListener('change', this.setIframeTheme);
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.removeEventListener('change', this.setIframeTheme);
	}

	updateIframeCode = _.debounce((update: ViewUpdate) => {
		if (!update.docChanged) {
			return;
		}

		const placeholder =
			this.iframeEl.contentDocument!.querySelector('#_target');
		if (!placeholder) {
			return; // iframe is not ready
		}

		const updatedCode = this.view.state.doc.toString().trim();
		const replacement = this.iframeEl
			.contentDocument!.createRange()
			.createContextualFragment(updatedCode);

		placeholder.replaceChildren(replacement);
	}, 500);

	@attr deps = '';
	static codePenForm: HTMLFormElement | null = null;
	openCodePen() {
		const codePenPayload = JSON.stringify({
			html: `<div class="vvd-root">\n${this.view.state.doc
				.toString()
				.trim()}\n</div>`,
			head: `<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >
		<link rel="preload" href="https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2" type="font/woff2" as="font" crossorigin="anonymous" >`,
			css: `@import "https://unpkg.com/@vonage/vivid@latest/styles/tokens/theme-light.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/core/all.css";
@import "https://unpkg.com/@vonage/vivid@latest/styles/fonts/spezia-variable.css";`,
			js: this.deps
				.split(',')
				.map((d) => `import 'https://unpkg.com/@vonage/vivid@latest/${d}';`)
				.join('\n'),
		})
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');

		if (!LiveSample.codePenForm) {
			LiveSample.codePenForm = document.createElement('form');
			Object.assign(LiveSample.codePenForm, {
				action: 'https://codepen.io/pen/define',
				method: 'post',
				target: '_blank',
			});
			document.lastElementChild!.insertAdjacentElement(
				'beforeend',
				LiveSample.codePenForm
			);
		}
		LiveSample.codePenForm.innerHTML = `<input type="hidden" name="data" value="${codePenPayload}"/>`;
		LiveSample.codePenForm.submit();
	}

	@observable copyIcon = 'copy-2-line';
	copyCode() {
		navigator.clipboard
			.writeText(this.view.state.doc.toString().trim())
			.then(() => {
				/* clipboard successfully set */
				this.copyIcon = 'check-line';
			})
			.catch(() => {
				/* clipboard write failed */
				this.copyIcon = 'close-line';
			});

		setTimeout(() => {
			this.copyIcon = 'copy-2-line';
		}, 1000);
	}

	@attr({ attribute: 'locale-switcher', mode: 'boolean' }) localeSwitcher =
		false;
	@observable locale: keyof typeof locales = 'en-US';
	onChangeLocale(event: Event) {
		const select = event.target as HTMLSelectElement;
		this.locale = select.value as keyof typeof locales;
		if (this.iframeEl.contentWindow) {
			this.iframeEl.contentWindow.setLocale(locales[this.locale]);
			this.iframeEl.contentWindow.document.documentElement.lang = this.locale;
		}
	}
}
