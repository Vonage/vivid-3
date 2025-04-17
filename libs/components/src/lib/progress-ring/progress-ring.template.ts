import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { ProgressRing } from './progress-ring';

const getClasses = ({ connotation, size, paused }: ProgressRing) =>
	classNames(
		'base',
		['disabled', !!paused],
		[`connotation-${connotation}`, !!connotation],
		[`size-${size}`, !!size]
	);
const progressSegments = 44;

export const ProgressRingTemplate = html<ProgressRing>`<template>
	<div
		class="${(x) => (x.paused ? 'paused' : '')} ${getClasses}"
		${delegateAria({
			role: 'progressbar',
			ariaValueNow: (x) => x.value,
			ariaValueMin: (x) => x.min,
			ariaValueMax: (x) => x.max,
		})}
	>
		${when(
			(x) => typeof x.value === 'number',
			html<ProgressRing>`
				<svg class="progress" viewBox="0 0 16 16">
					<circle class="background" cx="8px" cy="8px" r="7px"></circle>
					<circle
						class="determinate"
						style="stroke-dasharray: ${(x) =>
							(progressSegments * x.percentComplete) /
							100}px ${progressSegments}px"
						cx="8px"
						cy="8px"
						r="7px"
					></circle>
				</svg>
			`
		)}
		${when(
			(x) => typeof x.value !== 'number',
			html<ProgressRing>`
				<svg class="progress" viewBox="0 0 16 16">
					<circle class="background" cx="8px" cy="8px" r="7px"></circle>
					<circle
						class="indeterminate-indicator-1"
						cx="8px"
						cy="8px"
						r="7px"
					></circle>
				</svg>
			`
		)}
	</div>
</template>`;
