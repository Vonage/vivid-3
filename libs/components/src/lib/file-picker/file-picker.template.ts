import { html, ref, repeat, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { FilePicker, ValidatedFile } from './file-picker';

const filesizeBase = 1000;
const dictFileSizeUnits = { tb: 'TB', gb: 'GB', mb: 'MB', kb: 'KB', b: 'b' };
type FileSizeUnit = keyof typeof dictFileSizeUnits;

const renderFileSize = (x: FilePicker, size: number) => {
	let selectedSize = 0;
	let selectedUnit: FileSizeUnit = 'b';

	if (size > 0) {
		const units = ['tb', 'gb', 'mb', 'kb', 'b'] as const;

		for (let i = 0; i < units.length; i++) {
			const unit = units[i];
			const cutoff = Math.pow(filesizeBase, 4 - i) / 10;

			if (size >= cutoff) {
				selectedSize = size / Math.pow(filesizeBase, 4 - i);
				selectedUnit = unit;
				break;
			}
		}

		selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
	}

	return html`<strong>${x._formatNumber(selectedSize)}</strong>
		${dictFileSizeUnits[selectedUnit]}`;
};

const getClasses = ({ size, _dragHover }: FilePicker) =>
	classNames(
		'control',
		[`size-${size}`, Boolean(size)],
		['drag-hover', _dragHover]
	);

export const FilePickerTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	const buttonTag = context.tagFor(Button);

	return html<FilePicker>`
		<div class="base">
			<div class="label-wrapper" ?hidden=${(x) => !x.label && !x._hasContextualHelp}>
				${when(
					(x) => x.label,
					html<FilePicker>`<label class="label">${(x) => x.label}</label>`
				)}
				<slot name="contextual-help" ${slotted('_contextualHelpSlottedContent')}></slot>
			</div>
			<div class="control-wrapper">
				<button
					type="button"
					${ref('control')}
					class="${getClasses}"
					@click="${(x) => x._onControlClick()}"
					@keydown"${() => false /* Prevent implicit form submission on Enter */}"
					@dragenter="${(x) => x._onDragEnter()}"
					@dragover="${(x, c) => x._onDragOver(c.event as DragEvent)}"
					@dragleave="${(x, c) => x._onDragLeave(c.event as DragEvent)}"
					@drop="${(x, c) => x._onDrop(c.event as DragEvent)}"
					@dragend="${(x) => x._onDragEnd()}"
					aria-describedby="${(x) => x._feedbackDescribedBy}"
					${delegateAria()}
				>
					<vwc-icon
						class="upload-icon"
						name="cloud-upload-line"
						size="-4"
						label="${(x) => x.locale.filePicker.uploadFilesLabel}"
					></vwc-icon>
					<span class="upload-text"><slot></slot></span>
				</button>
				${(x) => x._getFeedbackTemplate(context)}
			</div>
			<div class="preview-list">
				${repeat(
					(x) => x._validatedFiles,
					html<ValidatedFile, FilePicker>`
				<div class="${(x) =>
					classNames('preview', ['has-error', !!x.validationError])}">
					<div class="details">
						<div class="filename">${(x) => x.file.name}</div>
						<div class="size">${(x, c) => renderFileSize(c.parent, x.file.size)}</div>
					</div>
					<div class="error-message">
						<${iconTag} name="info-line" size="-6"></${iconTag}>
						${(x) => x.validationError}
					</div>
					<${buttonTag}
						class="remove-btn" icon="delete-line" appearance="ghost-light" size="condensed"
						aria-label="${(_, c) => c.parent.locale.filePicker.removeFileLabel}"
						@click="${(x, c) => c.parent._onRemoveFileClick(x.file)}"></${buttonTag}>
				</div>`
				)}
			</div>
		</div>
		<input
			${ref('_hiddenInput')}
			class="hidden-input"
			aria-hidden="true"
			type="file"
			?multiple="${(x) => !x.singleFile && (!x.maxFiles || x.maxFiles > 1)}"
			accept="${(x) => x.accept || null}"
			tabindex="-1"
			@change="${(x, c) => x._onHiddenInputChange(c.event as InputEvent)}"
		/>
	`;
};
