import { ViewTemplate, when } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { ProgressRing } from '../progress-ring/progress-ring';
import { Size } from '../enums';
import { affixIconTemplateFactory, IconAriaHidden, IconWrapper } from '../../shared/patterns/affix';
import type { Button, ButtonAppearance, ButtonSize } from './button';


const getAppearanceClassName = (appearance: ButtonAppearance, disabled: boolean) => {
	let className = `appearance-${appearance}`;
	disabled && (className += ' disabled');
	return className;
};

const getClasses = ({
	connotation, appearance, shape, iconTrailing, icon, label, disabled, stacked, size, iconSlottedContent
}: Button) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	[getAppearanceClassName(appearance as ButtonAppearance, disabled), Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	[`size-${size}`, Boolean(size)],
	['icon-only', !label && !!(icon || iconSlottedContent?.length)],
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
		return html`<span class="icon pending"><${progressTag} size="${progressSize[size]}"></${progressTag}></span>`;

	} else {
		const affixIconTemplate = affixIconTemplateFactory(context);
		return affixIconTemplate(icon, IconWrapper.Slot, IconAriaHidden.Hidden);
	}
}

function renderButtonContent(context: ElementDefinitionContext) {
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
			aria-current="${(x) => x.ariaCurrent}"
			aria-details="${(x) => x.ariaDetails}"
			aria-disabled="${(x) => x.ariaDisabled}"
			aria-expanded="${(x) => x.ariaExpanded}"
			aria-haspopup="${(x) => x.ariaHaspopup}"
			aria-hidden="${(x) => x.ariaHidden}"
			aria-invalid="${(x) => x.ariaInvalid}"
			aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
			aria-label="${(x) => x.ariaLabel}"
			aria-live="${(x) => x.ariaLive}"
			aria-pressed="${(x) => x.ariaPressed}"
			aria-relevant="${(x) => x.ariaRelevant}"
			aria-roledescription="${(x) => x.ariaRoledescription}"
			title="${x => x.title}"
			${ref('control')}>
		${x => renderIconOrPending(context, x.icon, x.pending, x.size)}
		${when(x => x.label, html`<span class="text" role="presentation">${(x) => x.label}</span>`)}
	</button>`;
}

function renderAnchorContent(context: ElementDefinitionContext) {
	return html`<a
		class="${getClasses}"
		href="${x => x.href}"
		hreflang="${x => x.hreflang}"
		ping="${x => x.ping}"
		referrerpolicy="${x => x.referrerpolicy}"
		rel="${x => x.rel}"
		target="${x => x.target}"
		type="${x => x.type}"
		aria-atomic="${x => x.ariaAtomic}"
		aria-busy="${x => x.ariaBusy}"
		aria-current="${x => x.ariaCurrent}"
		aria-details="${x => x.ariaDetails}"
		aria-disabled="${x => x.ariaDisabled}"
		aria-errormessage="${x => x.ariaErrormessage}"
		aria-expanded="${x => x.ariaExpanded}"
		aria-haspopup="${x => x.ariaHaspopup}"
		aria-hidden="${x => x.ariaHidden}"
		aria-invalid="${x => x.ariaInvalid}"
		aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
		aria-label="${x => x.ariaLabel}"
		aria-live="${x => x.ariaLive}"
		aria-relevant="${x => x.ariaRelevant}"
		aria-roledescription="${x => x.ariaRoledescription}"
		${ref('control')}>
	${x => renderIconOrPending(context, x.icon, x.pending, x.size)}
	${when(x => x.label, html`<span class="text" role="presentation">${(x) => x.label}</span>`)}
	</a>`;
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

	return html`
		<template role="presentation">
			${when(x => x.label && !x.href, html<Button>`${renderButtonContent(context)}`)}
			${when(x => x.href && x.href.length > 0, html<Button>`${renderAnchorContent(context)}`)}
		</template>`;
};
