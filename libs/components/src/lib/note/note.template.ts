import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { Note } from './note';


const getClasses = ({ connotation }: Note) => classNames(
	'base',
	`connotation-${connotation}`
);

/**
 *
 */
function getHeaderTemplate() {
	return html<Note>`<div class="headline">${x => x.headline}</div>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Note} component.
 *
 * @param context
 * @public
 */
export const NoteTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Note> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`
    <div class="${getClasses}">
			${when( x => x.icon, html`<${iconTag} class="icon" name="${x => x.icon}"></${iconTag}>`)}
			<div class="text">
	        ${when(x => x.headline, getHeaderTemplate())}
			    <slot class="message"></slot>
			</div>
    </div>
`;
};
