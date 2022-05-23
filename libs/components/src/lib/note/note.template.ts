import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import '../icon/index';
import type { Note } from './note';

const getClasses = (_: Note) => classNames('base');

/**
 *
 */
function getHeaderTemplate() {
	return html<Note>`<div class="header">${x => x.header}</div>`;
}

function getIconTemplate() {
  return html<Note>`<vwc-icon type="${x => x.icon}"></vwc-icon>`;
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
        ${when(x => x.header, getHeaderTemplate())}
    </div>
`;
