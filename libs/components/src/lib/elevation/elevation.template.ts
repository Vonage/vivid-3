import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Elevation } from './elevation';

const getClasses = ({ dp, noShadow }: Elevation) =>
	classNames(
		'control',
		[`dp-${dp}`, Boolean(dp)],
		['no-shadow', Boolean(noShadow)]
	);

export const elevationTemplate = html<Elevation>` <div
	class="${getClasses}"
	part="base"
>
	<slot></slot>
</div>`;
