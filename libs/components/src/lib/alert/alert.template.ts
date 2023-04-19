import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../shared/patterns/affix';
import { Button } from '../button/button';
import type { Alert } from './alert';

const getClasses = (_: Alert) => classNames(
	'base',
	[`connotation-${_.connotation}`, !!_.connotation]
);

/**
 *
 */
function headline() {
	return html<Alert>`
	  <div class="headline">
		  ${x => x.headline}
	  </div>
	`;
}

/**
 *
 */
function renderDismissButton(buttonTag: string) {
	return html<Alert>`
	  <${buttonTag}
			  size="condensed"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => x.remove()}">
	  </${buttonTag}>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Alert} component.
 *
 * @param context
 * @public
 */
export const AlertTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Alert> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const buttonTag = context.tagFor(Button);

	return html<Alert>`
	  <div class="${getClasses}" tabindex="0">
		<div class="user-content">
            ${x => affixIconTemplate(x.conditionedIcon)}
						<div class="alert--message"
							role="alert"
							aria-live="assertive">
							${when(x => x.headline, headline())}
							${x => x.subtitle}
            			</div>
			<slot class="action-items" name="action-items"></slot>
		</div>
			  ${when(x => x.removable, renderDismissButton(buttonTag))}
	  </div>
	`;
};

