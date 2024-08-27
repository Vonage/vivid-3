import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { anchorSlotTemplateFactory } from '../../shared/patterns/anchored';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';
import type { Toggletip } from './toggletip';

const getClasses = (_: Toggletip) => classNames('control');

/**
 * The template for the Toggletip component.
 *
 * @param context - element definition context
 * @public
 */
export const ToggletipTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Toggletip> = (context: ElementDefinitionContext) => {
	const popup = context.tagFor(Popup);
	const anchorSlotTemplate = anchorSlotTemplateFactory();

	return html`
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
				${when(
					(x) => x.headline,
					html`<header class="headline">${(x) => x.headline}</header>`
				)}
				<slot></slot>
				<footer class="action-items"><slot name="action-items"></slot></footer>
			</div>
		</${popup}>
	`;
};
