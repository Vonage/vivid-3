import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref } from '@microsoft/fast-element';
import type { RichTextView } from './rich-text-view';

export const RichTextViewTemplate: () => ViewTemplate<RichTextView> = () =>
	html`<div class="content rich-text" ${ref('_contentElement')}></div>`;
