import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ExpensionPanel } from './expension-panel';

const getClasses = ({
	open, heading, icon, meta, indicatorIconSet, dense, leadingToggle, headingLevel
}: ExpensionPanel) => classNames(
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
export const ExpensionPanelTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition) => ViewTemplate<ExpensionPanel> = () =>
	html`
		${renderPanelHeader()}
		<div class="${getClasses}" id="content" class="expansion-panel-body">
			<slot></slot>
		</div>`;

const renderMeta = () => {
	return html`<span class="meta">${(x) => x.meta}</span>`;
};

const renderHeaderButton = (heading) => {
	return html`
		<button class="expansion-panel-button" id="expansion-panel" @mousedown="${handleRippleActivate}"
			@mouseenter="${handleRippleMouseEnter}" @mouseleave="${handleRippleMouseLeave}" @touchstart="${() => {
	toggleOpen();
	handleRippleActivate;
}}" @touchend="${handleRippleDeactivate}" @touchcancel="${handleRippleDeactivate}" @click=${() =>
	toggleOpen()}
			?aria-expanded=${open}
			aria-controls="content"
			>
			<span class="leading-icon">
				<slot name="icon">
					${renderIconOrToggle()}
				</slot>
			</span>
			<span class="heading-text">${heading}</span>
			${(x) => (x.meta ? renderMeta() : '')}
			<span class="trailing-icon">
				<slot name="trailingIcon">
					${!leadingToggle ? renderToggle() : ''}
				</slot>
			</span>
		</button>
	`;
};

const renderPanelHeader = () => {
	// if (!isValidHeaderValue(headingLevel)) headingLevel = '3';
	// return eval(`safeHtml\`<h${headingLevel} class="expansion-panel-header">\${renderHeaderButton()}</h${headingLevel}>\``);
};

const renderIconOrToggle = () => {
	if (leadingToggle) {
		return renderToggle();
	} else if (icon) {
		return html`
			<vwc-icon type="${(x) => (x.icon)}" size="medium"></vwc-icon>`;
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
