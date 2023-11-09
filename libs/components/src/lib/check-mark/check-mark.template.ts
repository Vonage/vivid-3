import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { CheckMark } from './check-mark';

const getClasses = ({
	connotation,
	readOnly,
	checked,
	disabled,
	indeterminate,
}: CheckMark) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['readonly', Boolean(readOnly)],
		['checked', Boolean(checked) || Boolean(indeterminate)],
		['disabled', Boolean(disabled)],
	);


/**
 * The template for the CheckMark component.
 *
 * @param context - element definition context
 * @public
 */
export const CheckMarkTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<CheckMark> = (
	context: ElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	
	return html<CheckMark>`
		<div class="${getClasses}">
			<div class="control">
				${when(x => x.checked, html<CheckMark>`<${iconTag} name="check-solid" class="icon"></${iconTag}>`)}
				${when(x => x.indeterminate, html<CheckMark>`<${iconTag} name="minus-solid" class="icon"></${iconTag}>`)}
				<slot></slot>
			</div>
		</div>
	`;
};