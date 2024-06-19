import { html, ref, when } from '@microsoft/fast-element';
import { classNames, Orientation } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { PlacementStrategy, Popup } from '../popup/popup';
import type { Slider } from './slider';

const getClasses = ({ disabled, connotation }: Slider) =>
	classNames(
		'control',
		['disabled', Boolean(disabled)],
		[`connotation-${connotation}`, Boolean(connotation)]
	);

const OPEN = true;
const CLOSE = false;

function togglePopup(slider: Slider, open: boolean) {
	const popup = slider.shadowRoot?.querySelector('.popup');
	if (popup) (popup as Popup).open = open;
}

function toggleFocusRing(slider: Slider, show: boolean) {
	slider.thumb.classList[show ? 'add' : 'remove']('focus-visible');
}

function onFocusIn(slider: Slider) {
	togglePopup(slider, OPEN);
	toggleFocusRing(slider, OPEN);
}

function onKeyPress(slider: Slider) {
	togglePopup(slider, OPEN);
	toggleFocusRing(slider, OPEN);
	return;
}

function onFocusOut(slider: Slider) {
	togglePopup(slider, CLOSE);
	toggleFocusRing(slider, CLOSE);
}

function onMouseDown(slider: Slider) {
	const handleFocusAfterMouseDown = () => {
		toggleFocusRing(slider, CLOSE);
		slider.removeEventListener('focusin', handleFocusAfterMouseDown)
	}
	slider.addEventListener('focusin', handleFocusAfterMouseDown);	
}

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
	background: linear-gradient(to ${placeholder[0]}, currentcolor 3px, transparent 0px)
	0px ${placeholder[1]} / ${placeholder[2]} calc((100% - 3px) / ${numMarkers}) ${placeholder[3]}
	"
	></div>`;
};

export const SliderTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Slider> = (context: ElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	/* eslint-disable @typescript-eslint/indent */
	return html<Slider>`<template
		role="${(x) => (x.ariaLabel ? 'presentation' : null)}"
		@focusin="${onFocusIn}"
		@focusout="${onFocusOut}"
		@mousedown="${onMouseDown}"
		@keydown="${onKeyPress}"
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
					<div class="track-start" style="${(x) => x.position}"></div>
					${(x) =>
						x.markers
							? getMarkersTemplate(
									x.orientation === Orientation.horizontal,
									Math.floor((x.max - x.min) / x.step)
							  )
							: void 0}
				</div>
				<div
					${ref('thumb')}
					class="thumb-container"
					style="${(x) => x.position}"
					@mouseover="${x => togglePopup(x, OPEN)}"
					@mouseout="${x => togglePopup(x, CLOSE)}"
					@mousedown="${onMouseDown}"
				></div>
				${when(
					(x) => x.pin,
					html<Slider>`<${popupTag}
					class="popup"
					arrow
					alternate
					:anchor="${(x) => x.thumb}"
					:open=${(x) => x.isDragging}
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
