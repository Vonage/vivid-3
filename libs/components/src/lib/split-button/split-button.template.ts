import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { SplitButton } from './split-button';

const getClasses = ({
	connotation, appearance, shape, disabled, size
}: SplitButton) => classNames(
	[`connotation-${connotation}`, Boolean(connotation)],
	['disabled', disabled],
	[`shape-${shape}`, Boolean(shape)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`size-${size}`, Boolean(size)],

);

function actionButton(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<SplitButton>`
	<button
		${ref('_action')}
		class="control ${getClasses} ${(x) => !x.label && !!x.icon ? 'icon-only' : ''}"
		aria-label="${(x) => x.ariaLabel}"
		?disabled="${(x) => x.disabled}">
			${() => focusTemplate}
			${x => affixIconTemplate(x.icon)}
		<span class="text">${(x) => x.label}</span>
	</button>
	`;
}

function indicatorButton(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<SplitButton>`
	<button
		${ref('_indicator')}
		class="indicator ${getClasses}"
		?disabled="${(x) => x.disabled}"
		aria-label="Open for more actions"
		aria-haspopup="true"
		aria-expanded="${(x) => x.ariaExpanded}">
			${() => focusTemplate}
			${x => affixIconTemplate(x.splitIndicator)}
	</button>
	`;
}

/**
 *
 * @param context - element definition context
 * @public
 */
export const SplitButtonTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SplitButton> = (context: ElementDefinitionContext) => {
	return html<SplitButton>`
		<template role="presentation">
			<div class="base" role="group">
				${actionButton(context)}
				${indicatorButton(context)}
				<slot></slot>
			</div>
		</template>`;
};
