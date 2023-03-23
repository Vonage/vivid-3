import { html } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { Tab } from './tab.js';

const getClasses = ({
	disabled, ariaSelected
}: Tab) => classNames(
	'base',
	['disabled', Boolean(disabled)],
	['selected', ariaSelected === 'true'],
);

/**
 * The template for the {@link @vonage/vivid#(Tab:class)} component.
 *
 * @param options
 * @param context
 * @public
 */
export function TabTemplate<T extends Tab>(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<T>`
	<template slot="tab" role="tab" aria-disabled="${x => x.disabled}" aria-selected="${x => x.ariaSelected}">
		<div class="${getClasses}">
      ${() => focusTemplate}
      ${x => affixIconTemplate(x.icon)}
      ${x => x.label}
		</div>
	</template>`;
}
