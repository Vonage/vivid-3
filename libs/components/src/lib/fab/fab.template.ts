import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Focus } from '../focus/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { Fab } from './fab';

const getClasses = ({
    connotation, icon, label, iconTrailing, disabled
}: Fab) => classNames(
    'control',
    [`connotation-${connotation}`, Boolean(connotation)],
    ['icon-only', !label && !!icon],
    ['icon-trailing', iconTrailing],
    ['disabled', disabled],
);

const focusTemplate = (context: ElementDefinitionContext) => {
    const focusTag = context.tagFor(Focus);

    return html`<${focusTag} class="focus-indicator"></${focusTag}>`;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const FabTemplate: (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) => ViewTemplate<Fab> = (context: ElementDefinitionContext) => {
    const affixIconTemplate = affixIconTemplateFactory(context);

    return html`
        <button
            class="${getClasses} "
            ?autofocus="${(x) => x.autofocus}"
            ?disabled="${(x) => x.disabled}"
            form="${(x) => x.formId}"
            formaction="${(x) => x.formaction}"
            formenctype="${(x) => x.formenctype}"
            formmethod="${(x) => x.formmethod}"
            formnovalidate="${(x) => x.formnovalidate}"
            formtarget="${(x) => x.formtarget}"
            name="${(x) => x.name}"
            type="${(x) => x.type}"
            value="${(x) => x.value}"
            aria-atomic="${(x) => x.ariaAtomic}"
            aria-busy="${(x) => x.ariaBusy}"
            aria-controls="${(x) => x.ariaControls}"
            aria-current="${(x) => x.ariaCurrent}"
            aria-describedby="${(x) => x.ariaDescribedby}"
            aria-details="${(x) => x.ariaDetails}"
            aria-disabled="${(x) => x.ariaDisabled}"
            aria-errormessage="${(x) => x.ariaErrormessage}"
            aria-expanded="${(x) => x.ariaExpanded}"
            aria-flowto="${(x) => x.ariaFlowto}"
            aria-haspopup="${(x) => x.ariaHaspopup}"
            aria-hidden="${(x) => x.ariaHidden}"
            aria-invalid="${(x) => x.ariaInvalid}"
            aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
            aria-label="${(x) => x.ariaLabel}"
            aria-labelledby="${(x) => x.ariaLabelledby}"
            aria-live="${(x) => x.ariaLive}"
            aria-owns="${(x) => x.ariaOwns}"
            aria-pressed="${(x) => x.ariaPressed}"
            aria-relevant="${(x) => x.ariaRelevant}"
            aria-roledescription="${(x) => x.ariaRoledescription}"		
            ${ref('control')}
        >
            ${() => focusTemplate(context)}
            ${x => affixIconTemplate(x.icon)}
            ${(x) => x.label}
        </button>
`;
};
