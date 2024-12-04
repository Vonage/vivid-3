import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
import { Button } from '../button/button';
import type { FilePicker } from './file-picker';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = ({ size }: FilePicker) =>
	classNames('control', 'dz-default', 'dz-message', [
		`size-${size}`,
		Boolean(size),
	]);

export const FilePickerTemplate = (context: VividElementDefinitionContext) => {
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
			${getFeedbackTemplate(context)}
			<div class="preview-list"></div>
		</div>
	`;
};
