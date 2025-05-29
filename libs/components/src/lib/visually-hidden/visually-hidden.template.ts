import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { VisuallyHidden } from './visually-hidden';

export const VisuallyHiddenTemplate: () => ViewTemplate<VisuallyHidden> = () =>
	html`<slot></slot>`;
