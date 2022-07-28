import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { SidenavDisclosure } from './sidenav-disclosure';

/**
 * The template for the {@link @microsoft/fast-foundation#Sidenav} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const SidenavDisclosureTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SidenavDisclosure> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);
	return html`<details class="base" ${ref('details')} ?open=${x => x.open}>
        <summary class="control"
            role="button"
            aria-controls="disclosure-content"
			aria-expanded="${x => x.open}"
        >
            ${x => affixIconTemplate(x.icon)}
            ${x => x.label}
			${when(x => x.open, html<SidenavDisclosure>`<vwc-icon class="toggleIcon" type='chevron-up-solid'></vwc-icon>`)}
			${when(x => !x.open, html<SidenavDisclosure>`<vwc-icon class="toggleIcon" type='chevron-down-solid'></vwc-icon>`)}
			${() => focusTemplate}
        </summary>
        <div class="content" id="disclosure-content"><slot></slot></div>
    </details>
	`;
};


