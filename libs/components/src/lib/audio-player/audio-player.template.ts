import type { ViewTemplate } from '@microsoft/fast-element';
import { html, when } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import {
	AudioPlayer,
	SKIP_DIRECTIONS,
	type SKIP_DIRECTIONS_TYPE,
} from './audio-player';

const getClasses = ({ disabled, duration }: AudioPlayer) =>
	classNames(['disabled', Boolean(disabled) || !duration]);

function skip(audioPlayer: AudioPlayer, direction: SKIP_DIRECTIONS_TYPE) {
	const skipEvent = new CustomEvent('vwc-audio-player:skip', {
		bubbles: false,
		detail: direction,
	});
	audioPlayer.dispatchEvent(skipEvent);
}

function renderButton(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`<${buttonTag} class="pause" @click="${(x) =>
		x.paused ? x.play() : x.pause()}"
	icon="${(x) => (x.paused ? 'play-solid' : 'pause-solid')}"
	aria-label="${(x) =>
		x.paused
			? x.playButtonAriaLabel || x.locale.audioPlayer.playButtonLabel
			: x.pauseButtonAriaLabel || x.locale.audioPlayer.pauseButtonLabel}"
	size='condensed'
	connotation="${(x) => x.connotation}"
	?disabled="${(x) => x.disabled || !x.duration}"
  ></${buttonTag}>`;
}

function renderBackwardSkipButtons(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip backward" @click="${(x) =>
		skip(x, SKIP_DIRECTIONS.BACKWARD)}"
		icon="${(x) =>
			x.skipBy == MediaSkipBy.Five
				? '5-sec-backward-line'
				: x.skipBy == MediaSkipBy.Thirty
				? '30-sec-backward-line'
				: '10-sec-backward-line'}"
		size='condensed'
		aria-label="${(x) =>
			x.skipBackwardButtonAriaLabel || x.locale.audioPlayer.skipBackwardButton}"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}"
		></${buttonTag}>
	`;
}

function renderForwardSkipButtons(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip forward" @click="${(x) =>
		skip(x, SKIP_DIRECTIONS.FORWARD)}"
		icon="${(x) =>
			x.skipBy == MediaSkipBy.Five
				? '5-sec-forward-line'
				: x.skipBy == MediaSkipBy.Thirty
				? '30-sec-forward-line'
				: '10-sec-forward-line'}"
		size='condensed'
		aria-label="${(x) =>
			x.skipForwardButtonAriaLabel || x.locale.audioPlayer.skipForwardButton}"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}"
		></${buttonTag}>
	`;
}

function renderSlider(context: ElementDefinitionContext) {
	const sliderTag = context.tagFor(Slider);

	return html<AudioPlayer>`
	<${sliderTag}
		class="slider"
		aria-label="${(x) => x.sliderAriaLabel || x.locale.audioPlayer.sliderLabel}"
		value="0" max="100"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}">
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html` <div class="time-stamp">
		<span class="current-time">0:00</span>
		<span>/</span>
		<span class="total-time">0:00</span>
	</div>`;
}

export const AudioPlayerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {
	return html<AudioPlayer>` <div class="wrapper">
		<div class="base ${getClasses}">
			<div class="controls">
				${when(
					(x) => x.skipBy && x.skipBy != MediaSkipBy.Zero,
					renderBackwardSkipButtons(context)
				)}
				${renderButton(context)}
				${when(
					(x) => x.skipBy && x.skipBy != MediaSkipBy.Zero,
					renderForwardSkipButtons(context)
				)}
				${when((x) => !x.notime, renderTimestamp())}
			</div>
			${renderSlider(context)}
		</div>
	</div>`;
};
