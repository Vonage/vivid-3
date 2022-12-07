import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {Connotation} from '../enums';
import type { Note } from './note';

const connotationIconMap = new Map([
	[Connotation.Information, 'info-solid'],
	[Connotation.Announcement, 'megaphone-solid'],
	[Connotation.Success, 'check-circle-solid'],
	[Connotation.Warning, 'warning-solid'],
	[Connotation.Alert, 'error-solid']
]);

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
 * @param note
 */
function getIconType(note: Note) {
	return note.icon ? note.icon : note.connotation ? connotationIconMap.get(note.connotation) : 'megaphone-solid';
}

/**
 *
 */
function getIconTemplate() {
	return html<Note>`<vwc-icon class="icon" name="${getIconType}"></vwc-icon>`;
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
      ${getIconTemplate()}
			<div class="text">
	        ${when(x => x.headline, getHeaderTemplate())}
			    <slot class="message"></slot>
			</div>
    </div>
`;
