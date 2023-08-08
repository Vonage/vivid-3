import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
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
	[`size-${size}`, Boolean(size)]
);

function actionButton(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<SplitButton>`
	<button
		${ref('_action')}
		class="control ${getClasses}"
		?autofocus="${(x) => x.autofocus}"
		?disabled="${(x) => (x.disabled)}"
		aria-atomic="${(x) => x.ariaAtomic}"
		aria-busy="${(x) => x.ariaBusy}"
		aria-current="${(x) => x.ariaCurrent}"
		aria-disabled="${(x) => x.disabled}"
		aria-expanded="${(x) => x.ariaExpanded}"
		aria-hidden="${(x) => x.ariaHidden}"
		aria-invalid="${(x) => x.ariaInvalid}"
		aria-label="${(x) => x.ariaLabel}"
		aria-live="${(x) => x.ariaLive}"
		aria-pressed="${(x) => x.ariaPressed}"
		?title="${(x) => x.title}">
			${() => focusTemplate}
			${x => affixIconTemplate(x.icon)}
			${(x) => x.label}
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
		?autofocus="${(x) => x.autofocus}"
		?disabled="${(x) => (x.disabled)}"
		title="Open for more actions"
		aria-haspopup="true"
		aria-expanded="${(x) => x.ariaExpanded}"
		aria-disabled="${(x) => x.disabled}"
		aria-label="${(x) => x.ariaLabel}"
		aria-labelledby="${(x) => x.ariaLabelledBy}">
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
		<div class="base" role="group">
			${actionButton(context)}
			${indicatorButton(context)}
			<slot></slot>
		</div>`;
};