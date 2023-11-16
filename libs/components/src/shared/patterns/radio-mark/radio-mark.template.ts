import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { RadioMark } from './radio-mark';

const getClasses = ({ connotation, checked, readOnly, disabled, noHover }: RadioMark) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	['checked', Boolean(checked)],
	['readonly', Boolean(readOnly)],
	['disabled', Boolean(disabled)],
	['no-hover', Boolean(noHover)]
);

/**
 * The template for the RadioMark component.
 *
 * @param context - element definition context
 * @public
 */
export const RadioMarkTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<RadioMark> = () => html<RadioMark>`
	<div class="${getClasses}">
		<div class="control">
			<slot></slot>
		</div>
	</div>
`;
