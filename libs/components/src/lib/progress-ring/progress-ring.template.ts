import {html, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ProgressRing } from './progress-ring';

const getClasses = (_: ProgressRing) => classNames(
	'base',
);
const progressSegments: number = 44;

/**
 * The template for the {@link @microsoft/fast-foundation#ProgressRing} component.
 *
 * @param context
 * @param _
 * @param definition
 * @public
 */
export const ProgressRingTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ProgressRing> = (
	_: ElementDefinitionContext
) => html`
<div
        role="progressbar"
        aria-valuenow="${x => x.value}"
        aria-valuemin="${x => x.min}"
        aria-valuemax="${x => x.max}"
        class="${x => (x.paused ? 'paused' : '')} ${getClasses}"
    >
        ${when(
		x => typeof x.value === 'number',
		html<ProgressRing>`
                <svg
                    class="progress"
                    viewBox="0 0 16 16"
                >
                    <circle
                        class="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        style="stroke-dasharray: ${x =>
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
		x => typeof x.value !== 'number', html<ProgressRing>`
            <svg class="progress" viewBox="0 0 16 16">
              <circle
                class="background"
                cx="8px"
                cy="8px"
                r="7px"
              ></circle>
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
`;

