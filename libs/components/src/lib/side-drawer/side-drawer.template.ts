import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	FoundationElementTemplate,
} from '@microsoft/fast-foundation';
import type { SideDrawer } from './side-drawer';

const getClasses = ({
	alternate, modal, open, position, headerSlottedContent
}: SideDrawer) => classNames(
	'control',
	['alternate', alternate],
	['modal', modal],
	['open', open],
	['end', position === 'end'],
	['withHeader', Boolean(headerSlottedContent?.length)],
);

const getScrimClasses = ({
	open
}: SideDrawer) => classNames(
	'scrim',
	['open', open],
);

/**
 * The template for the {@link @vonage/vivid#side-drawer} component.
 *
 * @param context
 * @param definition
 * @returns {ViewTemplate<side-drawer>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const sideDrawerTemplate: FoundationElementTemplate<ViewTemplate<SideDrawer>> = () => html`
	<aside class="${getClasses}" part="base ${(x) => x.alternate ? 'vvd-theme-alternate' : ''}"
	 @keydown="${(x, c) => handleKeydown(x, c.event as KeyboardEvent)}" ${ref('asideEl')}>

	 	<header class="side-drawer-header" part="side-drawer-header">
	 		<slot name="header" ${slotted('headerSlottedContent')}></slot>
 		</header>

		<div class="side-drawer-content">
			<slot></slot>
		</div>
	</aside>

	<div class="side-drawer-app-content">
		<slot name="app-content"></slot>
	</div>

	${when(x => x.modal, html<SideDrawer>`<div class="${getScrimClasses}" ${ref('scrimEl')} @click="${x => (x.open = false)}"></div>`)}
`;

const handleKeydown = (x: any, { key }: KeyboardEvent): boolean | void => {
	if (key === 'Escape') {
		x.open = false;
	} else {
		// after this event handler is executed,
		// preventDefault() will be called on the event object by default.
		// we need to return true from our handler to opt - out of this behavior.
		return true;
	}
};
