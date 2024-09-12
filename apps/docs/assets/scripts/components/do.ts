import { FASTElement, customElement, html, css, attr } from '@microsoft/fast-element';

@customElement({
	name: 'docs-do',
	styles: css`
		:host {
			--do-dont-color: var(--vvd-color-success-500);

			display: flex;
			flex-direction: column;
			justify-content: start;
			border-left: 2px solid var(--do-dont-color);
			padding-inline-start: 24px;
			margin-block-start: 24px;
		}

		:host([dont]) {
			--do-dont-color: var(--vvd-color-alert-500);
		}

		h3 {
			display: flex;
			align-items: center;
			margin: 0;
			gap: 8px;
			color: var(--do-dont-color);
			line-height: 1.3;
		}

		.cbd-container p:not(:empty) {
			margin-block-start: 0;
		} 

		@media (width >= 600px) {
			:host {
				margin-block-start: 0;
			}
		}
	`,
	template: html<DocsDo>`
		<h3>
			<vwc-icon name="${(x) => x.dont ? 'close-circle-line' : 'check-circle-line'}" size="0"></vwc-icon>
			${(x) => x.headline ? x.headline : `Do${x.dont ? `n't` : ''}`}
		</h3>
		<div>
			<slot></slot>
			<div>${(x) => x.caption}</div>
		</div>
	`,
})
export class DocsDo extends FASTElement {
	@attr caption = '';
	@attr headline = '';
	@attr({
		mode: 'boolean',
		attribute: 'dont',
	})
	dont = false;
}