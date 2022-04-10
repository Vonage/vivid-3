import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ExpansionPanel } from './expansion-panel';

const getClasses = ({
	open, heading, icon, meta, indicatorIconSet, dense, leadingToggle, headingLevel
}: ExpansionPanel) => classNames(
	'control',
	['open', Boolean(open)],
	['heading', Boolean(heading)],
	['meta', Boolean(meta)],
	['indicatorIconSet', Boolean(indicatorIconSet)],
	['dense', Boolean(dense)],
	['leadingToggle', Boolean(leadingToggle)],
	['headingLevel', Boolean(headingLevel)],
	['icon', Boolean(icon)]
);
export const ExpansionPanelTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ExpansionPanel> = () => html`
		${(x) => renderHeaderButton(x.heading, x.icon, x.leadingToggle, x.meta)}
		<div class="${getClasses}" id="content" class="expansion-panel-body">
			<slot></slot>
		</div>`;

const renderHeaderButton = (heading: string, icon: string, leadingToggle: boolean, meta: string) => {
	return html`
		<button class="expansion-panel-button" id="expansion-panel" ?aria-expanded=${open} aria-controls="content">
			<span class="leading-icon">
				<slot name="icon">
					${renderIconOrToggle(icon, leadingToggle)}
				</slot>
			</span>
			<span class="heading-text">${heading}</span>
			${meta ? renderMeta() : ''}
			<span class="trailing-icon">
				<slot name="trailingIcon">
					${!leadingToggle ? renderToggle() : ''}
				</slot>
			</span>
		</button>
	`;
};

const renderMeta = () => {
	return html`<span class="meta">${(x) => x.meta}</span>`;
};

const renderIconOrToggle = (icon: string, leadingToggle: boolean) => {
	if (leadingToggle) {
		return renderToggle();
	} else if (icon) {
		return html`
			<vwc-icon type="${(x) => x.icon}" size="medium"></vwc-icon>`;
	} else {
		return '';
	}
};

const renderToggle = () => {
	return html`
		<vwc-icon class="toggle-open" type="${(x) => (x.indicatorIconSet === 'chevron' ? 'chevron-down-solid' : 'plus-solid')}">
		</vwc-icon>
		<vwc-icon class="toggle-close" type="${(x) => (x.indicatorIconSet === 'chevron' ? 'chevron-up-solid' : 'minus-solid')}">
		</vwc-icon>
	`;
};