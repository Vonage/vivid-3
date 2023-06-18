import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
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
	return html<FilePicker>`
	<div class="${getClasses}" aria-label="${x => x.ariaLabel ? x.ariaLabel : x.label}">
		${when(x => x.label, html<FilePicker>`<label>${x => x.label}</label>`)}
		<div class="dz-default dz-message" ${ref('_dz')}>
			<slot> 
				Drag & Drop files here
			</slot>
		</div>
		${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
		<div class='preview-list' ${ref('previewList')}></div>
	</div>
	`;
};