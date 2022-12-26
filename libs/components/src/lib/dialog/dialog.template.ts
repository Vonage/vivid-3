import {html, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Icon } from '../icon/icon';
import { Button } from '../button/button'; 
import type {Dialog} from './dialog';

const getClasses = ({iconPlacement}: Dialog) => classNames(
	'base',
	[`icon-placement-${iconPlacement}`, Boolean(iconPlacement)],
);

/**
 *
 *
 * @returns HTMLElement - template
 */
function icon(iconTag: string) {
	return html<Dialog>`
		<${iconTag} class="icon" name="${x => x.icon}"></${iconTag}>
	`;
}

/**
 *
 *
 * @returns HTMLElement - template
 */
function headline() {
	return html<Dialog>`
	  <div class="headline">
		  ${x => x.headline}
	  </div>
	`;
}


/**
 *
 *
 * @returns HTMLElement - template
 */
function renderDismissButton(buttonTag: string) {
	return html<Dialog>`
	  <${buttonTag}
			  size="condensed"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => {
		x.open = false;
	}}">
	  </${buttonTag}>`;
}

/**
 *
 *
 * @param Dialog - dialog
 * @param Event - event
 */
function handleEscapeKey(dialog: Dialog, event: Event) {
	if ((event as KeyboardEvent).key === 'Escape' && dialog.modal) {
		dialog.open = false;
	}
}

/**
 *
 *
 * @returns  @returns HTMLElement - template
 */
function content() {
	return html<Dialog>`
	  <div class="content">
		  ${x => x.text}
	  </div>
	`;
}
/**
 * The template for the {@link @microsoft/fast-foundation#Dialog} component.
 *
 * @returns HTMLElement - template
 */
export const DialogTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Dialog> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const iconTag = context.tagFor(Icon);
	const buttonTag = context.tagFor(Button);

	return html<Dialog>`
	<${elevationTag} dp="12">
		<div>
			<dialog class="${getClasses}"
					@keydown="${(x, c) => handleEscapeKey(x, c.event)}"
					returnValue="${x => x.returnValue}"
					aria-labelledby="${x => x.ariaLabelledBy}"
					aria-label="${x => x.ariaLabel}"
					aria-describedby="${x => x.ariaDescribedBy}"
			>
				<slot name="main">
					<div class="main-wrapper">
						<div class="header">
							<div class="headline-wrapper">
								<slot name="graphic">
									${when(x => x.icon, icon(iconTag))}
								</slot>
								${when(x => x.headline, headline())}
							</div>
						${renderDismissButton(buttonTag)}
						</div>
						<slot name="content">
							${when(x => x.text, content())}
						</slot>
						<slot name="footer"></slot>
					</div>
				</slot>
			</dialog>
		</div>
	</${elevationTag}>`;
};