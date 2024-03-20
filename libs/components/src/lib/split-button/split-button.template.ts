import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { SplitButton } from './split-button';

const getClasses = ({
	connotation,
	appearance,
	shape,
	disabled,
	size,
	label,
	icon,
	iconSlottedContent,
}: SplitButton) =>
	classNames(
		[`connotation-${connotation}`, Boolean(connotation)],
		['disabled', disabled],
		[`shape-${shape}`, Boolean(shape)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`size-${size}`, Boolean(size)],
		['icon-only', !label && !!(icon || iconSlottedContent?.length)]
	);

function actionButton(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<SplitButton>`
		<button
			${ref('_action')}
			class="control ${getClasses}"
			aria-label="${(x) => x.ariaLabel}"
			?disabled="${(x) => x.disabled}"
			@click="${(x) =>
				x.$emit('action-click', undefined, {
					bubbles: false,
				})}"
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			<span class="text">${(x) => x.label}</span>
		</button>
	`;
}

function indicatorButton(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<SplitButton>`
		<button
			${ref('_indicator')}
			class="indicator ${getClasses}"
			?disabled="${(x) => x.disabled}"
			aria-label="${(x) =>
				x.indicatorAriaLabel || x.locale.splitButton.showMoreActionsLabel}"
			aria-expanded="${(x) => x.ariaExpanded}"
			@click="${(x) =>
				x.$emit('indicator-click', undefined, {
					bubbles: false,
				})}"
		>
			${(x) => affixIconTemplate(x.splitIndicator)}
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
	return html<SplitButton>` <template role="presentation">
		<div class="base" role="group">
			${actionButton(context)} ${indicatorButton(context)}
			<slot></slot>
		</div>
	</template>`;
};
