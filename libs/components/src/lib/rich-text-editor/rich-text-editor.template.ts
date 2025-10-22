import { html, ref, type ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor } from './rich-text-editor';

export const RichTextEditorTemplate = (
	ctx: VividElementDefinitionContext
): ViewTemplate<RichTextEditor> => {
	return html`<template :_ctx="${() => ctx}">
		<div class="rte">
			<div class="editor" ${ref('_editorEl')}></div>
			<div class="popovers"></div>
			<div class="toolbar"></div>
		</div>
	</template>`;
};
