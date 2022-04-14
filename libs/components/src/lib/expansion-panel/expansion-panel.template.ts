import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ExpansionPanel } from './expansion-panel';

const getClasses = ({
	open, iconTrailing, icon, dense, noIndicator
}: ExpansionPanel) => classNames(
	'control',
	['open', open],
	['icon', Boolean(icon)],
	['iconTrailing', iconTrailing],
	['dense', dense],
	['noIndicator', noIndicator],
);

export const ExpansionPanelTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ExpansionPanel> = () => html<ExpansionPanel>`
	<div class="${getClasses}">
		${x => renderPanelHeader(x.headingLevel)}
		<div class="expansion-panel-body">
			<slot></slot>
		</div>
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
	<button class="expansion-panel-button" @click=${x=> x.toggleOpen()}
		?aria-expanded=${x => x.open}
		aria-controls="content">
		<span class="icon">
			<slot name="icon">
				${when(x => x.icon && !x.iconTrailing, renderIcon())}
			</slot>
		</span>
		<span class="heading-text">${x => x.heading}</span>
		${when(x => x.meta, renderMeta())}
		<span class="indicator">
			<slot name="indicator">
				${x => renderIndicatorOrIcon(x.icon, x.iconTrailing, x.noIndicator)}
			</slot>
		</span>
	</button>
`;
};

const renderMeta = () => {
	return html`<span class="meta">${x => x.meta}</span>`;
};

const renderIcon = () => {
	return html`<vwc-icon type="${x => x.icon}"></vwc-icon>`;
};

const renderIndicator = () => {
	return html`
		<vwc-icon class="toggle-open" type='chevron-down-solid'></vwc-icon>
		<vwc-icon class="toggle-close" type='chevron-up-solid'></vwc-icon>
	`;
};

const renderIndicatorOrIcon = (icon: string, iconTrailing: boolean, noIndicator: boolean) => {
	if (icon && iconTrailing) {
		return renderIcon();
	}
	else if (!noIndicator) {
		return renderIndicator();
	}
	else {
		return '';
	}
};