import {html, ref} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext, FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {Elevation} from '../elevation/elevation';
import type { Tooltip } from './tooltip';

const getClasses = ({
	open
}: Tooltip) => classNames(
	'control',
	['open', Boolean(open)],
);

/**
	* The template for the {@link @microsoft/fast-foundation#Tooltip} component.
	*
	* @param context
	* @public
	*/
export const TooltipTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Tooltip> = (context: ElementDefinitionContext) => {

	const elevationTag = context.tagFor(Elevation);

	return html<Tooltip>`
  <${elevationTag}>
	  <div class="popup-wrapper ${(x) => x.strategy}" ${ref('popupEl')} part="popup-base">
			<div class="${getClasses}" aria-hidden="${(x) => x.open ? 'false' : 'true'}"
				part="vvd-theme-alternate">
				<div class="popup-content">
					<div class="tooltip" role="tooltip">
						<header part="vvd-theme-alternate" class="tooltip-header">
							<div class="tooltip-text">${(x) => x.text}</div>
						</header>
					</div>
				</div>
				<div class="arrow" ${ref('arrowEl')}></div>
			</div>
    </div>
  </${elevationTag}>`;

};
