import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
import { Button } from '../button/button';
import type { FilePicker } from './file-picker';

const getClasses = ({ size }: FilePicker) =>
	classNames('control', 'dz-default', 'dz-message', [
		`size-${size}`,
		Boolean(size),
	]);

/**
 * The template for the FilePicker component.
 *
 * @public
 */
export const FilePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<FilePicker> = (context: ElementDefinitionContext) => {
	return html<FilePicker>`
		${(x) => {
			x.setButtonTag(context.tagFor(Button));
		}}
		<div class="base" aria-label="${(x) => x.label}">
			${when(
				(x) => x.label,
				html<FilePicker>`<label>${(x) => x.label}</label>`
			)}
			<div
				${ref('control')}
				class="${getClasses}"
				tabindex="0"
				role="button"
				@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
			>
				<slot class="main"></slot>
			</div>
			${when(
				(x) => !x.errorValidationMessage && x.helperText?.length,
				getFeedbackTemplate('helper', context)
			)}
			${when(
				(x) => x.errorValidationMessage,
				getFeedbackTemplate('error', context)
			)}
			<div class="preview-list"></div>
		</div>
	`;
};
