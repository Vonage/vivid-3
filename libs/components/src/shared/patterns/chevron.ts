import { html } from '@microsoft/fast-element';
import { Icon } from '../../lib/icon/icon';
import type { VividElementDefinitionContext } from '../design-system/defineVividComponent';

export const chevronTemplateFactory = (
	context: VividElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);
	return html`<${iconTag} class="chevron" aria-hidden="true" name="chevron-down-line"></${iconTag}>`;
};
