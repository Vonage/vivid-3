import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import '../icon/index';
import type { Note } from './note';

const getClasses = ({ connotation }: Note) => classNames(
	'base',
	`connotation-${connotation}`
);

/**
 *
 */
function getHeaderTemplate() {
	return html<Note>`<div class="heading">${x => x.heading}</div>`;
}

/**
 *
 */
function getIconTemplate() {
	return html<Note>`<vwc-icon class="icon" type="${x => x.icon}"></vwc-icon>`;
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
) => ViewTemplate<Note> = () => html`
    <div class="${getClasses}">
      ${when(x => x.icon, getIconTemplate())}
			<div class="text">
	        ${when(x => x.heading, getHeaderTemplate())}
			    <slot class="message"></slot>
			</div>
    </div>
`;
