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
	formatTime,
	SKIP_DIRECTIONS,
	type SKIP_DIRECTIONS_TYPE,
} from './audio-player';

function getCurrentTimePercentage(x: AudioPlayer) {
	if (Number.isNaN(x.currentTime) || Number.isNaN(x.duration)) {
		return 0;
	}
	return  (x.currentTime / x.duration) * 100;
}

function skip(audioElement: AudioPlayer, skipDirection: SKIP_DIRECTIONS_TYPE) {
	const currentTime = audioElement.currentTime;
	const skipValue = parseInt(audioElement.skipBy!) * skipDirection;
	const newTime = currentTime + skipValue;

	audioElement.currentTime = Math.max(
		0,
		Math.min(audioElement.duration, newTime)
	);
}

const getClasses = ({ disabled, duration }: AudioPlayer) =>
	classNames(['disabled', Boolean(disabled) || !duration]);

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
		<${buttonTag} class="skip backward"
			@click="${(element) => skip(element, SKIP_DIRECTIONS.BACKWARD)}"
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
		<${buttonTag} class="skip forward"
		@click="${(element) => skip(element, SKIP_DIRECTIONS.FORWARD)}"
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
		value="${getCurrentTimePercentage}" max="100"
		ariaValuetext="${x => formatTime(x.currentTime)}"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}">
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html` <div class="time-stamp">
		<span class="current-time">${x => formatTime(x.currentTime)}</span>
		<span>/</span>
		<span class="total-time">${x => formatTime(x.duration)}</span>
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
