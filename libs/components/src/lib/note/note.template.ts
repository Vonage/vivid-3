import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { Note } from './note';

const getClasses = ({ connotation }: Note) =>
	classNames('base', `connotation-${connotation}`);

/**
 *
 */
function getHeaderTemplate() {
	return html<Note>`<div class="headline">${(x) => x.headline}</div>`;
}

/**
 * The template for the Note component.
 *
 * @param context - element definition context
 * @public
 */
export const NoteTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Note> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
		<div class="${getClasses}">
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			<div class="text">
				${when((x) => x.headline, getHeaderTemplate())}
				<slot class="message"></slot>
			</div>
		</div>
	`;
};
