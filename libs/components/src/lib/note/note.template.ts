import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Note } from './note';

const getClasses = ({ connotation }: Note) =>
	classNames('base', `connotation-${connotation}`);

function getHeaderTemplate() {
	return html<Note>`<div class="headline">${(x) => x.headline}</div>`;
}

export const NoteTemplate = (context: VividElementDefinitionContext) => {
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
