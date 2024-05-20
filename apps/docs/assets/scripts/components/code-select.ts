import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { currentCode } from './selectedCode';

@customElement({
	name: 'docs-code-select',
	styles: css``,
	template: html<CodeSelect>` <slot :name="${() => currentCode.code}"></slot> `,
})
export class CodeSelect extends FASTElement {}
