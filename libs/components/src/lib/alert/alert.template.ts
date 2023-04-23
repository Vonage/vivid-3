import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import {
	Button,
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { affixIconTemplateFactory } from '../shared/patterns';
import type { Alert } from './alert';

const getClasses = (_: Alert) => classNames(
	'base',
	[`connotation-${_.connotation}`, !!_.connotation]
);


/**
 *
 */
function Headline() {
	return html`
		<div class="headline">${(x) => x.headline}</div>
	`;
}

/**
 *
 */
function Subtitle() {
	return html`
		<div class="subtitle">${(x) => x.subtitle}</div>
	`;
}

/**
 *
 */
function renderIcon(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Alert>`
	${x => affixIconTemplate(x.conditionedIcon)}
	`;
}

/**
 *
 */
function renderDismissButton(buttonTag: string) {
	return html<Alert>`
	  <${buttonTag}
			size="condensed"
			class="dismiss-button"
			icon="close-line"
			@click="${x => x.remove()}">
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
	<${elevationTag} class="elevation" dp='4' exportparts="vvd-theme-alternate">
		<div class="control" role="alert" aria-live="assertive">
			<slot name="main">
				<div part="vvd-theme-alternate" class="${getClasses}">
					${when(x => x.icon || x.connotation, renderIcon(context))}
					<div class="alert-text">
						${when(x => x.headline, Headline())}
						${when(x => x.subtitle, Subtitle())}
					</div>
					<slot class="action-items" name="action-items"></slot>
					${when(x => x.removable, renderDismissButton(buttonTag))}
				</div>
			</slot>
		</div>
	</${elevationTag}>
	`;
};

