import { html, ref, type ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { Button } from './button';

const getClasses = ({
	connotation, appearance, shape, size, iconTrailing, icon, label, stackedButton
}: Button) => classNames(
	'control',
	['icon-trailing', iconTrailing],
	[`connotation-${connotation}`, Boolean(connotation)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
	['icon-only', !label && !!icon],
	['stacked', stackedButton],
);

const iconTemplate = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<span class="affix"><${iconTag} :type="${(x) => x.icon}"></${iconTag}></span>`;
};

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const buttonTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Button> = (context: ElementDefinitionContext) => html`
    <button
        class="${getClasses}"
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
        ${(x) => (x.icon ? iconTemplate(context) : '')}
        ${(x) => x.label}
    </button>
`;
