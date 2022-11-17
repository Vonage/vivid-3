import { html } from '@microsoft/fast-element';
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
			<span class="${getClasses}">
				<${button} id="_ttanchor_" shape="pill" icon="info-line" aria-label="Mute"></${button}>
				<${popup} id="_toggletip_" arrow placement="right">
					<span style="padding: 12px;">
						<slot></slot>
					</span>
				</${popup}>
			</span>
		`;
	}
