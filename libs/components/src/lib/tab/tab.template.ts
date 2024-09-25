import { html, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { Tab } from './tab.js';

const getClasses = ({
	connotation,
	disabled,
	ariaSelected,
	iconTrailing,
	shape,
	removable,
}: Tab) =>
	classNames(
		'base',
		[
			`connotation-${connotation}`,
			Boolean(connotation) && ariaSelected === 'true',
		],
		[`shape-${shape}`, Boolean(shape)],
		['disabled', Boolean(disabled)],
		['selected', ariaSelected === 'true'],
		['icon-trailing', iconTrailing],
		['removable', removable]
	);

function renderDismissButton(buttonTag: string) {
	return html<Tab>`
		<${buttonTag}
			aria-label=""
			size="super-condensed"
			class="close"
			id="close-btn"
			icon="close-line"
			@click="${(x, c) => x._handleCloseClick(c.event)}"
			tabindex="-1"
		></${buttonTag}>`;
}

/**
 * The template for the (Tab:class) component.
 *
 * @param context - element definition context
 * @public
 */
export function TabTemplate<T extends Tab>(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const buttonTag = context.tagFor(Button);

	return html<T>`<template
		slot="tab"
		@keydown="${(x, c) => x._onKeyDown(c.event as KeyboardEvent)}"
	>
		<div
			role="tab"
			aria-disabled="${(x) => x.disabled}"
			aria-selected="${(x) => x.ariaSelected}"
			class="${getClasses}"
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.label}
		</div>
		${when((x) => x.removable, renderDismissButton(buttonTag))}
	</template>`;
}
