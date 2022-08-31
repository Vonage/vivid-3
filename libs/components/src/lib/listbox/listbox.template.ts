import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Listbox } from "./listbox";
import { focusTemplateFactory } from '../../shared/patterns';

const getClasses = ({
}: Listbox) => classNames(
	'base',
);

export const ListboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Listbox> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html`
	<div class="${getClasses}"
		aria-activedescendant="${x => x.ariaActiveDescendant}"
		role="listbox"
		tabindex="${x => (!x.disabled ? "0" : null)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
		@focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
		@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
		@mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}">
		<slot ${slotted({
			filter: Listbox.slottedOptionFilter,
			flatten: true,
			property: "slottedOptions",
		})}></slot>
		${() => focusTemplate}
	</div>
	`;
};
