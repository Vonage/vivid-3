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

const getClasses = ({ connotation, spacing, tight, checked, clickable }: SelectableBox) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`spacing-${spacing}`, Boolean(spacing)],
	['tight', tight],
	['checked', checked],
	['clickable', clickable],
	['readonly', !clickable],
);

function handleControlChange(x: SelectableBox) {
	if (!x.clickable) x._handleCheckedChange();
}

function checkbox(context: ElementDefinitionContext) {
	const checkboxTag = context.tagFor(Checkbox);
	
	return html<SelectableBox>`${when(x => x.controlType !== 'radio', html`
		<${checkboxTag}
			aria-label="${x => !x.clickable && x.controlAriaLabel ? x.controlAriaLabel : null}"
			aria-labelledby="${x => !x.clickable && x.controlAriaLabelledby ? x.controlAriaLabelledby : null}"
			tabindex="${x => x.clickable ? '-1' : '0'}"
			aria-hidden="${x => x.clickable}"
			@change="${x => handleControlChange(x)}"
			class="control checkbox" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
		></${checkboxTag}>`)}
	`;
}

function radio(context: ElementDefinitionContext) {
	const radioTag = context.tagFor(Radio);

	return html<SelectableBox>`${when(x => x.controlType === 'radio', html`
		<${radioTag}
			aria-label="${x => !x.clickable && x.controlAriaLabel ? x.controlAriaLabel : null}"
			aria-labelledby="${x => !x.clickable && x.controlAriaLabelledby ? x.controlAriaLabelledby : ''}"
			tabindex="${x => x.clickable ? '-1' : '0'}"
			aria-hidden="${x => x.clickable}"
			@change="${x => handleControlChange(x)}"
			class="control radio" 
			connotation="${x => x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			:checked="${x => x.checked}"
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
	return html<SelectableBox>`
	<div
		class="${getClasses}"
		tabindex="${x => x.clickable ? '0' : null}"
		role="${x => x.clickable ? 'button' : null}"
		aria-pressed="${x => x.clickable && x.checked ? x.checked : null}"
		aria-label="${x => x.clickable ? x.controlAriaLabel : null}"
		aria-labelledby="${x => x.clickable ? x.controlAriaLabelledby : null}"
		@keydown="${(x, c) => x._handleKeydown(c.event as KeyboardEvent)}"
		@click="${x => x.clickable ? x._handleCheckedChange() : null}"
	>
		${checkbox(context)}
		${radio(context)}
		<slot></slot>
	</div>
`;
};