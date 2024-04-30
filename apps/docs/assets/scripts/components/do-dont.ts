import { FASTElement, customElement, html, css } from '@microsoft/fast-element';

@customElement({
	name: 'docs-do-dont',
	styles: css`
		:host {
			display: flex;
			gap: 24px;
		}

		::slotted(*) {
			flex: 1;
		}
	`,
	template: html<DocsDo>` <slot></slot> `,
})
export class DocsDo extends FASTElement {}
