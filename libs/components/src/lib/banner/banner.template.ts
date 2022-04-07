import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import '../button';
import type { Banner } from './banner';

const getClasses = (_: Banner) => classNames('control');

/**
 *
 */
function renderDismissButton() {
	return html<Banner>`
    <vwc-button
      class="dismiss-button"
      icon="close-line"
      @click="${x => x.dismissible = false}">
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
) => ViewTemplate<Banner> = () => html<Banner>`
      <div class="banner ${getClasses}" tabindex="0">
				<header class="header">
					<span class="user-content">
						<div class="banner--message"
                 role="${x => x.role ? x.role : 'status'}"
                 aria-live="${x => x.ariaLive ? x.ariaLive : 'polite'}">
              ${x => x.message}
            </div>
					</span>
            ${when(x => x.dismissible, renderDismissButton())}
        </header>
      </div>
`;
