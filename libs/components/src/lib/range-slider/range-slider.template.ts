import { html, ref, when } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import { getMarkersTemplate } from '../slider/slider.template';
import { PlacementStrategy, Popup } from '../popup/popup';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
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

export const RangeSliderTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	return html<RangeSlider>` <template
		@mousedown="${(x, c) => x._onMouseDown(c.event as MouseEvent)}"
	>
		<div class="${getClasses} ${(x) => x.orientation}">
			<div class="positioning-region">
				<div ${ref('_trackEl')} class="track">
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
					${ref('_startThumbEl')}
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
					arrow
					alternate
					:anchor="${(x) => x._startThumbEl}"
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
					${ref('_endThumbEl')}
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
					arrow
					alternate
					:anchor="${(x) => x._endThumbEl}"
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
