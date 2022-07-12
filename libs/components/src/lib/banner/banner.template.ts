import {html, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import {affixIconTemplateFactory} from '../../shared/patterns/affix';
import type {Banner} from './banner';

const getClasses = (_: Banner) => classNames(
	'control',
	[`connotation-${_.connotation}`, !!_.connotation]
);

/**
 *
 */
function renderDismissButton() {
	return html<Banner>`
	  <vwc-button
			  density="condensed"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => x.remove()}">
	  </vwc-button>`;
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

	return html<Banner>`
	  <div class="banner ${getClasses}" tabindex="0">
		  <header class="header">
					<div class="user-content">
            ${x => affixIconTemplate(x.conditionedIcon)}
						<div class="banner--message"
				 role="${x => x.role ? x.role : 'status'}"
				 aria-live="${x => x.ariaLive ? x.ariaLive : 'polite'}">
              ${x => x.text}
            </div>
						<slot class="action-items" name="actionItems"></slot>
					</div>

			  ${when(x => x.removable, renderDismissButton())}
		  </header>
	  </div>
	`;
};

