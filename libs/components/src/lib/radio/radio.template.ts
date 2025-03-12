import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';

import type { Radio } from './radio';

const getClasses = ({ connotation, checked, readOnly, disabled }: Radio) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['checked', Boolean(checked)],
		['readonly', Boolean(readOnly)],
		['disabled', Boolean(disabled)]
	);

export const RadioTemplate = html<Radio>`<template
	aria-checked="${(x) => x.checked}"
	aria-disabled="${(x) => x.disabled}"
	aria-required="${(x) => x.required}"
	@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
	@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	role="radio"
>
	<div class="${getClasses}">
		<div class="control"></div>
		${when(
			(x) => x.label,
			html<Radio>`<label class="label">${(x) => x.label}</label>`
		)}
	</div>
</template>`;
