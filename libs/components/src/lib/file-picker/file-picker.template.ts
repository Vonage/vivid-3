import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory, getFeedbackTemplate } from '../../shared/patterns';
import { Button } from '../button/button';
import type { FilePicker } from './file-picker';

const getClasses = ({
	size,
}: FilePicker) => classNames(
	'control',
	'dz-default',
	'dz-message',
	[`size-${size}`, Boolean(size)],
);


/**
 * The template for the FilePicker component.
 *
 * @param context
 * @public
 */
export const FilePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<FilePicker> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html<FilePicker>`
		${x => {x.setButtonTag(context.tagFor(Button));}}
		<div class="base" aria-label="${x => x.label}">
			${when(x => x.label, html<FilePicker>`<label>${x => x.label}</label>`)}
			<div class="${getClasses}" tabindex="0" role="button"
					 @keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}">
				<slot class="main"></slot>
				${() => focusTemplate}
			</div>
			${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
			<div class="preview-list"></div>
		</div>
	`;
};
