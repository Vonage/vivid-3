import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';

import { classNames } from '@microsoft/fast-web-utilities';
import type { Icon } from './icon.base';

const getClasses = ({
	connotation, size,
}: Icon) => classNames(
	'icon',
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
		${when((x) => x.state === 'loaded', (x) => svgTemplate(x.svg))}
		${when((x) => x.state === 'loading' && x.placeholder, (x) => svgTemplate(x.placeholder))}
	`;
