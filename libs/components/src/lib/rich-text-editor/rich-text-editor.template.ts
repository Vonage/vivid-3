import { html, ref, type ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor } from './rich-text-editor';

export const RichTextEditorTemplate = (
	ctx: VividElementDefinitionContext
): ViewTemplate<RichTextEditor> => {
	return html`<template :_ctx="${() => ctx}">
		<div class="rte">
			<div class="editor-viewport" ${ref('editorViewportElement')}>
				<div class="editor-scroll-area">
					<slot name="editor-start"></slot>
					<div class="editor" ${ref('_editorEl')}></div>
					<div class="popovers"></div>
					<slot name="editor-end"></slot>
				</div>
			</div>
			<slot name="status"></slot>
			<div class="toolbar"></div>
		</div>
	</template>`;
};
