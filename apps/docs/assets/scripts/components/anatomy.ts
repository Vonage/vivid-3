import { FASTElement, customElement, html, css } from '@microsoft/fast-element';

@customElement({
	name: 'docs-anatomy',
	styles: css`
		:host {
			display: flex;
			justify-content: center;
		}
	`,
	template: html<DocsAnatomy>`<slot></slot>`,
})
export class DocsAnatomy extends FASTElement {}
