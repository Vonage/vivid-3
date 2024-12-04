import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { SplitButton } from './split-button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

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

function actionButton(context: VividElementDefinitionContext) {
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

function indicatorButton(context: VividElementDefinitionContext) {
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

export const SplitButtonTemplate = (context: VividElementDefinitionContext) => {
	return html<SplitButton>` <template role="presentation">
		<div class="base" role="group">
			${actionButton(context)} ${indicatorButton(context)}
			<slot></slot>
		</div>
	</template>`;
};
