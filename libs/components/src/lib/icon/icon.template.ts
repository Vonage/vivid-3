import { html, when } from '@microsoft/fast-element';
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
		${when((x)=> x.svg, (x) => html<Icon>`${x.svg || ''}`)}
  </figure>
	`;
