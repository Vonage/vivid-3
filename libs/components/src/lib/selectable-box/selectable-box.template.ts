import { html } from '@microsoft/fast-element';
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

const getClasses = ({ connotation, size, tight, checked, clickable }: SelectableBox) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`size-${size}`, Boolean(size)],
	['tight', tight],
	['active', checked],
	['clickable', clickable],
);

function handleControlChange(x: SelectableBox) {
	if (!x.clickable) x.handleCheckedChange();
}

/**
 * 
 */
function renderControl(x: SelectableBox, c: ElementDefinitionContext) {
	const Control = x.controlType === 'radio' ? Radio : Checkbox;
	const tagName = c.tagFor(Control);
	return html<SelectableBox>`
		<${tagName} 
			${x.ariaLabel !== null && !x.clickable ? `aria-label="${x.ariaLabel}"` : ''}
			${x.ariaLabelledby !== null && !x.clickable ? `aria-labelledby="${x.ariaLabelledby}"` : ''}
			${x.clickable ? 'tabindex="-1" aria-hidden="true"' : ''}
			@change="${() => handleControlChange(x)}"
			class="control ${x.controlType || 'checkbox'}" 
			connotation="${x.connotation === 'cta' ? Connotation.CTA : Connotation.Accent}"
			checked="${x.checked}">
		</${tagName}>
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
		role="${x => x.clickable ? x.controlType || 'checkbox' : null}"
		aria-checked="${x => x.clickable && x.checked ? x.checked : null}"
		aria-label="${x => x.clickable ? x.ariaLabel : null}"
		aria-labelledby="${x => x.clickable ? x.ariaLabelledby : null}"
		@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
		@click="${x => x.clickable ? x.handleCheckedChange() : null}"
	>
		${(x) => x.clickable ? focusTemplate : ''}
		${x => renderControl(x, context)}
		<slot></slot>
	</div>
`;
};