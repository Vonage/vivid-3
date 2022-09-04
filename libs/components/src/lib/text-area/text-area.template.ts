import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TextArea } from './text-area';

const getClasses = (_: TextArea) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#TextArea} component.
 *
 * @param context
 * @public
 */
export const TextAreaTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextArea> = (_: ElementDefinitionContext) => html` 
		<div class="${getClasses}">
			<label>${x => x.label}</label>		
		</div>
`;
