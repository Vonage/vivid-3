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
			'text-block-selected',
			textBlockSelectedHandler as EventListener
		);
		menuBar.addEventListener(
			'text-decoration-selected',
			selectionDecorationSelectedHandler as EventListener
		);
		menuBar.addEventListener(
			'text-size-selected',
			textSizeSelectedHandler as EventListener
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
) => ViewTemplate<RichTextEditor> = (
	context: VividElementDefinitionContext
) => {
	const dividerTag = context.tagFor(Divider);
	return html`<template class="${getClasses}">
		<div id="editor" class="editor">
			<div id="attachments-wrapper" class="hidden">
				<${dividerTag} class="divider"></${dividerTag}>
				<slot name="attachments"
					  @slotchange="${handleAttachmentsSlotChange}">
				</slot>
			</div>
		</div>
		<slot name="menu-bar" 
			  @slotchange="${handleMenuBarSlotChange}"></slot>
	</template>`;
};
