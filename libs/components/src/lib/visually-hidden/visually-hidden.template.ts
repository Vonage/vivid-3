import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { VisuallyHidden } from './visually-hidden';

export const VisuallyHiddenTemplate: () => ViewTemplate<VisuallyHidden> = () =>
	html`<slot></slot>`;
