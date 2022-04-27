import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type {BaseProgress, ProgressOptions} from '@microsoft/fast-foundation';
import type { Progress } from './progress';

const getClasses = (_: Progress) => classNames(
	'base',
	[`connotation-${_.connotation}`, !!_.connotation],
	[`shape-${_.shape}`, !!_.shape],
	['reverse', _.reverse]
);

/**
 * The template for the {@link @microsoft/fast-foundation#Progress} component.
 *
 * @param context
 * @param _
 * @param definition
 * @public
 */
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
      class="${x => (x.paused ? 'paused' : '')} ${getClasses}"
    >
      ${when(
		x => typeof x.value === 'number',
		html<BaseProgress>`
                  <div class="progress">
                      <div
                          class="determinate"
                          style="width: ${x => x.percentComplete}%"
                      ></div>
                  </div>
              `
	)}
      ${when(
		x => typeof x.value !== 'number',
		html<BaseProgress>`
                  <div class="progress indeterminate">
                      <span class="indeterminate" name="indeterminate">
                        <span class="indeterminate-indicator-1"></span>
                        <span class="indeterminate-indicator-2"></span>
                      </span>
                  </div>
              `
	)}
    </div>
  `;
};

