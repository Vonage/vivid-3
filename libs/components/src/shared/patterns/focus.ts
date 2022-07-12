
import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { Focus } from '../../lib/focus/focus';


/**
 * The template for the focus element.}
 *
 * @param context
 * @public
 */
export const focusTemplateFactory: (context: ElementDefinitionContext) =>
ViewTemplate | null = (context: ElementDefinitionContext) => {
	const focusTag = context.tagFor(Focus);
	return html`<${focusTag} class="focus-indicator"></${focusTag}>`;
};
