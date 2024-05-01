import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref, when } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Menu } from '../menu/menu';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';

const getClasses = ({
	disabled,
	duration,
	notime,
	playbackRates,
	skipBy,
}: AudioPlayer) =>
	classNames(
		['disabled', Boolean(disabled) || !Boolean(duration)],
		['playback', Boolean(playbackRates)],
		[
			'two-lines',
			(!Boolean(notime) && Boolean(playbackRates)) ||
				(Boolean(skipBy) && skipBy != MediaSkipBy.Zero && !Boolean(notime)),
		]
	);

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

function renderBackwardSkipButtons(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip backward" @click="${(x) =>
		x._onSkipButtonClick(false)}"
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
		<${buttonTag} class="skip forward" @click="${(x) => x._onSkipButtonClick(true)}"
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

function renderPlayback(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);
	const menuTag = context.tagFor(Menu);

	return html<AudioPlayer>`
		<${menuTag} placement="bottom-end">
	<${buttonTag} class="playback"
	slot="anchor"
	icon="playback-speed-line"
	aria-label="play back rates"
	size='condensed'
	connotation="${(x) => x.connotation}"
	?disabled="${(x) => x.disabled || !x.duration}"
  ></${buttonTag}>
		</${menuTag}>
	`;
}

function renderSlider(context: ElementDefinitionContext) {
	const sliderTag = context.tagFor(Slider);

	return html<AudioPlayer>`<${sliderTag}
	${ref('_sliderEl')} class="slider"
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
	return html<AudioPlayer>` <div class="wrapper">
		<div
			class="base ${getClasses}"
			@keyup="${(x, c) => x._handleSliderEvent(c.event)}"
			@keydown="${(x, c) => x._handleSliderEvent(c.event)}"
			@mousedown="${(x, c) => x._handleSliderEvent(c.event)}"
		>
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
			${when((x) => x.playbackRates, renderPlayback(context))}
			<audio
				${ref('_playerEl')}
				src="${(x) => x.src}"
				@timeupdate="${(x) => x._updateProgress()}"
				@loadedmetadata="${(x) => x._updateTotalTime()}"
			></audio>
		</div>
	</div>`;
};
