import {
	html,
	observable,
	ref,
	ViewTemplate,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { FoundationElement } from '@microsoft/fast-foundation';
import {
	PlacementStrategy,
	type PlacementStrategyId,
	Popup,
} from '../popup/popup';
import type { ThumbId } from './range-slider';
import { RangeSlider } from './range-slider';

// TODO: take care of visibilyFocusedThumb
const getThumbClassesFor =
	(thumb: ThumbId) =>
	({ _visiblyFocusedThumb }: RangeSliderThumb) =>
		classNames('thumb-container', [
			'focus-visible',
			_visiblyFocusedThumb === thumb,
		]);

export const RangeSliderThumbTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<RangeSliderThumb> = (context) => {
	const popupTag = context.tagFor(Popup);
	return html`
		<div
			${ref('thumb')}
			class="${getThumbClassesFor('start')}"
			style="${(x) => x.thumbCss}"
			role="slider"
			tabindex="${(x) => (x.rangeSlider.disabled ? null : 0)}"
			aria-label="${(x) =>
				x.label || x.rangeSlider.locale.rangeSlider.startThumbLabel}"
			aria-valuetext="${(x) => x.rangeSlider.valueTextFormatter(x.value)}"
			aria-valuenow="${(x) => x.value}"
			aria-valuemin="${(x) => x.min}"
			aria-valuemax="${(x) => x.max}"
			aria-disabled="${(x) => x.rangeSlider.disabled}"
			aria-orientation="${(x) => x.rangeSlider.orientation}"
		></div>
		${when(
			(x) => x.rangeSlider.pin,
			html<RangeSliderThumb>`<${popupTag}
      class='popup'
      ${ref('popup')}
      arrow
      alternate
      :open=${(x) => x._isThumbPopupOpen('start')}
      :placementStrategy=${(x) => x.placementStrategy}
      animation-frame
      exportparts="vvd-theme-alternate"
      aria-hidden="true"
    >
      <div class="tooltip">${(x) =>
				x.rangeSlider.valueTextFormatter(x.value)}</div>
    </${popupTag}>`
		)}
	`;
};

export class RangeSliderThumb extends FoundationElement {
	thumb: HTMLDivElement | null = null;
	popup: HTMLDivElement | null = null;
	@observable placementStrategy: PlacementStrategyId =
		PlacementStrategy.AutoPlacementHorizontal;
	@observable thumbCss = '';
	@observable value = '';
	@observable min?: number;
	@observable max?: number;
	@observable label = '';
	rangeSlider!: RangeSlider;
	@observable _draggingThumb = false;
	@observable _visiblyFocusedThumb = false;
	@observable _hoveredThumb = false;

	get _isThumbPopupOpen() {
		return (
			this._visiblyFocusedThumb || this._hoveredThumb || this._draggingThumb
		);
	}
}
