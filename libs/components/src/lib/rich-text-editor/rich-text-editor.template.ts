import { html } from '@microsoft/fast-element';
import type { ExecutionContext, ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor, RichTextEditorTextSizes } from './rich-text-editor';

const getClasses = (_: RichTextEditor) => classNames('control');

const VALID_MENU_ELEMEMENT_SUFFIX = 'menubar';

function textSizeSelectedHandler(
	this: RichTextEditor,
	event: CustomEvent<string>
) {
	this.setTextSize(event.detail as RichTextEditorTextSizes);
}

function selectionDecorationSelectedHandler(
	this: RichTextEditor,
	event: CustomEvent<string>
) {
	this.setSelectionDecoration(event.detail as RichTextEditorTextSizes);
}

function handleMenuBarSlotChange(
	richTextEditor: RichTextEditor,
	{ event }: ExecutionContext
) {
	const slot = event.target as HTMLSlotElement;
	const assignedElements = slot.assignedElements({ flatten: true });
	const menuBar = assignedElements.find((element) =>
		element.tagName.toLowerCase().endsWith(VALID_MENU_ELEMEMENT_SUFFIX)
	);
	assignedElements.forEach((element) => {
		if (element === menuBar) {
			(element as HTMLElement).style.removeProperty('display');
		} else {
			(element as HTMLElement).style.display = 'none';
		}
	});
	if (menuBar) {
		menuBar.addEventListener(
			'text-size-selected',
			textSizeSelectedHandler.bind(richTextEditor) as EventListener
		);
		menuBar.addEventListener(
			'text-decoration-selected',
			selectionDecorationSelectedHandler.bind(richTextEditor) as EventListener
		);
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
) => ViewTemplate<RichTextEditor> = (_: VividElementDefinitionContext) => {
	return html`<template class="${getClasses}">
		<div id="editor" class="editor"></div>
		<slot name="menu-bar" @slotchange="${handleMenuBarSlotChange}"></slot>
	</template>`;
};
