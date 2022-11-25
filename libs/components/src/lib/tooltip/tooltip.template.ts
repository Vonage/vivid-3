import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import type { Tooltip } from './tooltip';

const getClasses = (_: Tooltip) => classNames('control');

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
	const popupTag = context.tagFor(Popup);

	return html`
<${popupTag} class="${getClasses}" arrow alternate
placement=${(x) => x.placement} open=${(x) => x.open} anchor=${(x) => x.anchor}
  exportparts="vvd-theme-alternate" role="tooltip">
  <div class="tooltip">
    <header part="vvd-theme-alternate" class="tooltip-header">
      <div class="tooltip-text">${(x) => x.text}</div>
    </header>
  </div>
</${popupTag}>`;
};