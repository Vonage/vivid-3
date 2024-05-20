import { FASTElement, customElement, html, css } from '@microsoft/fast-element';

@customElement({
	name: 'docs-do',
	styles: css`
		:host {
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-left: 2px solid var(--vvd-color-success-500);
			padding: 8px 24px;
		}

		h3 {
			display: flex;
			align-items: center;
			margin: 0;
			gap: 8px;
			color: var(--vvd-color-success-500);
		}
	`,
	template: html<DocsDo>`
		<h3>
			<vwc-icon name="check-circle-line"></vwc-icon>
			Do
		</h3>
		<div>
			<slot></slot>
		</div>
	`,
})
export class DocsDo extends FASTElement {}
