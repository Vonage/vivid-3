import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory, getFeedbackTemplate } from '../../shared/patterns';
import type { FileUploader } from './file-uploader';

const getClasses = (_: FileUploader) =>
	classNames(
		'base',
	);


/**
 * The template for the {@link @microsoft/fast-foundation#FileUploader} component.
 *
 * @param context
 * @public
 */
export const FileUploaderTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<FileUploader> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html<FileUploader>`
	<div class="${getClasses}" aria-label="${x => x.ariaLabel ? x.ariaLabel : x.label}">
		${when(x => x.label, html<FileUploader>`<label>${x => x.label}</label>`)}
		<div class="control dz-default dz-message" ${ref('dropzoneDiv')} tabindex="0"
		role="button" aria-label="Dropzone area" @keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}">
			<slot class="main"></slot>
			${() => focusTemplate}
		</div>
		${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
		<div class='preview-list' ${ref('previewListDiv')}></div>
	</div>
	`;
};
