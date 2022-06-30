import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Dialog } from './dialog';

const getClasses = ({stacked}: Dialog) => classNames(
	'base',
	['stacked', stacked]);

function icon() {
	return html<Dialog>`
		<vwc-icon class="icon" type="${x => x.icon}"></vwc-icon>
	`;
}

function heading() {
	return html<Dialog>`
		<vwc-text font-face="subtitle-2" class="heading">
				${x => x.heading}
		</vwc-text>
	`;
}

function content() {
	return html<Dialog>`
		<vwc-text font-face="body-2" class="content">
				${x => x.content}
		</vwc-text>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Dialog} component.
 *
 * @param context
 * @public
 */
export const DialogTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Dialog> = () => html<Dialog>` 
  <dialog class="${getClasses}"
          ?open="${x => x.open }"
          returnValue="${ x => x.returnValue }">
	  ${when(x => x.icon, icon())}
	  ${when(x => x.heading, heading())}
	  ${when(x => x.content, content())}
</dialog>`;
