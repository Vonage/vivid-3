import { FASTElement, customElement, html, css } from '@microsoft/fast-element';

@customElement({
	name: 'docs-dont',
	styles: css`
		:host {
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-left: 2px solid var(--vvd-color-alert-500);
			padding: 8px 24px;
		}

		h3 {
			display: flex;
			align-items: center;
			margin: 0;
			gap: 8px;
			color: var(--vvd-color-alert-500);
		}
	`,
	template: html<DocsDont>`
		<h3>
			<vwc-icon name="close-circle-line"></vwc-icon>
			Don't
		</h3>
		<div>
			<slot></slot>
		</div>
	`,
})
export class DocsDont extends FASTElement {}
