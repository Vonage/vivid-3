import { ViewTemplate, when } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { ProgressRing } from '../progress-ring/progress-ring';
import { Size } from '../enums';
import { affixIconTemplateFactory, IconWrapper } from '../../shared/patterns/affix';
import type { Button, ButtonAppearance, ButtonSize } from './button';


const getAppearanceClassName = (appearance: ButtonAppearance, disabled: boolean) => {
	let className = `appearance-${appearance}`;
	disabled && (className += ' disabled');
	return className;
};

const getClasses = ({
	connotation, appearance, shape, iconTrailing, icon, label, disabled, stacked, size
}: Button) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	[getAppearanceClassName(appearance as ButtonAppearance, disabled), Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
	['icon-only', !label && !!icon],
	['icon-trailing', iconTrailing],
	['stacked', Boolean(stacked)],
);

function renderIconOrPending(
	context: ElementDefinitionContext,
	icon: string | undefined,
	pending: boolean,
	size: ButtonSize | undefined = Size.Normal
) {
	if (pending && size != Size.SuperCondensed) {
		const progressTag = context.tagFor(ProgressRing);
		const progressSize = {
			[Size.Condensed]: '-6',
			[Size.Normal]: '-5',
			[Size.Expanded]: '-4',
		};
		return html`<span class="icon pending">${`<${progressTag} size="${progressSize[size]}"></${progressTag}>`}</span>`;

	} else {
		const affixIconTemplate = affixIconTemplateFactory(context);
		return affixIconTemplate(icon, IconWrapper.Slot);
	}
}

/**
 * The template for the (Button:class) component.
 *
 * @param context - element definition context
 * @public
 */
export const buttonTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Button> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html`
	<button
		class="${getClasses}"
		?autofocus="${(x) => x.autofocus}"
		?disabled="${(x) => x.disabled || x.pending}"
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
		title="${x => x.title}"
		${ref('control')}
	>
		${() => focusTemplate}

		${x => renderIconOrPending(context, x.icon, x.pending, x.size)}

		${when(x => x.label, html`<span class="text">${(x) => x.label}</span>`)}
	</button>
`;
};
