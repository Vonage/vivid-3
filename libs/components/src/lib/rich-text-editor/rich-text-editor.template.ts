import { html } from '@microsoft/fast-element';
import type { ExecutionContext, ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor, RichTextEditorTextSizes } from './rich-text-editor';

const getClasses = (_: RichTextEditor) => classNames('control');

const VALID_MENU_ELEMEMENT_SUFFIX = 'menubar';

const menuParent = (target: EventTarget | null) =>
	(target as HTMLElement).parentElement as RichTextEditor;

function textSizeSelectedHandler(
	event: CustomEvent<string>
) {
	menuParent(event.target).setTextSize(event.detail as RichTextEditorTextSizes);
	menuParent(event.target).focus();
}

function selectionDecorationSelectedHandler(
	event: CustomEvent<string>
) {
	menuParent(event.target).setSelectionDecoration(event.detail as RichTextEditorTextSizes);
	menuParent(event.target).focus();
}

function handleMenuBarSlotChange(
	_: RichTextEditor,
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
			textSizeSelectedHandler as EventListener
		);
		menuBar.addEventListener(
			'text-decoration-selected',
			selectionDecorationSelectedHandler as EventListener
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
