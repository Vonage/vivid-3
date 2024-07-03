import { html, when } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { getMarkersTemplate } from '../slider/slider.template';
import { PlacementStrategy, Popup } from '../popup/popup';
import type { RangeSlider, ThumbId } from './range-slider';

const getClasses = ({ disabled, connotation }: RangeSlider) =>
	classNames(
		'control',
		['disabled', Boolean(disabled)],
		[`connotation-${connotation}`, Boolean(connotation)]
	);

const getThumbClassesFor =
	(thumb: ThumbId) =>
	({ _visiblyFocusedThumb }: RangeSlider) =>
		classNames('thumb-container', [
			'focus-visible',
			_visiblyFocusedThumb === thumb,
		]);

/**
 * The template for the RangeSlider component.
 *
 * @param context - element definition context
 * @public
 */
export const RangeSliderTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<RangeSlider> = (context) => {
	const popupTag = context.tagFor(Popup);

	return html<RangeSlider>` <template
		@mousedown="${(x, c) => x._onMouseDown(c.event as MouseEvent)}"
	>
		<div class="${getClasses} ${(x) => x.orientation}">
			<div class="positioning-region">
				<div id="track" class="track">
					<div class="track-start" style="${(x) => x._selectedRangeCss}"></div>
					${when(
						(x) => x.markers,
						html<RangeSlider>`${(x) =>
							getMarkersTemplate(
								x.orientation === Orientation.horizontal,
								Math.floor((x.max - x.min) / x.step)
							)}`
					)}
				</div>
				<div
					id="start-thumb"
					class="${getThumbClassesFor('start')}"
					style="${(x) => x._startThumbCss}"
					role="slider"
					tabindex="${(x) => (x.disabled ? null : 0)}"
					aria-label="${(x) =>
						x.ariaStartLabel || x.locale.rangeSlider.startThumbLabel}"
					aria-valuetext="${(x) => x.valueTextFormatter(x.start)}"
					aria-valuenow="${(x) => x.start}"
					aria-valuemin="${(x) => x.min}"
					aria-valuemax="${(x) => x.end}"
					aria-disabled="${(x) => x.disabled}"
					aria-orientation="${(x) => x.orientation}"
				></div>
				${when(
					(x) => x.pin,
					html<RangeSlider>`<${popupTag}
					class="popup"
					id="start-popup"
					arrow
					alternate
					:open=${(x) => x._isThumbPopupOpen('start')}
					:placementStrategy=${(x) =>
						x.orientation === Orientation.horizontal
							? PlacementStrategy.AutoPlacementHorizontal
							: PlacementStrategy.AutoPlacementVertical}
					animation-frame
					exportparts="vvd-theme-alternate"
					aria-hidden="true"
				>
					<div class="tooltip">${(x) => x.valueTextFormatter(x.start)}</div>
				</${popupTag}>`
				)}
				<div
					id="end-thumb"
					class="${getThumbClassesFor('end')}"
					style="${(x) => x._endThumbCss}"
					role="slider"
					tabindex="${(x) => (x.disabled ? null : 0)}"
					aria-label="${(x) =>
						x.ariaEndLabel || x.locale.rangeSlider.endThumbLabel}"
					aria-valuetext="${(x) => x.valueTextFormatter(x.end)}"
					aria-valuenow="${(x) => x.end}"
					aria-valuemin="${(x) => x.start}"
					aria-valuemax="${(x) => x.max}"
					aria-disabled="${(x) => x.disabled}"
					aria-orientation="${(x) => x.orientation}"
				></div>
				${when(
					(x) => x.pin,
					html<RangeSlider>`<${popupTag}
					class="popup"
					id="end-popup"
					arrow
					alternate
					:open=${(x) => x._isThumbPopupOpen('end')}
					:placementStrategy=${(x) =>
						x.orientation === Orientation.horizontal
							? PlacementStrategy.AutoPlacementHorizontal
							: PlacementStrategy.AutoPlacementVertical}
					animation-frame
					exportparts="vvd-theme-alternate"
					aria-hidden="true"
				>
					<div class="tooltip">${(x) => x.valueTextFormatter(x.end)}</div>
				</${popupTag}>`
				)}
			</div>
		</div>
	</template>`;
};
