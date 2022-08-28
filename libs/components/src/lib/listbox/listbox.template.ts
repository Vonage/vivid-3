import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Listbox } from './listbox';

const getClasses = ({
	disabled
}: Listbox) => classNames(
	'base',
	['disabled', disabled],
);

export const ListboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Listbox> = () => {
	return html`
	<ul class="${getClasses}"
		aria-activedescendant="${x => x.ariaActiveDescendant}"
		aria-multiselectable="${x => x.ariaMultiSelectable}"
		role="listbox"
		tabindex="${x => (!x.disabled ? "0" : null)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
		@focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
		@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
		@mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}">
		<slot></slot>
	</ul>
	`;
};
