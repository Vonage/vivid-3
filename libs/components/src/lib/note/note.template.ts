import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {Connotation} from '../enums';
import { Icon } from '../icon/icon';
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
 *
 * @returns HTMLElement - template
 */
function getHeaderTemplate() {
	return html<Note>`<div class="headline">${x => x.headline}</div>`;
}

/**
 *
 *
 * @param Note - note
 * @returns  icon
 */
function getIconType(note: Note) {
	return note.icon ? note.icon : note.connotation ? connotationIconMap.get(note.connotation) : 'megaphone-solid';
}

/**
 *
 *
 * @returns HTMLElement - templateTemplate
 */
function getIconTemplate(iconTag: string) {
	return html<Note>`<${iconTag} class="icon" name="${getIconType}"></${iconTag}>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Note} component.
 *
 * @returns HTMLElement - template
 */
export const NoteTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Note> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`
    <div class="${getClasses}">
      ${getIconTemplate(iconTag)}
			<div class="text">
	        ${when(x => x.headline, getHeaderTemplate())}
			    <slot class="message"></slot>
			</div>
    </div>
`;
};