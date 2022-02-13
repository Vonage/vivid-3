import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { SideDrawer } from './side-drawer';

const getClasses = ({
	alternate, modal, open, position
}: SideDrawer) => classNames(
	'control',
	['alternate', alternate],
	['modal', modal],
	['open', open],
	[`${position}`, Boolean(position)],
);

/**
 * The template for the {@link @vonage/vivid#side-drawer} component.
 *
 * @returns {ViewTemplate<side-drawer>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const sideDrawerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SideDrawer> = () => {
	return html`
	<aside class="${getClasses}" part="${(x) => (x.alternate ? 'vvd-scheme-alternate' : undefined)}"
		@transitionend=${x => x.handleTransitionEnd} @keydown=${x => x.handleKeydown}>
	
		${(x) => (x.hasTopBar ? renderTopBar() : '')}
	
		<div class="content">
			<slot></slot>
		</div>
	</aside>
	
	<div class="app-content">
		<slot name="app-content"></slot>
	</div>
	
	${(x) => ((x.modal && x.open) ? renderScrim() : '')}
`;
};

const renderTopBar = () => {
	return html`
		<header class="top-bar">
			<slot name="top-bar"></slot>
		</header>`;
};

const renderScrim = () => {
	return html`
		<div class="scrim" @click="${x => x.handleScrimClick()}" @keydown="${x => x.handleScrimClick()}"></div>`;
};