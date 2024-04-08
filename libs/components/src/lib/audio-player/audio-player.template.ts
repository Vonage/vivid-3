import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';

const getClasses = ({ disabled, duration }: AudioPlayer) => classNames(
	['disabled', Boolean(disabled) || duration === undefined],
);

function renderButton(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`<${buttonTag} class="pause" @click="${x => x.paused = !x.paused}"
	icon="${x => x.paused ? 'play-solid' : 'pause-solid'}"
	aria-label="${x => x.paused
		? x.playButtonAriaLabel || x.locale.audioPlayer.playButtonLabel
		: x.pauseButtonAriaLabel || x.locale.audioPlayer.playButtonLabel}"
	size='condensed'
	connotation="${x => x.connotation}"
	?disabled="${x => x.disabled || x.duration === undefined }"
  ></${buttonTag}>`;
}

function renderSlider(context: ElementDefinitionContext) {
	const sliderTag = context.tagFor(Slider);

	return html<AudioPlayer>`<${sliderTag}
	class="slider"
	aria-label="${x => x.sliderAriaLabel || x.locale.audioPlayer.sliderLabel}"
	value="0" max="100"
	connotation="${x => x.connotation}"
	?disabled="${x => x.disabled || x.duration === undefined}">
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html`
	<div class="time-stamp">
		<span class="current-time">0:00</span>
		<span>/</span>
		<span class="total-time">0:00</span>
	</div>`;
}

export const AudioPlayerTemplate: (context: ElementDefinitionContext, definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {

	return html<AudioPlayer>`
    <div class="base ${getClasses}">
      <div class="controls">
	  	${renderButton(context)}
      	${when(x => !x.notime, renderTimestamp())}
		${renderSlider(context)}
      </div>
    </div>`;
};
