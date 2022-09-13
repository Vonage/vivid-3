import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import {
	type ElementDefinitionContext,
	ListboxElement as FASTListboxElement,
	type FoundationElementDefinition
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns';
import type { Listbox } from './listbox';

const getClasses = ({ appearance, disabled
}: Listbox) => classNames(
	'base',
	['disabled', disabled],
	[`appearance-${appearance}`, Boolean(appearance)],
);

export const ListboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Listbox> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html`
<template
>
	<div
		aria-activedescendant="${x => x.ariaActiveDescendant}"
		aria-multiselectable="${x => x.ariaMultiSelectable}"
		role="listbox"
		tabindex="${x => (!x.disabled ? '0' : null)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
		@focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
		@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
		@mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
		class="${getClasses}"
		>
			<slot
			${slotted({
		filter: FASTListboxElement.slottedOptionFilter as any,
		flatten: true,
		property: 'slottedOptions'
	})}
			></slot>
			${() => focusTemplate}
	</div>
</template>
	`;
};
