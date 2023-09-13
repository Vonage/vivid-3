import { html } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory, IconWrapper } from '../../shared/patterns/affix';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { Tab } from './tab.js';

const getClasses = ({
	connotation, disabled, ariaSelected, iconTrailing, shape
}: Tab) => classNames(
	'base',
	[`connotation-${connotation}`, (Boolean(connotation)) && (ariaSelected === 'true')],
	[`shape-${shape}`, Boolean(shape)],
	['disabled', Boolean(disabled)],
	['selected', ariaSelected === 'true'],
	['icon-trailing', iconTrailing],
);

/**
 * The template for the (Tab:class) component.
 *
 * @param context - element definition context
 * @public
 */
export function TabTemplate<T extends Tab>(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<T>`
	<template slot="tab" role="tab" aria-disabled="${x => x.disabled}" aria-selected="${x => x.ariaSelected}">
		<div class="${getClasses}" >
      ${() => focusTemplate}
			${x => affixIconTemplate(x.icon, IconWrapper.Slot)}
      ${x => x.label}
		</div>
	</template>`;
}
