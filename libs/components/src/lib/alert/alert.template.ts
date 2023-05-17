import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import {
	Button,
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { affixIconTemplateFactory } from '../../shared/patterns';
import type { Alert } from './alert';

const getClasses = ({ connotation }: Alert) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
);

const getControlClasses = ({ open, placement }: Alert) => classNames(
	'control',
	['open', open],
	[`placement-${placement}`, Boolean(placement)],
);

function renderIcon(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`${x => affixIconTemplate(x.conditionedIcon)}`;
}

function renderDismissButton(buttonTag: string) {
	return html`
		<${buttonTag}
			size="condensed"
			class="dismiss-button"
			icon="close-line"
			@click="${x => x.open = false}">
		</${buttonTag}>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Alert} component.
 *
 * @param context
 * @public
 */
export const AlertTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Alert> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const buttonTag = context.tagFor(Button);

	return html<Alert>`
	<${elevationTag} class="elevation" dp='8' exportparts="vvd-theme-alternate">
		<div class="${getControlClasses}" role="alert" aria-live="assertive">
			<div part="vvd-theme-alternate" class="${getClasses}">
				${when(x => x.icon || x.connotation, renderIcon(context))}
				<div class="alert-text">
					${when(x => x.headline,
		html`<div class="headline">${(x) => x.headline}</div>`)}
					<slot>
						${when(x => x.text,
		html`<div class="maintext">${(x) => x.text}</div>`)}
					</slot>
				</div>
				<slot class="action-items" name="action-items"></slot>
				${when(x => x.removable, renderDismissButton(buttonTag))}
			</div>
		</div>
	</${elevationTag}>
	`;
};

