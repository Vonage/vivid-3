import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Elevation } from './elevation';

const getClasses = ({ dp, noShadow, notRelative }: Elevation) =>
	classNames(
		'control',
		[`dp-${dp}`, Boolean(dp)],
		['no-shadow', Boolean(noShadow)],
		['not-relative', Boolean(notRelative)]
	);

export const elevationTemplate = html<Elevation>` <div
	class="${getClasses}"
	part="base"
>
	<slot></slot>
</div>`;
