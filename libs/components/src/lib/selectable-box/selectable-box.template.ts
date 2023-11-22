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
import { Radio } from '../radio/radio';
import { SelectableBox } from './selectable-box';

const getClasses = ({ connotation, tight, checked, clickable, entireBoxClickable }: SelectableBox) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	['tight', tight],
	['selected', checked],
	['clickable', clickable || entireBoxClickable],
	['readonly', !(clickable || entireBoxClickable)],
);

function handleControlChange(x: SelectableBox) {
	if (!(x.clickable || x.entireBoxClickable)) x._handleCheckedChange();
}

function checkbox(context: ElementDefinitionContext) {
	const checkboxTag = context.tagFor(Checkbox);
	
	return html<SelectableBox>`${when(x => x.controlType !== 'radio', html`
		<${checkboxTag}
			aria-label="${x => !(x.clickable || x.entireBoxClickable) && x.ariaLabel ? x.ariaLabel : null}"
			@change="${x => handleControlChange(x)}"
			class="control checkbox" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
			inert="${x => x.clickable || x.entireBoxClickable ? true : null}"
		></${checkboxTag}>`)}
	`;
}

function radio(context: ElementDefinitionContext) {
	const radioTag = context.tagFor(Radio);

	return html<SelectableBox>`${when(x => x.controlType === 'radio', html`
		<${radioTag}
			aria-label="${x => !(x.clickable || x.entireBoxClickable) && x.ariaLabel ? x.ariaLabel : null}"
			@change="${x => handleControlChange(x)}"
			class="control radio" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
			inert="${x => x.clickable || x.entireBoxClickable ? true : null}"
		></${radioTag}>`)}
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
		tabindex="${x => x.clickable || x.entireBoxClickable ? '0' : null}"
		role="${x => x.clickable || x.entireBoxClickable ? 'button' : null}"
		aria-pressed="${x => (x.clickable || x.entireBoxClickable) && x.checked ? x.checked : null}"
		aria-label="${x => x.clickable || x.entireBoxClickable ? x.ariaLabel : null}"
		@keydown="${(x, c) => x._handleKeydown(c.event as KeyboardEvent)}"
		@click="${x => x.clickable || x.entireBoxClickable ? x._handleCheckedChange() : null}"
	>
		${(x) => x.clickable || x.entireBoxClickable ? focusTemplate : ''}
		${checkbox(context)}
		${radio(context)}
		<slot></slot>
	</div>
</template>`;
};