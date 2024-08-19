import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { FoundationElementTemplate } from '@microsoft/fast-foundation';
import type { SideDrawer } from './side-drawer';
import { handleEscapeKeyAndStopPropogation } from '../dialog/dialog.template';

const getClasses = ({ modal, open, trailing }: SideDrawer) =>
	classNames(
		'control',
		['modal', modal],
		['open', open],
		['trailing', trailing]
	);

const getScrimClasses = ({ open }: SideDrawer) =>
	classNames('scrim', ['open', open]);

/**
 * The template for the side-drawer component.
 *
 * @param context - element definition context
 * @returns ViewTemplate<side-drawer> A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const sideDrawerTemplate: FoundationElementTemplate<
	ViewTemplate<SideDrawer>
> = () => html`
	<div
		class="${getClasses}"
		?inert="${(x) => !x.open}"
		part="base ${(x) => (x.alternate ? 'vvd-theme-alternate' : '')}"
		@keydown="${(x, c) => handleKeydown(x, c.event as KeyboardEvent)}"
	>
		<slot></slot>
	</div>

	<div class="side-drawer-app-content" ?inert="${(x) => x.open && x.modal}">
		<slot name="app-content"></slot>
	</div>

	${when(
		(x) => x.modal,
		html<SideDrawer>`<div
			class="${getScrimClasses}"
			@click="${(x) => (x.open = false)}"
		></div>`
	)}
`;

const handleKeydown = (x: any, event: KeyboardEvent): boolean | void => {
	if (handleEscapeKeyAndStopPropogation(event)) {
		x.open = false;
	} else {
		return true;
	}
};
