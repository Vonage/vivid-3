import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Popup } from '../popup/popup';
import type { Toggletip } from './toggletip';

const getClasses = (_: Toggletip) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Toggletip} component.
 *
 * @param context
 * @public
 */
export const ToggletipTemplate:
	(context: ElementDefinitionContext, definition: FoundationElementDefinition) => ViewTemplate<Toggletip> = (context: ElementDefinitionContext) => {
		const button = context.tagFor(Button);
		const popup = context.tagFor(Popup);

		return html`
			<template class="${getClasses}"
				aria-label="${x => x.ariaLabel ? x.ariaLabel : ' ; Show more information'}"
				aria-expanded="${x => x.ariaExpanded}"
				aria-controls="popup"
			>
				<${button}
					?disabled="${x => x.disabled}"
					connotation="${x => x.connotation}"
					appearance="${x => x.appearance}"
					size="${x => x.size ? x.size : 'condensed'}"
					shape="${x => x.shape ? x.shape : 'pill'}"
					icon="${x => x.icon ? x.icon : 'info-line'}"
					${ref('button')}
				>
				</${button}>
				<${popup}
					arrow
					id="popup"
					?alternate="${x => x.alternate}"
					placement="${x => x.placement ? x.placement : 'right'}"
					exportparts="vvd-theme-alternate"
					${ref('popup')}
				>
					<span class="content-wrapper">
						<slot></slot>
					</span>
				</${popup}>
			</template>
		`;
	}
