import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref, when } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { MediaSkipBy } from '@vonage/vivid';
import { AudioPlayer } from './audio-player';

const getClasses = ({ disabled, duration }: AudioPlayer) =>
	classNames(['disabled', Boolean(disabled) || !Boolean(duration)]);

function renderButton(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`<${buttonTag} class="pause" @click="${(x) =>
		x._togglePlay()}"
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

function renderSkipButtons(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip forward" @click="${(x) => x._toggleSkipBackward()}"
		icon="${(x) =>
			x.skipBy == MediaSkipBy.Five
				? 'error-solid'
				: x.skipBy == MediaSkipBy.Ten
				? '10-sec-backward-solid'
				: x.skipBy == MediaSkipBy.Thirty
				? 'info-line'
				: ''}"
		size='condensed'
		aria-label="${(x) =>
			x.skipBackwardButtonAriaLabel || x.locale.audioPlayer.skipBackwardButton}"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}"
		></${buttonTag}>

		<${buttonTag} class="skip backward" @click="${(x) => x._toggleSkipForward()}"
		icon="${(x) =>
			x.skipBy == MediaSkipBy.Five
				? 'error-solid'
				: x.skipBy == MediaSkipBy.Ten
				? '10-sec-forward-line'
				: x.skipBy == MediaSkipBy.Thirty
				? 'info-line'
				: ''}"
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
	//TODO: add play-pause on enter on Slider
	return html<AudioPlayer>`<${sliderTag}
	${ref('_sliderEl')} class="slider"
	@click = ${(x) => x._rewind()}
	aria-label="${(x) => x.sliderAriaLabel || x.locale.audioPlayer.sliderLabel}"
	value="0" max="100"
	connotation="${(x) => x.connotation}"
	?disabled="${(x) => x.disabled || !x.duration}">
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html` <div class="time-stamp" ${ref('_timeStampEl')}>
		<span class="current-time">0:00</span>
		<span>/</span>
		<span class="total-time">0:00</span>
	</div>`;
}

export const AudioPlayerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {
	return html<AudioPlayer>` <div class="base ${getClasses}">
		<div class="controls">
			${renderButton(context)}
			${when((x) => x.skipBy != MediaSkipBy.Zero, renderSkipButtons(context))}
			${when((x) => !x.notime, renderTimestamp())} ${renderSlider(context)}
		</div>
		<audio
			${ref('_playerEl')}
			src="${(x) => x.src}"
			@timeupdate="${(x) => x._updateProgress()}"
			@loadedmetadata="${(x) => x._updateTotalTime()}"
		></audio>
	</div>`;
};
