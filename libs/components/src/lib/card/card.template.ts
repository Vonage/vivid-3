import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Card } from './card';

const getClasses = (_: Card) => classNames('control');


/**
header icon
 */
function renderHeaderIcon() {
	return html<Card>`
	  <vwc-icon class="icon" inline type="${x => x.icon}"></vwc-icon>`;
}

/**
 *
 */
function heading() {
	return html`
		<div class="header-title">${(x) => x.heading}</div>
	`;
}

/**
 *
 */
function subtitle() {
	return html`
		<div class="header-subtitle">${(x) => x.subtitle}</div>
	`;
}

/**
 *
 */
function text() {
	return html`
		<div class="text">${(x) => x.text}</div>
	`;
}


/**
header
 */
function renderHeader() {
	return html`
		<header class="header">
			<slot name="graphic">${when(x => x.icon, renderHeaderIcon())}</slot>
			<div class="header-content">
				${when(x => x.heading, heading())}
				${when(x => x.heading, subtitle())}
			</div>
			<slot name="meta"></slot>
		</header>`;
}

/**
 *
 */

/**
if no content in slot - don't render the footer
 */



private shouldShowFooterSlot: boolean = false;
const footerSlotChanged(): void {
	context
	const slot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
	this.shouldShowFooterSlot = Boolean(slot.assignedNodes().length);
}




/**
 * The template for the {@link @microsoft/fast-foundation#Card} component.
 *
 * @param context
 * @public
 */
export const CardTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Card> = () => html`
	<vwc-elevation dp=${(x => x.elevation ??  '4')}>
				<div class="${getClasses}">
					<div class="vwc-card-media">
						<slot name="media"></slot>
					</div>
					<div class="content">
						<slot name="content">
							${when(x => (x.heading || x.subtitle || x.icon), renderHeader())}
							${when(x => x.text, text())}
						</slot>
					</div>
					${renderFooter()}
				</div>
			</vwc-elevation>
`;


const renderFooter = () => {
	return html`
		<div class="footer">
			<slot name="footer" @slotchange=footerSlotChanged()></slot>
		</div>
	`;
};


