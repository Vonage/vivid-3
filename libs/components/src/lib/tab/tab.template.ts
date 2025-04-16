import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Tab } from './tab.js';
import { applyHostSemantics } from '../../shared/aria/host-semantics';

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

function renderDismissButton(context: VividElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Tab>` <span
		aria-label="${(x) => x.locale.tab.dismissButtonLabel}"
		class="close"
		id="close-btn"
		@click="${(x, c) => x._handleCloseClick(c.event)}"
	>
		${() => affixIconTemplate('close-line', IconWrapper.Span)}
	</span>`;
}

export const TabTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Tab>`
		<template
			slot="tab"
			${applyHostSemantics({
				role: 'tab',
				ariaDisabled: (x) => x.disabled,
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
