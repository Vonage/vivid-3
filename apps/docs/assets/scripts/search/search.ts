import {
	FASTElement,
	customElement,
	html,
	ref,
	css,
} from '@microsoft/fast-element';
import { memoizeWith } from 'ramda';
import type { Dialog } from '../vivid.js';
import './search.style.scss';

const loadElement = async (
	tag: string,
	props: Record<string, unknown>,
	target: HTMLElement
) => {
	const element = document.createElement(tag);
	Object.assign(element, props);
	target.appendChild(element);
	return new Promise<void>((resolve, reject) => {
		element.onload = () => {
			resolve();
		};
		element.onerror = (e) => {
			reject(e);
		};
	});
};

const loadPagefind = memoizeWith(
	() => '',
	() =>
		Promise.all([
			loadElement(
				'script',
				{ src: '/pagefind/pagefind-ui.js', async: true },
				document.body
			),
			loadElement(
				'link',
				{ rel: 'stylesheet', href: '/pagefind/pagefind-ui.css' },
				document.head
			),
		])
);

const template = html<DocsSearch>`
	<template
		@htmx:beforeRequest="${(x, c) => x.onBeforeRequest(c.event as CustomEvent)}"
	>
		<vwc-button
			icon="search-line"
			label="Search..."
			appearance="outlined"
			part="vvd-theme-alternate"
			@click="${(x) => x.openSearch()}"
		></vwc-button>
		<vwc-dialog ${ref('dialogEl')} headline="Search Documentation">
			<div slot="body">
				<slot name="pagefind-container">
					<vwc-progress-ring></vwc-progress-ring>
				</slot>
			</div>
		</vwc-dialog>
	</template>
`;

@customElement({
	name: 'docs-search',
	styles: css`
		:host {
			--pagefind-ui-text: var(--vvd-color-canvas-text);
			--pagefind-ui-primary: var(--vvd-color-canvas-text);
			--pagefind-ui-background: var(--vvd-color-canvas);
			--pagefind-ui-border: var(--vvd-color-neutral-200);
			--pagefind-ui-border-width: 1px;
			--pagefind-ui-font: sans-serif;
		}

		vwc-dialog {
			--dialog-min-inline-size: 768px;
			--dialog-max-inline-size: 768px;
		}

		@media (max-width: 1024px) {
			vwc-dialog {
				--dialog-min-inline-size: 80%;
				--dialog-max-inline-size: 100%;
			}
		}
	`,
	template,
})
export class DocsSearch extends FASTElement {
	dialogEl?: Dialog | null = null;
	pagefindUI?: any;

	override connectedCallback() {
		super.connectedCallback();
		document.addEventListener('keydown', this.#onKeydown);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('keydown', this.#onKeydown);
	}

	async openSearch() {
		this.pagefindUI?.destroy();
		this.querySelector('#pagefind-container')?.remove();

		this.dialogEl!.showModal();

		await loadPagefind();

		const pagefindContainer = document.createElement('div');
		pagefindContainer.id = 'pagefind-container';
		pagefindContainer.slot = 'pagefind-container';
		this.appendChild(pagefindContainer);

		this.pagefindUI = new (window as any).PagefindUI({
			element: '#pagefind-container',
			showSubResults: true,
			showImages: false,
			processResult: (result: unknown) => {
				setTimeout(() => {
					window.htmx.process(pagefindContainer);
				}, 0);
				return result;
			},
		});

		setTimeout(() => {
			pagefindContainer.querySelector('input')?.focus();
		}, 0);
	}

	onBeforeRequest = (e: CustomEvent) => {
		if (e.detail.elt.tagName === 'FORM') {
			return false; // Stop htmx from submitting the form
		}

		this.dialogEl?.close();
		return true;
	};

	#onKeydown = (e: KeyboardEvent) => {
		// Open search when pressing CMD/CTRL + K
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			this.openSearch();
		}
	};
}
