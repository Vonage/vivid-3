import { html } from '@microsoft/fast-element';
import type { ExecutionContext, ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor, RichTextEditorTextSizes } from './rich-text-editor';

const getClasses = (_: RichTextEditor) => classNames('control');

const VALID_MENU_ELEMEMENT_SUFFIX = 'menubar';

function textSizeSelectedHandler(this: RichTextEditor, event: CustomEvent<string>) {
	this.setTextSize(event.detail as RichTextEditorTextSizes);
}

function handleMenuBarSlotChange(richTextEditor: RichTextEditor, { event }: ExecutionContext) {
	const slot = event.target as HTMLSlotElement;
	const assignedElements = slot.assignedElements({ flatten: true });
	const menuBar = assignedElements.find((element) => element.tagName.toLowerCase().endsWith(VALID_MENU_ELEMEMENT_SUFFIX));
	assignedElements.forEach((element) => {
		(element as HTMLElement).style.display = element === menuBar ? 'block' : 'none';
	});
	menuBar?.addEventListener('text-size-selected', textSizeSelectedHandler.bind(richTextEditor));
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
		<div id="editor">

			
		</div>
		<slot name="menu-bar" @slotchange="${handleMenuBarSlotChange}"></slot>
	</template>`;
};
