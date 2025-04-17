import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { delegateAria } from '../../shared/aria/delegates-aria';
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

export const ProgressTemplate = html<Progress>`<template>
	<div
		class="${getClasses}"
		${delegateAria({
			role: 'progressbar',
			ariaValueNow: (x) => x.value,
			ariaValueMin: (x) => x.min,
			ariaValueMax: (x) => x.max,
		})}
	>
		<div class="progress">
			${when((x) => typeof x.value === 'number', determinate())}
			${when((x) => typeof x.value !== 'number', indeterminate())}
		</div>
	</div>
</template>`;
