import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type {BaseProgress, ProgressOptions} from '@microsoft/fast-foundation';
import type { Progress } from './progress';


const getClasses = ({
	connotation, shape, reverse, paused
}: Progress) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`shape-${shape}`, Boolean(shape)],
	['reverse', Boolean(reverse)],
	['paused', Boolean(paused)],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Progress} component.
 *
 * @param context
 * @param _
 * @param definition
 * @public
 */


/**
 determinate
 */
function determinate() {
	return html<BaseProgress>`
		<span class="determinate" style="width: ${x => x.percentComplete}%"></span>`;
}

/**
 indeterminate
 */
function indeterminate() {
	return html<BaseProgress>`
		<span class="indeterminate" name="indeterminate">
			<span class="indicator-1"></span>
			<span class="indicator-2"></span>
		 </span>`;
}

export const ProgressTemplate: (
	context: ElementDefinitionContext,
	definition: ProgressOptions
) => ViewTemplate<Progress> = (_: ElementDefinitionContext) => {
	return html`
    <div
      role="progressbar"
      aria-valuenow="${x => x.value}"
      aria-valuemin="${x => x.min}"
      aria-valuemax="${x => x.max}"
      class="${getClasses}"
    >
		<div class="progress">
		  ${when(x => typeof x.value === 'number', determinate())}
		  ${when(x => typeof x.value !== 'number', indeterminate())}
    	</div>
	</div>
  `;
};

