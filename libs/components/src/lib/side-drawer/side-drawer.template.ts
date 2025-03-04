import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { SideDrawer } from './side-drawer';

const getClasses = ({ modal, open, trailing }: SideDrawer) =>
	classNames(
		'control',
		['modal', modal],
		['open', open],
		['trailing', trailing]
	);

const getScrimClasses = ({ open }: SideDrawer) =>
	classNames('scrim', ['open', open]);

export const sideDrawerTemplate = html<SideDrawer>`
	<div
		class="${getClasses}"
		?inert="${(x) => !x.open}"
		part="base ${(x) => (x.alternate ? 'vvd-theme-alternate' : '')}"
		@keydown="${(x, c) => x._onKeydown(c.event as KeyboardEvent)}"
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
			@click="${(x) => x._handleCloseRequest()}"
		></div>`
	)}
`;
