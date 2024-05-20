import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { currentCode } from './selectedCode';

@customElement({
	name: 'docs-code-switch',
	styles: css``,
	template: html<CodeSwitch>`
		<vwc-action-group role="region" aria-label="Text Alignment">
			<vwc-button
				?aria-pressed="${() => currentCode.code === 'vue'}"
				:appearance="${() => (currentCode.code === 'vue' ? 'filled' : 'ghost')}"
				@click="${() => (currentCode.code = 'vue')}"
				icon="vue-color"
				label="Vivid Vue"
			></vwc-button>
			<vwc-button
				?aria-pressed="${() => currentCode.code === 'web-component'}"
				:appearance="${() =>
					currentCode.code === 'web-component' ? 'filled' : 'ghost'}"
				@click="${() => (currentCode.code = 'web-component')}"
				icon="code-line"
				label="Web Components"
			></vwc-button>
		</vwc-action-group>
	`,
})
export class CodeSwitch extends FASTElement {}
