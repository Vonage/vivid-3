import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Popup } from './popup';

const getClasses = ({
	open, dismissible, alternate
}: Popup) => classNames(
	'control',
	['open', Boolean(open)],
	['dismissible', Boolean(dismissible)],
	['alternate', Boolean(alternate)]
);

/**
 * The template for the {@link @vonage/vivid#Popup} component.
 *
 * @returns {ViewTemplate<Popup>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const popupTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Popup> = () => html`
  <vwc-elevation>
    <!--the popup-wrapper is needed for alternating the inside of the popup nd not its shadow-->
	  <div class="popup-wrapper" ${ref('popupEl')}>
			<div class="${getClasses}" aria-hidden="${(x) => x.open ? 'false' : 'true'}"
				part="${(x) => x.alternate ? 'vvd-theme-alternate' : ''}">
				<div class="popup-content">
					<slot></slot>
					${when(x => x.dismissible,
	html<Popup>`<vwc-button size="base-small" @click="${x => (x.open = false)}"
						class="dismissible" icon="close-small-solid" shape="pill"></vwc-button>`)}
				</div>
				${when(x => x.arrow,
		html<Popup>`<div class="arrow" ${ref('arrowEl')}></div>`)}
			</div>
    </div>
  </vwc-elevation>`;