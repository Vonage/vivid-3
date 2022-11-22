import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Popup } from '../popup/popup';
// import { Layout } from '../layout/layout';
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
		// const layout = context.tagFor(Layout);

		return html`
			<div class="${getClasses}">
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
					?alternate="${x => x.alternate}"
					placement="${x => x.placement ? x.placement : 'right'}"
					exportparts="vvd-theme-alternate"
					${ref('popup')}
				>
					<span style="padding: 12px;">
						<slot></slot>
					</span>
				</${popup}>
			</div>
		`;
	}
