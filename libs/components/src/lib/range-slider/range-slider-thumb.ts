import {
	attr,
	FASTElement,
	html,
	observable,
	ref,
	ViewTemplate,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { PlacementStrategy, Popup } from '../popup/popup';
import type { ThumbId } from './range-slider';
import {RangeSlider} from "./range-slider";

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
				x.rangeSlider.ariaStartLabel || x.locale.rangeSlider.startThumbLabel}"
			aria-valuetext="${(x) => x.valueTextFormatter(x.start)}"
			aria-valuenow="${(x) => x.start}"
			aria-valuemin="${(x) => x.min}"
			aria-valuemax="${(x) => x.end}"
			aria-disabled="${(x) => x.disabled}"
			aria-orientation="${(x) => x.orientation}"
		></div>
		${when(
			(x) => x.pin,
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
      <div class="tooltip">${(x) => x.valueTextFormatter(x.start)}</div>
    </${popupTag}>`
		)}
	`;
};

export class RangeSliderThumb extends FASTElement {
	thumb: HTMLDivElement | null = null;
	popup: HTMLDivElement | null = null;
	@observable placementStrategy: PlacementStrategy;
	@observable 'thumbCss';
	rangeSlider: RangeSlider;

}
