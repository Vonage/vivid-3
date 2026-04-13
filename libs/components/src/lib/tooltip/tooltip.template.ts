import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { anchorSlotTemplateFactory } from '../../shared/patterns/anchored';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { renderInLightDOM } from '../../shared/templating/render-in-light-dom';
import type { Tooltip } from './tooltip';

const getClasses = ({ open }: Tooltip) =>
	classNames('control', ['open', Boolean(open)]);

export const TooltipTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);
	const anchorSlotTemplate = anchorSlotTemplateFactory();

	return html<Tooltip>`
${anchorSlotTemplate}
${renderInLightDOM(html<Tooltip>`<span slot="_description" id="${(x) => x._descriptionId}">${(x) => x.text}</span>`)}
<${popupTag} class="${getClasses}" arrow alternate
	:placement=${(x) => x.placement}
	:anchor="${(x) => x._anchorEl}"
	:open="${(x) => x.open}"
	@keydown="${(x, c) => {
		if (x.open && handleEscapeKeyAndStopPropogation(c.event as KeyboardEvent)) {
			x.open = false;
		}
	}}"
  exportparts="vvd-theme-alternate">
  <div part="vvd-theme-alternate" class="tooltip" role="tooltip">
		<slot name="_description"></slot>
  </div>
</${popupTag}>`;
};
