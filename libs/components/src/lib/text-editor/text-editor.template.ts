import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TextEditor } from './text-editor';

const getClasses = () =>
	classNames('base');

/**
 * The template for the Divider component.
 *
 * @public
 */
export const TextEditorTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextEditor> = () => html`
	<div class="${getClasses}" id="editor">
		<div id="content"></div>
		<!-- slotted content is programatically copied to the content div for render -->
		<div class="initial-content"><slot name="content"></slot></div>
	</div>
`;
