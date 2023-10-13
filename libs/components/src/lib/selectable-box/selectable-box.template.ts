import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Checkbox } from '../checkbox/checkbox';
import { Radio } from '../radio/radio';
import { SelectableBox } from './selectable-box';

const getClasses = ({ connotation, spacing, noPadding, selected }: SelectableBox) => classNames(
	'base',
	[`connotation-${connotation}`, !!connotation],
	[`spacing-${spacing}`, !!spacing],
	['no-padding', Boolean(noPadding)],
	['selected', Boolean(selected)],
);

/**
 * 
 */
function renderControl(x: SelectableBox, c: ElementDefinitionContext) {
	const Control = x.control === 'radio' ? Radio : Checkbox;
	const tagName = c.tagFor(Control);
	return html<Checkbox | Radio>`
		<${tagName} 
			class="control ${x.control || 'checkbox'}" 
			?checked="${x.selected}">
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
	return html<SelectableBox>`
	<div class="${getClasses}">
		${x => renderControl(x, context)}
		<slot></slot>
	</div>
`;
};