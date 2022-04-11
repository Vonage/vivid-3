import {html, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import '../button';
import '../text-anchor';
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
			  size="base-small"
			  class="dismiss-button"
			  icon="close-line"
			  @click="${x => x.remove()}">
	  </vwc-button>`;
}

function renderActionButton() {
	return html<Banner>`
	  <vwc-button
					  appearance="filled"
					  connotation="cta"
			  class="action-item"
			  label="${x => x.actionText}"
			  @click="${x => x.$emit('vwc-banner:action')}">
	  </vwc-button>`;
}

function renderActionAnchor() {
	return html<Banner>`
	  <vwc-text-anchor
			  class="action-item"
			  href="${x => x.actionHref}"
			  text="${x => x.actionText}">
	  </vwc-text-anchor>`;
}

function renderActionItem() {
	return html<Banner>`
	  ${when(x => !x.actionHref, renderActionButton())}
	  ${when(x => x.actionHref, renderActionAnchor())}`;
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
					<span class="user-content">
            ${x => affixIconTemplate(x.conditionedIcon)}
						<div class="banner--message"
				 role="${x => x.role ? x.role : 'status'}"
				 aria-live="${x => x.ariaLive ? x.ariaLive : 'polite'}">
              ${x => x.text}
            </div>
							${when(x => x.actionText, renderActionItem())}
					</span>

			  ${when(x => x.removable, renderDismissButton())}
		  </header>
	  </div>
	`;
};
