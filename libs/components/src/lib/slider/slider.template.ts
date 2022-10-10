import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
// import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
// import type { SliderOptions } from '@microsoft/fast-foundation';

import type { Slider } from './slider';

const getClasses = (_: Slider) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Slider} component.
 *
 * @param context
 * @public
 */
export const SliderTemplate: (
	// context: ElementDefinitionContext,
	// options: SliderOptions
// ) => ViewTemplate<Slider> = (context, options) => {
) => ViewTemplate<Slider> = () => {
	return html<Slider>`
        <div
            role="slider"
            tabindex="${x => (x.disabled ? null : 0)}"
            aria-valuetext="${x => x.valueTextFormatter(x.value)}"
            aria-valuenow="${x => x.value}"
            aria-valuemin="${x => x.min}"
            aria-valuemax="${x => x.max}"
            aria-disabled="${x => (x.disabled ? true : void 0)}"
            aria-readonly="${x => (x.readOnly ? true : void 0)}"
            aria-orientation="${x => x.orientation}"
            class="${getClasses} ${x => x.orientation}"
        >
            <div class="positioning-region">
                <div ${ref("track")} class="track">
                    <div class="track-start" style="${x => x.position}"></div>
                </div>
                <div ${ref("thumb")} class="thumb-container" style="${x => x.position}">
                    <div class="thumb-cursor"></div>
                </div>
            </div>
		</div>
	`;
};
