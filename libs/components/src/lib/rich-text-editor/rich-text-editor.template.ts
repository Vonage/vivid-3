import { html } from '@microsoft/fast-element';
import type { ExecutionContext, ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Divider } from '../divider/divider';
import {
	type RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES,
	RichTextEditor,
	RichTextEditorTextBlocks,
} from './rich-text-editor';

const getClasses = (_: RichTextEditor) => classNames('control');

const VALID_MENU_ELEMEMENT_SUFFIX = 'menubar';

const menuParent = (target: EventTarget | null) =>
	(target as HTMLElement).parentElement as RichTextEditor;

function textBlockSelectedHandler(event: CustomEvent<string>) {
	menuParent(event.target).setTextBlock(
		event.detail as RichTextEditorTextBlocks
	);
	menuParent(event.target).focus();
}

function selectionDecorationSelectedHandler(event: CustomEvent<string>) {
	menuParent(event.target).setSelectionDecoration(
		event.detail as RichTextEditorTextBlocks
	);
	menuParent(event.target).focus();
}

function textSizeSelectedHandler(event: CustomEvent<string>) {
	menuParent(event.target).setSelectionTextSize(
		event.detail as RICH_TEXT_EDITOR_MENUBAR_TEXT_SIZES
	);
	menuParent(event.target).focus();
}

function handleAttachmentsSlotChange(
	_: RichTextEditor,
	{ event }: ExecutionContext
) {
	const slotElement = event.target as HTMLSlotElement;
	slotElement.parentElement?.classList.toggle(
		'hidden',
		slotElement.assignedElements().length < 1
	);
}

function handleMenubarSlotChange(
	_: RichTextEditor,
	{ event }: ExecutionContext
) {
	const slot = event.target as HTMLSlotElement;
	const assignedElements = slot.assignedElements({ flatten: true });
	const menubar = assignedElements.find((element) =>
		element.tagName.toLowerCase().endsWith(VALID_MENU_ELEMEMENT_SUFFIX)
	);
	assignedElements.forEach((element) => {
		if (element === menubar) {
			(element as HTMLElement).style.removeProperty('display');
		} else {
			(element as HTMLElement).style.display = 'none';
		}
	});
	if (menubar) {
		menubar.addEventListener(
			'text-block-selected',
			textBlockSelectedHandler as EventListener
		);
		menubar.addEventListener(
			'text-decoration-selected',
			selectionDecorationSelectedHandler as EventListener
		);
		menubar.addEventListener(
			'text-size-selected',
			textSizeSelectedHandler as EventListener
		);
	}
}

function handleFileDrop(x: RichTextEditor, { event }: { event: DragEvent }) {
	x.dispatchEvent(
		new CustomEvent('file-drop', { detail: event.dataTransfer!.files })
	);
	handleDragLeave(x, { event });
}

function handleDragEnter(_: RichTextEditor, { event }: { event: DragEvent }) {
	const editorWrapperElement = event.currentTarget as HTMLElement;

	editorWrapperElement.classList.toggle('drag-over', true);
}

function handleDragLeave(_: RichTextEditor, { event }: { event: DragEvent }) {
	const editorWrapperElement = event.currentTarget as HTMLElement;

	if (!editorWrapperElement.contains(event.relatedTarget as Node)) {
		editorWrapperElement.classList.remove('drag-over');
	}
}
/**
 * The template for the RichTextEditor component.
 *
 * @param context - element definition context
 * @public
 */
export const RichTextEditorTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<RichTextEditor> = (
	context: VividElementDefinitionContext
) => {
	const dividerTag = context.tagFor(Divider);
	return html`<template class="${getClasses}">
		<div id="editor"
		     class="editor"
			 @drop="${handleFileDrop}"
			 @dragenter="${handleDragEnter}"
			 @dragleave="${handleDragLeave}"
			 >
			 <div class="drag-overlay">
				${(x) => x.locale.richTextEditor.dragAndDropFilesHere}
			</div>
			<div id="attachments-wrapper" class="hidden">
				<${dividerTag} class="divider"></${dividerTag}>
				<slot name="attachments"
					  @slotchange="${handleAttachmentsSlotChange}">
				</slot>
			</div>
		</div>
		<slot name="menu-bar"
			  @slotchange="${handleMenubarSlotChange}"></slot>
	</template>`;
};
