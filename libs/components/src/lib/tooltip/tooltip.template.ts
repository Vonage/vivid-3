import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
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
) => ViewTemplate<Tooltip> = () => html`
<vwc-popup class="${getClasses}" arrow alternate
placement=${(x) => x.placement} open=${(x) => x.open} anchor=${(x) => x.anchor}
  exportparts="vvd-theme-alternate">
  <div class="tooltip" role="tooltip" inert>
    <header part="vvd-theme-alternate" class="tooltip-header">
      <div class="tooltip-text">${(x) => x.text}</div>
    </header>
  </div>
</vwc-popup>`;
