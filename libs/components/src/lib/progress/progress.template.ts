import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Progress } from './progress';

const getClasses = ({ connotation, shape, reverse, paused }: Progress) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`shape-${shape}`, Boolean(shape)],
		['reverse', Boolean(reverse)],
		['paused', Boolean(paused)]
	);

function determinate() {
	return html<Progress>` <span
		class="determinate"
		style="width: ${(x) => x.percentComplete}%"
	></span>`;
}

function indeterminate() {
	return html<Progress>` <span class="indeterminate" name="indeterminate">
		<span class="indicator-1"></span>
		<span class="indicator-2"></span>
	</span>`;
}

export const ProgressTemplate = html<Progress>`<template
	role="${(x) => (x.ariaLabel ? 'presentation' : null)}"
>
	<div
		role="progressbar"
		aria-label="${(x) => x.ariaLabel}"
		aria-valuenow="${(x) => x.value}"
		aria-valuemin="${(x) => x.min}"
		aria-valuemax="${(x) => x.max}"
		class="${getClasses}"
	>
		<div class="progress">
			${when((x) => typeof x.value === 'number', determinate())}
			${when((x) => typeof x.value !== 'number', indeterminate())}
		</div>
	</div>
</template>`;
