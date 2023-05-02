import {html, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import {affixIconTemplateFactory} from '../../shared/patterns/affix';
import { Button } from '../button/button';
import type {Banner} from './banner';

const getClasses = (_: Banner) => classNames(
	'control',
	[`connotation-${_.connotation}`, !!_.connotation]
);

/**
 *
 */
function renderDismissButton(buttonTag: string) {
	return html<Banner>`
	  <${buttonTag}
				part="vvd-theme-alternate"
			  size="condensed"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => x.remove()}">
	  </${buttonTag}>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Banner} component.
 *
 * @param context
 * @public
 */
export const BannerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Banner> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const buttonTag = context.tagFor(Button);

	return html<Banner>`
	  <div class="${getClasses}" tabindex="0">
		  <header class="header">
					<div class="content">
            ${x => affixIconTemplate(x.conditionedIcon)}
						<div class="banner-message"
						 role="${x => x.role ? x.role : 'status'}"
						 aria-live="${x => x.ariaLive ? x.ariaLive : 'polite'}">
									${x => x.text}
            </div>
						<slot class="action-items" name="action-items"></slot>
					</div>

			  ${when(x => x.removable, renderDismissButton(buttonTag))}
		  </header>
	  </div>
	`;
};

