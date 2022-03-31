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

const svgTemplate = (svg: string) => html`
	<figure class="${getClasses}" :innerHTML="${() => svg}"></figure>
`;

export const iconTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Icon> = () => html`
		${when((x) => x._state === 'loaded', (x) => svgTemplate(x._svg))}
		${when((x) => x._state === 'loading' && x._placeholder, (x) => svgTemplate(x._placeholder))}
	`;
