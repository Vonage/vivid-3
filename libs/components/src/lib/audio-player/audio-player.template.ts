import type { ExecutionContext } from '@microsoft/fast-element';
import { html, repeat, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { Menu } from '../menu/menu';
import { MenuItem } from '../menu-item/menu-item';
import { getPlaybackRatesArray } from '../../shared/utils/playbackRates';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { AudioPlayer, formatTime, SKIP_DIRECTIONS } from './audio-player';

const getClasses = ({
	notime,
	disabled,
	duration,
	skipBy,
	playbackRates,
}: AudioPlayer) =>
	classNames(
		['disabled', Boolean(disabled) || !duration],
		[
			'two-lines',
			!notime && (Boolean(Number(skipBy)) || Boolean(playbackRates)),
		],
		['playback', Boolean(playbackRates)]
	);

const isMenuItemChekced = (
	playbackRate: number,
	{ parent }: ExecutionContext
) => {
	return playbackRate === parent.playbackRate;
};

function renderButton(context: VividElementDefinitionContext) {
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

function renderBackwardSkipButtons(context: VividElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip backward"
			@click="${(element) => element.skip(SKIP_DIRECTIONS.BACKWARD)}"
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

function renderForwardSkipButtons(context: VividElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`
		<${buttonTag} class="skip forward"
		@click="${(element) => element.skip(SKIP_DIRECTIONS.FORWARD)}"
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

function renderSlider(context: VividElementDefinitionContext) {
	const sliderTag = context.tagFor(Slider);

	return html<AudioPlayer>`
	<${sliderTag}
		class="slider"
		aria-label="${(x) => x.sliderAriaLabel || x.locale.audioPlayer.sliderLabel}"
		max="100"
		aria-valuetext="${(x) => formatTime(x.currentTime)}"
		connotation="${(x) => x.connotation}"
		?disabled="${(x) => x.disabled || !x.duration}"
		internal-part>
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html` <div class="time-stamp">
		<span class="current-time"
			>${(x) => formatTime((x as any).currentTime || 0)}</span
		>
		${when(
			(x) => (x as any).duration && (x as any).duration !== Infinity,
			html`
				<span>/</span>
				<span class="total-time"
					>${(x) => formatTime((x as any).duration || 0)}</span
				>
			`
		)}
	</div>`;
}

function handlePlaybackRateClick(
	playbackRate: string,
	context: ExecutionContext
) {
	context.parent.playbackRate = playbackRate;
	return true;
}

export const AudioPlayerTemplate = (context: VividElementDefinitionContext) => {
	const menuTag = context.tagFor(Menu);
	const buttonTag = context.tagFor(Button);
	const menuItemTag = context.tagFor(MenuItem);
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
				${when((x) => !(x as any).notime, renderTimestamp())}
			</div>
			${renderSlider(context)}
			${when(
				(x) => Boolean(x.playbackRates),
				html`
			<${menuTag} class="playback-rates" placement="top-start" auto-dismiss id="playback-menu" position-strategy="absolute">
				<${buttonTag} id="playback-open-button"
							  class="playback-button"
							  slot="anchor"
							  icon="playback-speed-line"
							  aria-label="play back rates"
							  size='condensed'
							  connotation="${(x) => x.connotation}"
							  ?disabled="${(x) => x.disabled || !x.duration}"
				></${buttonTag}>

				${repeat(
					(x) => getPlaybackRatesArray(x.playbackRates),
					html<number>`<${menuItemTag} @click="${handlePlaybackRateClick}"
																			 control-type="radio"
																			 class="playback-rate"
																			 text="${(x) => x}"
																			 check-appearance="tick-only"
																			 ?checked="${isMenuItemChekced}"></${menuItemTag}>`
				)}
			</${menuTag}>`
			)}
		</div>
	</div>`;
};
