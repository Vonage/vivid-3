import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Elevation } from '../elevation/elevation';
import { Button } from '../button/button';
import type { Popup } from './popup';

const getClasses = ({
	dismissible, alternate
}: Popup) => classNames(
	'control',
	['dismissible', Boolean(dismissible)],
	['alternate', Boolean(alternate)]
);

/**
 * The template for the {@link @vonage/vivid#Popup} component.
 *
 * @param context
 * @returns {ViewTemplate<Popup>} A template capable of creating HTMLView instances or rendering directly to DOM.
 * @public
 */
export const popupTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Popup> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);

	return html`
	<${elevationTag}>
		<div class="popup-wrapper ${(x) => x.strategy}" ${ref('popupEl')}>
			<div class="${getClasses}" aria-hidden="${(x) => x.open ? 'false' : 'true'}"
				part="${(x) => x.alternate ? 'vvd-theme-alternate' : ''}">
				<div class="popup-content">
					<slot></slot>
					${when(x => x.dismissible,
					html<Popup>`<${buttonTag} size="condensed" @click="${x => (x.open = false)}" class="dismissible-button"
							icon="close-small-solid" shape="pill"></${buttonTag}>`)}
				</div>
				${when(x => x.arrow, html<Popup>`<div class="arrow" ${ref('arrowEl')}></div>`)}
			</div>
		</div>
	</${elevationTag}>`;
};
