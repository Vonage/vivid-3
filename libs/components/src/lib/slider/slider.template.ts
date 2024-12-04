import { html, ref, when } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import { PlacementStrategy, Popup } from '../popup/popup';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { Slider } from './slider';

const getClasses = ({ disabled, connotation }: Slider) =>
	classNames(
		'control',
		['disabled', Boolean(disabled)],
		[`connotation-${connotation}`, Boolean(connotation)]
	);

const getThumbClasses = ({ _focusVisible }: Slider) =>
	classNames('thumb-container', ['focus-visible', _focusVisible]);

export const getMarkersTemplate = (
	isHorizontal: boolean,
	numMarkers: number
) => {
	const placeholder = isHorizontal
		? ['right', 'center', '', '100% repeat-x']
		: ['bottom', 'top', '100%', 'repeat-y'];

	return html` <div
		class="mark"
		style="
	background: linear-gradient(to ${placeholder[0]}, currentcolor 1px, transparent 0px)
	0px ${placeholder[1]} / ${placeholder[2]} calc((100% - 1px) / ${numMarkers}) ${placeholder[3]}
	"
	></div>`;
};

export const SliderTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	/* eslint-disable @typescript-eslint/indent */
	return html<Slider>`<template
		role="${(x) => (x.ariaLabel ? 'presentation' : null)}"
		@focusin="${(x) => x._onFocusIn()}"
		@focusout="${(x) => x._onFocusOut()}"
	>
		<div
			role="slider"
			tabindex="${(x) => (x.disabled ? null : 0)}"
			aria-label="${(x) => x.ariaLabel}"
			aria-valuetext="${(x) =>
				x.ariaValuetext || x.valueTextFormatter(x.value)}"
			aria-valuenow="${(x) => x.value}"
			aria-valuemin="${(x) => x.min}"
			aria-valuemax="${(x) => x.max}"
			aria-disabled="${(x) => (x.disabled ? true : void 0)}"
			aria-orientation="${(x) => x.orientation}"
			class="${getClasses} ${(x) => x.orientation}"
		>
			<div class="positioning-region">
				<div ${ref('track')} class="track">
					${(x) =>
						x.markers
							? getMarkersTemplate(
									x.orientation === Orientation.horizontal,
									Math.floor((x.max - x.min) / x.step)
							  )
							: void 0}
					<div class="track-start" style="${(x) => x.position}"></div>
				</div>
				<div
					${ref('thumb')}
					class="${(x) => getThumbClasses(x)}"
					style="${(x) => x.position}"
				></div>
				${when(
					(x) => x.pin,
					html<Slider>`<${popupTag}
					class="popup"
					arrow
					alternate
					:anchor="${(x) => x.thumb}"
					:open=${(x) => x._isThumbPopupOpen}
					:placementStrategy=${(x) =>
						x.orientation === Orientation.horizontal
							? PlacementStrategy.AutoPlacementHorizontal
							: PlacementStrategy.AutoPlacementVertical}
					animation-frame
					exportparts="vvd-theme-alternate"
					aria-hidden="true"
				>
					<div class="tooltip">${(x) =>
						x.ariaValuetext || x.valueTextFormatter(x.value)}</div>
				</${popupTag}>`
				)}
			</div>
		</div></template
	>`;
};
