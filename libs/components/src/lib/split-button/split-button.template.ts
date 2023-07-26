import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { SplitButton } from './split-button';
import { Icon } from '../icon/icon';

const getClasses = ({
	connotation, appearance, shape, icon, label, disabled, size
}: SplitButton) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	['disabled', disabled],
	[`shape-${shape}`, Boolean(shape)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`size-${size}`, Boolean(size)],
	['icon-only', !label && !!icon],
);

/**
 *
 * @param context - element definition context
 * @public
 */
export const SplitButtonTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SplitButton> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html<SplitButton>`
	<div class="base">
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
			${() => focusTemplate}
			${x => affixIconTemplate(x.icon)}
			${(x) => x.label}
		</button>
		<div class="popup-button" aria-haspopup="true" aria-expanded="${(x) => x.open}" title="Open for more actions" tabindex="-1">
			${when(x => x.open, html<SplitButton>`<${iconTag} class="toggleIcon" name='chevron-up-solid'></${iconTag}>`)}
			${when(x => !x.open, html<SplitButton>`<${iconTag} class="toggleIcon" name='chevron-down-solid'></${iconTag}>`)}
		</div>
	</div>`;
};
