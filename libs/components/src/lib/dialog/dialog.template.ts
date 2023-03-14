import {html, slotted, when} from '@microsoft/fast-element';
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

const getClasses = ({iconPlacement, bodySlottedContent, footerSlottedContent} : Dialog) => classNames(
	'base',
	[`icon-placement-${iconPlacement}`, Boolean(iconPlacement)],
	['hide-body', !bodySlottedContent?.length],
	['hide-footer', !footerSlottedContent?.length],
);
/**
 *
 */
function icon(iconTag: string) {
	return html<Dialog>`
		<${iconTag} class="icon" name="${x => x.icon}"></${iconTag}>
	`;
}

/**
 *
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
 */
function subtitle() {
	return html<Dialog>`
	  <div class="subtitle">
		  ${x => x.subtitle}
	  </div>
	`;
}

/**
 *
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
 * @param dialog
 * @param event
 */
function handleEscapeKey(dialog: Dialog, event: Event) {
	if ((event as KeyboardEvent).key === 'Escape' && dialog.modal) {
		dialog.open = false;
	}
	return true;
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
) => ViewTemplate<Dialog> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const iconTag = context.tagFor(Icon);
	const buttonTag = context.tagFor(Button);

	return html<Dialog>`
	<${elevationTag} dp="12">
		<dialog class="${getClasses}"
				@keydown="${(x, c) => handleEscapeKey(x, c.event)}"
				returnValue="${x => x.returnValue}"
				aria-labelledby="${x => x.ariaLabelledBy}"
				aria-label="${x => x.ariaLabel}"
				aria-describedby="${x => x.ariaDescribedBy}"
		>
			<slot name="main">
				<div class="main-wrapper">
					<div class="header ${x => x.subtitle ? 'border' : ''}">
							<slot name="graphic">
								${when(x => x.icon, icon(iconTag))}
							</slot>
							${when(x => x.headline, headline())}
							${when(x => x.subtitle, subtitle())}
							${renderDismissButton(buttonTag)}
					</div>
					<div class="body ${x => x.bodySlottedContent?.length ? '' : 'hide'}">
						<slot name="body" ${slotted('bodySlottedContent')}></slot>
					</div>
					<div class="footer ${x => x.footerSlottedContent?.length ? '' : 'hide'}">
						<slot name="footer" ${slotted('footerSlottedContent')}></slot>
					</div>
				</div>
			</slot>
		</dialog>
	</${elevationTag}>`;
};
