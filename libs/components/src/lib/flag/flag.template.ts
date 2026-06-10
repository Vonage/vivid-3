import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import type { Flag } from './flag';

const getClasses = ({ size }: Flag) =>
	classNames('control', [`size-${size}`, typeof size === 'number']);

export const flagTemplate = (context: VividElementDefinitionContext) => {
	const visuallyHiddenTag = context.tagFor(VisuallyHidden);
	const isDecorative = (x: Flag) => !x.label || x.label.trim().length === 0;

	return html<Flag>`
		<figure
			class="${getClasses}"
			?aria-hidden="${(x) => isDecorative(x)}"
			?aria-busy="${(x) => !x?.flagLoaded}"
		>
			${when(
				(x) => x?.flagLoaded && x?._svg,
				(x) => html`${html.partial(x._svg!)}`
			)}
			<${visuallyHiddenTag} class="label">${(x) => x?.label}</${visuallyHiddenTag}>
		</figure>
	`;
};
