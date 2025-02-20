import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { RichTextEditor } from './rich-text-editor';

const getClasses = (_: RichTextEditor) => classNames('control');

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
) => html` <span class="${getClasses}">${context.tagFor(RichTextEditor)} </span>`;
