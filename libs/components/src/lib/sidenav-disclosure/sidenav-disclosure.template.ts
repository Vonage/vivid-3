import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { Disclosure } from './sidenav-disclosure';

const getClasses = (_: Disclosure) => classNames(
	'base',
);

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
) => ViewTemplate<Disclosure> = (
	context: ElementDefinitionContext,
	) => {
		const affixIconTemplate = affixIconTemplateFactory(context);
		const focusTemplate = focusTemplateFactory(context);

		return html`<details class="disclosure" ${ref('details')}>
        <summary class="${getClasses}"
            class="invoker"
            role="button"
            aria-controls="disclosure-content"
            aria-expanded="${x => x.expanded}"
        >
            <slot name="start">${x => affixIconTemplate(x.icon)}</slot>
            <slot name="summary">${x => x.label}</slot>
            <slot name="end">
				${when(x => x.expanded, html`<vwc-icon type='chevron-up-solid'></vwc-icon>`)}
				${when(x => !x.expanded, html`<vwc-icon type='chevron-down-solid'></vwc-icon>`)}
			</slot>
			${() => focusTemplate}
        </summary>
        <div class="control" id="disclosure-content"><slot></slot></div>
    </details>
	`;
	};
