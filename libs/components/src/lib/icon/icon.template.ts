import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';

import { classNames } from '@microsoft/fast-web-utilities';
import type { Icon } from './icon';

const getClasses = ({
	connotation, size,
}: Icon) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`size-${size}`, Boolean(size)],
);

export const iconTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Icon> = () => html`

	<figure class="${getClasses}">
		<slot>
			${when(x => !x.iconLoaded, html<Icon>`<img alt="${x => x.name}" src="${x => x.iconUrl}"/>`)}
			${when((x)=> x.iconLoaded && x._svg, (x) => html<Icon>`${x._svg as string}`)}
		</slot>
	</figure>

`;
