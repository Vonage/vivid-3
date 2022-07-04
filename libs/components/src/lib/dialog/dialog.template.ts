import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Dialog } from './dialog';

const getClasses = (_: Dialog) => classNames(
	'base');

/**
 *
 */
function icon() {
	return html<Dialog>`
		<slot name="graphics"><vwc-icon class="icon" type="${x => x.icon}"></vwc-icon></slot>
	`;
}

/**
 *
 */
function heading() {
	return html<Dialog>`
		<div class="heading">
				${x => x.heading}
		</div>
	`;
}

/**
 *
 */
function content() {
	return html<Dialog>`
		<div class="content">
				${x => x.content}
		</div>
	`;
}

/**
 *
 */
function renderDismissButton() {
	return html<Dialog>`
	  <vwc-button
			  density="condensed"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => {x.open = false;}}">
	  </vwc-button>`;
}

/**
 * @param dialog
 * @param event
 */
function handleEscapeKey(dialog: Dialog, event: Event) {
	if ((event as KeyboardEvent).key === 'Escape' && dialog.modal) {
		dialog.open = false;
	}
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
          @keydown="${(x, c) => handleEscapeKey(x, c.event)}"
          returnValue="${ x => x.returnValue }"
  				aria-labelledby="${ x => x.ariaLabelledBy }"
  				aria-label="${ x => x.ariaLabel }"
  				aria-describedby="${ x => x.ariaDescribedBy }"
  >
		  <slot name="main">
			  ${when(x => x.icon, icon())}
				  ${renderDismissButton()}
			  ${when(x => x.heading, heading())}
			  ${when(x => x.content, content())}
				  <slot name="footer"></slot>
		  </slot>
</dialog>`;
