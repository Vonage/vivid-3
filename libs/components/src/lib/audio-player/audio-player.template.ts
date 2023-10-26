import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';

const getClasses = ({ connotation, disabled, duration }: AudioPlayer) => classNames(
	[`connotation-${connotation}`, Boolean(connotation)],
	['disabled', Boolean(disabled) || !Boolean(duration)],
);

function renderButton(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<AudioPlayer>`<${buttonTag} class="pause" @click="${x => x._togglePlay()}"
	icon="${x => x.paused ? 'play-solid' : 'pause-solid'}" 
	aria-lablel="${x => x.paused ? 'play-button' : 'pause-button'}" 
	size='condensed' 
	?disabled="${x => x.disabled || !x.duration}" 
	connotation="${x => x.connotation}"
  ></${buttonTag}>`;
}

function renderSlider(context: ElementDefinitionContext) {
	const sliderTag = context.tagFor(Slider);

	return html<AudioPlayer>`<${sliderTag}
	${ref('_sliderEl')} class="slider" 
	value="0" max="100" 
	?disabled="${x => x.disabled || !x.duration}"
	@mousedown="${x => x._rewind()}">
	</${sliderTag}>`;
}

function renderTimestamp() {
	return html`<span class="current-time">0:00</span>
	<span>/</span>
	<span class="total-time">0:00</span>`;
}

export const AudioPlayerTemplate: (context: ElementDefinitionContext, definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {

	return html<AudioPlayer>`
    <div class="base ${getClasses}" aria-disabled="${(x) => x.disabled}">
      <div class="controls" ${ref('_controlEl')}>
	  	${renderButton(context)}
      	${when(x => x.timestamp, renderTimestamp())}
		${when(x => !x.noseek, renderSlider(context))}
      </div>
      <audio ${ref('_playerEl')} src="${x => x.src}"
      @timeupdate="${x => x._updateProgress()}" @loadedmetadata="${x => x._updateTotalTime()}"></audio>
    </div>`;
};