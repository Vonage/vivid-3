import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { FilePicker } from './file-picker';

const getClasses = ({ size }: FilePicker) =>
	classNames('control', 'dz-default', 'dz-message', [
		`size-${size}`,
		Boolean(size),
	]);

export const FilePickerTemplate = (context: VividElementDefinitionContext) => {
	return html<FilePicker>`
		${(x) => {
			x.setButtonTag(context.tagFor(Button));
			x.setIconTag(context.tagFor(Icon));
		}}
		<div class="base">
			${when(
				(x) => x.label,
				html<FilePicker>`<label>${(x) => x.label}</label>`
			)}
			<div class="control-wrapper">
				<div
					${ref('control')}
					class="${getClasses}"
					tabindex="0"
					@keydown="${(x, c) => x.handleKeydown(c.event as KeyboardEvent)}"
					aria-describedby="${(x) => x._feedbackDescribedBy}"
					${delegateAria({
						role: 'button',
					})}
				>
					<slot class="main"></slot>
				</div>
				${(x) => x._getFeedbackTemplate(context)}
			</div>
			<div class="preview-list"></div>
		</div>
	`;
};
