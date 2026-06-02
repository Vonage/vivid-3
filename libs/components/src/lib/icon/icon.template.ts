import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Icon } from './icon';

const getClasses = ({ connotation, size }: Icon) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`size-${size}`, typeof size === 'number']
	);

export const iconTemplate = () => {
	const isDecorative = (x: Icon) => !x.label || x.label.trim().length === 0;

	return html<Icon>`
		<span
			class="${getClasses}"
			role="${(x) => (isDecorative(x) ? null : 'img')}"
			?aria-hidden="${(x) => isDecorative(x)}"
			aria-label="${(x) => x.label || null}"
			?aria-busy="${(x) => !x?.iconLoaded}"
		>
			<slot aria-hidden="true">
				${when(
					(x) => x?.iconLoaded && x?._svg,
					(x) => html`${html.partial(x._svg!)}`
				)}
			</slot>
		</span>
	`;
};
