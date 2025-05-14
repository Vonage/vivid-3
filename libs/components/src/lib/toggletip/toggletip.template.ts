import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { anchorSlotTemplateFactory } from '../../shared/patterns/anchored';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Toggletip } from './toggletip';

const getClasses = (_: Toggletip) => classNames('control');

export const ToggletipTemplate = (context: VividElementDefinitionContext) => {
	const popup = context.tagFor(Popup);
	const anchorSlotTemplate = anchorSlotTemplateFactory();

	return html<Toggletip>`
		${anchorSlotTemplate}
		<${popup}
			@keydown="${(x, { event }) => {
				if (
					x.open &&
					handleEscapeKeyAndStopPropogation(event as KeyboardEvent)
				) {
					return false;
				}
				return true;
			}}"
			class="${getClasses}"
			arrow
			:anchor="${(x) => x._anchorEl}"
			:open="${(x) => x.open}"
			?alternate="${(x) => !x.alternate}"
			placement="${(x) => x.placement}"
			exportparts="vvd-theme-alternate"
		>
			<div class="content-wrapper">
				${when((x) => x.headline, html`<h2 class="headline">${(x) => x.headline}</h2>`)}
				<slot></slot>
				<footer class="action-items"><slot name="action-items"></slot></footer>
			</div>
		</${popup}>
	`;
};
