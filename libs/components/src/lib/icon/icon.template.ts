import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import type { Icon } from './icon';

const getClasses = ({ connotation, size }: Icon) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`size-${size}`, typeof size === 'number']
	);

export const iconTemplate = (context: VividElementDefinitionContext) => {
	const visuallyHiddenTag = context.tagFor(VisuallyHidden);
	const isDecorative = (x: Icon) => !x.label || x.label.trim().length === 0;
	return html<Icon>`
		<figure class="${getClasses}" ?aria-hidden="${(x) =>
		isDecorative(x)}" ?aria-busy="${(x) => !x.iconLoaded}">
			<slot>
				${when(
					(x) => !x.iconLoaded,
					html<Icon>`<img alt="${(x) => x.name}" src="${(x) => x.iconUrl}" />`
				)}
				${when(
					(x) => x.iconLoaded && x._svg,
					(x) => html<Icon>`${x._svg as string}`
				)}
			</slot>
			<${visuallyHiddenTag} class="label">${(x) => x.label}</${visuallyHiddenTag}>
		</figure>
	`;
};
