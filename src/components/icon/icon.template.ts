import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';

import type { Icon } from './icon.base';

const svgTemplate = () => html`
	<figure class="control" :innerHTML="${(x) => x.svg}"></figure>
`;

const placeholderTemplate = () => html`
	<figure class="control" :innerHTML="${(x) => x.placeholderSvg}"></figure>
`;

export const iconTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Icon> = () => html`
			${when((x) => x.svgReady, svgTemplate)}
			${when((x) => !x.svgReady, placeholderTemplate)}
		`;
