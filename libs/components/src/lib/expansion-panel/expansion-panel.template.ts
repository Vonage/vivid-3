import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { ExpansionPanel, ICON_SETS } from './expansion-panel';

export const ExpansionPanelTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ExpansionPanel> = () => html`
		${renderHeaderButton()}
		<div id="content" class="expansion-panel-body">
			<slot></slot>
		</div>`;

const renderHeaderButton = () => {
	return html`<vwc-button class="expansion-panel-button" appearance='ghost' label='${(x) => x.heading}' size='${(x) => x.size}'
	icon=${(x) => setIcon(x.open, x.indicatorIconSet)}
	@click=${(x) => x.toggleOpen()}
	?icon-trailing=${(x) => !x.leadingToggle}
	?aria-expanded=${(x) => x.open}
	aria-controls="content">
</vwc-button>`;
};

const setIcon = (open: boolean, indicatorIconSet: ICON_SETS) => {
	if (open) {
		return indicatorIconSet === ICON_SETS.Chevron ? 'chevron-up-solid' : 'minus-solid';
	}
	return indicatorIconSet === ICON_SETS.Chevron ? 'chevron-down-solid' : 'plus-solid';
};