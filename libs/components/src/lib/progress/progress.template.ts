import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
} from '@microsoft/fast-foundation';
// import { classNames } from '@microsoft/fast-web-utilities';
import type {BaseProgress, ProgressOptions} from '@microsoft/fast-foundation';
import type { Progress } from './progress';

// const getClasses = (_: Progress) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Progress} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const ProgressTemplate: (
	context: ElementDefinitionContext,
	definition: ProgressOptions
) => ViewTemplate<Progress> = (_: ElementDefinitionContext, definition: ProgressOptions) => {
  return html`
    <template
      role="progressbar"
      aria-valuenow="${x => x.value}"
      aria-valuemin="${x => x.min}"
      aria-valuemax="${x => x.max}"
      class="${x => (x.paused ? 'paused' : '')}"
    >
      ${when(
        x => typeof x.value === 'number',
        html<BaseProgress>`
                  <div class="progress" part="progress" slot="determinate">
                      <div
                          class="determinate"
                          part="determinate"
                          style="width: ${x => x.percentComplete}%"
                      ></div>
                  </div>
              `
      )}
      ${when(
        x => typeof x.value !== 'number',
        html<BaseProgress>`
                  <div class="progress" part="progress" slot="indeterminate">
                      <slot class="indeterminate" name="indeterminate">
                          ${definition.indeterminateIndicator1 || ''}
                          ${definition.indeterminateIndicator2 || ''}
                      </slot>
                  </div>
              `
      )}
    </template>
  `;
};
