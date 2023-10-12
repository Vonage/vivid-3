import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
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
function renderControl(control: 'checkbox' | 'radio' | undefined) {
	const controlTag = control === 'radio' ? 'vwc-radio' : 'vwc-checkbox';
	return html<SelectableBox>`
		<${controlTag} class="control"></${controlTag}>
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
	/*context: ElementDefinitionContext */
) => {
	return html<SelectableBox>`
	<div class="${getClasses}">
		${x => renderControl(x.control)}
		<slot></slot>
	</div>
`;
};