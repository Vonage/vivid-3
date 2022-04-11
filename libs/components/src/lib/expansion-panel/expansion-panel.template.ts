import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { ExpansionPanel } from './expansion-panel';

export const ExpansionPanelTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ExpansionPanel> = () => html<ExpansionPanel>`
		${x => renderPanelHeader(x.headingLevel)}
		<div class="expansion-panel-body">
			<slot></slot>
		</div>
`;

const renderPanelHeader = (headingLevel: number | string) => {
	const header: string = 'h' + headingLevel;
	return html<ExpansionPanel>`
	<${header} class="expansion-panel-header">
		${renderHeaderButton()}
	</${header}>
	`;
};

const renderHeaderButton = () => {
	return html<ExpansionPanel>`
	<button class="expansion-panel-button" @click=${x => x.toggleOpen()}
		?aria-expanded=${x => x.open}
		aria-controls="content"
		>
		<span class="leadingIcon">
			<slot name="icon">
				${x => renderIconOrToggle(x.leadingToggle, x.icon)}
			</slot>
		</span>
		<span class="heading-text">${x => x.heading}</span>
		${when(x => x.meta, renderMeta())}
		<span class="trailing-icon">
			<slot name="trailingIcon">
				${when(x => !x.leadingToggle, renderToggle())}
			</slot>
		</span>
	</button>
`;
};

const renderMeta = () => {
	return html`<span class="meta">${x => x.meta}</span>`;
};

const renderIconOrToggle = (leadingToggle: boolean, icon: string) => {
	if (leadingToggle) {
		return renderToggle();
	}
	else {
		return icon ? html`<vwc-icon type="${icon}"></vwc-icon>` : '';
	}
};

const renderToggle = () => {
	return html`
		<vwc-icon class="toggle-open" type='chevron-down-solid'></vwc-icon>
		<vwc-icon class="toggle-close" type='chevron-up-solid'></vwc-icon>
	`;
};