import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { html } from '@microsoft/fast-element';
import { Icon } from '../../lib/icon/icon';

export const chevronTemplateFactory = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	return html`<${iconTag} class="chevron" aria-hidden="true" name="chevron-down-line"></${iconTag}>`;
};
