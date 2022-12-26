import { html, ref } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { Slider } from './slider';

const getClasses = ({ disabled}: Slider) =>
	classNames(
		'control',
		['disabled', Boolean(disabled)],
	);

/**
 *
 *
 * @param isHorizontal - if Horizontal
 * @param  numMarkers - num of makers
 * @returns  HTMLElement - template
 */
const getMarkersTemplate = (isHorizontal: boolean, numMarkers: number) => {
	const placeholder = isHorizontal
		? [ 'right' , 'center', ''    , '100% repeat-x' ]
		: [ 'bottom', 'top'   , '100%', 'repeat-y'      ];

	return html`
	<div class="mark" style="
	background: linear-gradient(to ${placeholder[0]}, currentcolor 3px, transparent 0px)
	0px ${placeholder[1]} / ${placeholder[2]} calc((100% - 3px) / ${numMarkers}) ${placeholder[3]}
	"></div>`;
};

/**
 *
 * @param  ElementDefinitionContext - context element definition
 * @returns HTMLElement - template
 */
export const SliderTemplate: (context: ElementDefinitionContext) => ViewTemplate<Slider> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	/* eslint-disable @typescript-eslint/indent */
	return html<Slider>`
	<div
		role="slider"
		tabindex="${x => (x.disabled ? null : 0)}"
		aria-valuetext="${x => x.valueTextFormatter(x.value)}"
		aria-valuenow="${x => x.value}"
		aria-valuemin="${x => x.min}"
		aria-valuemax="${x => x.max}"
		aria-disabled="${x => (x.disabled ? true : void 0)}"
		aria-orientation="${x => x.orientation}"
		class="${getClasses} ${x => x.orientation}"
	>
		<div class="positioning-region">
			<div ${ref('track')} class="track">
				<div class="track-start" style="${x => x.position}"></div>
				${x => x.markers
					? getMarkersTemplate(x.orientation === Orientation.horizontal, Math.floor((x.max - x.min) / x.step))
					: void 0}
			</div>
			<div ${ref('thumb')} class="thumb-container" style="${x => x.position}">
				${() => focusTemplate}
			</div>
		</div>
	</div>`;
};
