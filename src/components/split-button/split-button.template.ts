import { html, type ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Button } from '../button/button';
import type { SplitButton } from './split-button';


/**
 * The template for the {@link @microsoft/fast-foundation#(SplitButton:class)} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const splitButtonTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SplitButton> = (context: ElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);

	return html`
        <${buttonTag} label="split button"></${buttonTag}>
        <${buttonTag} icon="chevron-down-line"></${buttonTag}>
    `;
};