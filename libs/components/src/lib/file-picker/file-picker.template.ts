import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory, getFeedbackTemplate } from '../../shared/patterns';
import type { FilePicker } from './file-picker';

const getClasses = (_: FilePicker) =>
	classNames(
		'base',
	);


/**
 * The template for the {@link @microsoft/fast-foundation#FilePicker} component.
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
	<div class="${getClasses}" aria-label="${x => x.ariaLabel ? x.ariaLabel : x.label}">
		${when(x => x.label, html<FilePicker>`<label>${x => x.label}</label>`)}
		<div class="control dz-default dz-message" ${ref('_dz')} tabindex="0"
		role="button" aria-label="Dropzone area" @keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}">
			<slot class="main"></slot>
			${() => focusTemplate}
		</div>
		${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
		<div class='preview-list' ${ref('previewList')}></div>
	</div>
	`;
};
