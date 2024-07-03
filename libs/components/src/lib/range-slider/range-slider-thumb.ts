import { FASTElement, html, when, ViewTemplate } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { PlacementStrategy, Popup } from '../popup/popup';

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
      html<RangeSliderThumb>`<${popupTag}
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
  `;


export class RangeSliderThumb extends FASTElement {

}