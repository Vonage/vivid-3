import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { resolveIcon } from '../icon/icon';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { NavDisclosure } from './nav-disclosure';

/**
 * The template for the {@link @microsoft/fast-foundation#Nav} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const NavDisclosureTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<NavDisclosure> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);
	['chevron-up-solid', 'chevron-down-solid'].forEach(i => resolveIcon(i));
	return html`<details class="base" ${ref('details')} ?open=${x => x.open}>
        <summary class="control"
            role="button"
            aria-controls="disclosure-content"
			aria-expanded="${x => x.open}"
        >
            ${x => affixIconTemplate(x.icon)}
            ${x => x.label}
			${when(x => x.open, html<NavDisclosure>`<vwc-icon class="toggleIcon" name='chevron-up-solid'></vwc-icon>`)}
			${when(x => !x.open, html<NavDisclosure>`<vwc-icon class="toggleIcon" name='chevron-down-solid'></vwc-icon>`)}
			${() => focusTemplate}
        </summary>
        <div class="content" id="disclosure-content">
			<slot></slot>
		</div>
    </details>
	`;
};


