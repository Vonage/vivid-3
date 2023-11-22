import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { Connotation } from '../enums.js';
import { Checkbox } from '../checkbox/checkbox';
import { CheckMark } from '../../shared/patterns/check-mark/check-mark'; 
import { Radio } from '../radio/radio';
import { RadioMark } from '../../shared/patterns/radio-mark/radio-mark';
import { SelectableBox } from './selectable-box';

const getClasses = ({ connotation, tight, checked, entireBoxClickable, clickable }: SelectableBox) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	['tight', tight],
	['selected', checked],
	['clickable', entireBoxClickable || clickable],
	['readonly', !entireBoxClickable && !clickable],
);

function handleControlChange(x: SelectableBox) {
	if (!x.entireBoxClickable) x._handleCheckedChange();
}

function checkbox(context: ElementDefinitionContext) {
	const checkboxTag = context.tagFor(Checkbox);
	const checkMarkTag = context.tagFor(CheckMark);
	
	return html<SelectableBox>`
		${when(x => x.controlType !== 'radio' && !x.entireBoxClickable && !x.clickable, html`
			<${checkboxTag}
				aria-label="${x => x.ariaLabel}"
				@change="${x => handleControlChange(x)}"
				class="control checkbox" 
				connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
				:checked="${x => x.checked}"
			></${checkboxTag}>
		`)}
		${when(x => x.controlType !== 'radio' && (x.entireBoxClickable || x.clickable), html`
			<${checkMarkTag}
				class="control checkbox" 
				connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
				:checked="${x => x.checked}"
				no-hover
			></${checkMarkTag}>
		`)}
	`;
}

function radio(context: ElementDefinitionContext) {
	const radioTag = context.tagFor(Radio);
	const radioMarkTag = context.tagFor(RadioMark);

	return html<SelectableBox>`
	${when(x => x.controlType === 'radio' && !x.entireBoxClickable && !x.clickable, html`
		<${radioTag}
			aria-label="${x => x.ariaLabel}"
			@change="${x => handleControlChange(x)}"
			class="control radio" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
		></${radioTag}>
	`)}
	${when(x => x.controlType === 'radio' && (x.entireBoxClickable || x.clickable), html`
		<${radioMarkTag}
			class="control radio" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
			no-hover
		></${radioMarkTag}>
	`)}
	`;
}

/**
 * The template for the SelectableBox component.
 *
 * @param context - element definition context
 * @public
 */
export const SelectableBoxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SelectableBox> = (
	context: ElementDefinitionContext
) => {
	const focusTemplate = focusTemplateFactory(context);
	return html<SelectableBox>`<template role="presentation">
	<div
		class="${getClasses}"
		tabindex="${x => x.entireBoxClickable || x.clickable ? '0' : null}"
		role="${x => x.entireBoxClickable || x.clickable ? 'button' : null}"
		aria-pressed="${x => (x.entireBoxClickable || x.clickable) && x.checked ? x.checked : null}"
		aria-label="${x => x.entireBoxClickable || x.clickable ? x.ariaLabel : null}"
		@keydown="${(x, c) => x._handleKeydown(c.event as KeyboardEvent)}"
		@click="${x => x.entireBoxClickable || x.clickable ? x._handleCheckedChange() : null}"
	>
		${(x) => x.entireBoxClickable || x.clickable ? focusTemplate : ''}
		${checkbox(context)}
		${radio(context)}
		<slot></slot>
	</div>
</template>`;
};