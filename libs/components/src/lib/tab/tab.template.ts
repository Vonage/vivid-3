import { html } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
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

function renderDismissButton(iconTag: string) {
	return html<Tab>`
		<span
			aria-label="${(x) => x.locale.tab.dismissButtonLabel}"
			class="close"
			id="close-btn"
			@click="${(x, c) => x._handleCloseClick(c.event)}"
		>
			<${iconTag}
				name="close-line"
			></${iconTag}>
		</span>`;
}

/**
 * The template for the (Tab:class) component.
 *
 * @param context - element definition context
 * @public
 */
export function TabTemplate<T extends Tab>(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html<T>`
		<template
			slot="tab"
			role="tab"
			aria-disabled="${(x) => x.disabled}"
			aria-selected="${(x) => x.ariaSelected}"
			@keydown="${(x, c) => x._onKeyDown(c.event as KeyboardEvent)}"
		>
			<div class="${getClasses}">
				${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.label}
				${(x) => (x.removable ? renderDismissButton(iconTag) : null)}
			</div>
		</template>
	`;
}
