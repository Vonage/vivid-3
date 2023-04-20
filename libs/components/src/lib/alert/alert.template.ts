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
		<div class="header-headline">${(x) => x.headline}</div>
	`;
}

/**
 *
 */
function Subtitle() {
	return html`
		<div class="header-subtitle">${(x) => x.subtitle}</div>
	`;
}

/**
 *
 */
function headerContent() {
	return html`
		<div class="header-content">
			${when(x => x.headline, Headline())}
			${when(x => x.subtitle, Subtitle())}
		</div>
	`;
}

/**
 header
 */
function renderHeader() {

	return html<Alert>`
		<header class="header">
			${when(x => x.headline || x.subtitle, headerContent())}
		</header>`;
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
			  appearance="filled"
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
	<${elevationTag} dp='4'>
		<div class="${getClasses}">
			<div class="start-content">
				${when(x => x.icon || x.connotation, renderIcon(context))}
				${renderHeader()}
			</div>
			<div class="end-content">
				<slot class="action-items" name="action-items"></slot>
				${when(x => x.removable, renderDismissButton(buttonTag))}
			</div>
		</div>
	</${elevationTag}>
	`;
};

