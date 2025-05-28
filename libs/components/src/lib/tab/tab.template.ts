import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { Tab } from './tab.js';

const getClasses = ({
	connotation,
	disabled,
	selected,
	iconTrailing,
	shape,
	removable,
}: Tab) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation) && Boolean(selected)],
		[`shape-${shape}`, Boolean(shape)],
		['disabled', Boolean(disabled)],
		['selected', Boolean(selected)],
		['icon-trailing', iconTrailing],
		['removable', removable]
	);

function renderDismissButton(context: VividElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Tab>`<button
		aria-label="${(x) => x.locale.tab.dismissButtonLabel}"
		class="close"
		id="close-btn"
		@click="${(x, c) => x._handleCloseClick(c.event)}"
	>
		${() => affixIconTemplate('close-line', IconWrapper.Span)}
	</button>`;
}

export const TabTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Tab>`
		<template
			slot="tab"
			${applyHostSemantics({
				role: 'tab',
				ariaDisabled: (x) => x.disabled,
				ariaSelected: (x) => x.selected,
			})}
			@keydown="${(x, c) => x._onKeyDown(c.event as KeyboardEvent)}"
		>
			<div class="${getClasses}">
				${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.label}
				${(x) => (x.removable ? renderDismissButton(context) : null)}
			</div>
		</template>
	`;
};
