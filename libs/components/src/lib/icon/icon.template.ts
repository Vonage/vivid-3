import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Icon } from './icon';

const getClasses = ({ connotation, size }: Icon) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`size-${size}`, typeof size === 'number']
	);

export const iconTemplate = html<Icon>`
	<figure class="${getClasses}" ?aria-busy="${(x) => !x.iconLoaded}">
		<slot>
			${when(
				(x) => !x.iconLoaded,
				html<Icon>`<img alt="${(x) => x.name}" src="${(x) => x.iconUrl}" />`
			)}
			${when(
				(x) => x.iconLoaded && x._svg,
				(x) => html`${html.partial(x._svg!)}`
			)}
		</slot>
	</figure>
`;
