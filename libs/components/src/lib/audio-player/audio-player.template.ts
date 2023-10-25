import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Button } from '../button/button';
import type { AudioPlayer } from './audio-player';

const getClasses = ({ connotation, disabled, duration }: AudioPlayer) =>
	classNames(
		[`connotation-${connotation}`, Boolean(connotation)],
		['disabled', Boolean(disabled) || !Boolean(duration)],
	);

export const AudioPlayerTemplate: (context: ElementDefinitionContext, definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);
	const elevationTag = context.tagFor(Elevation);

	return html<AudioPlayer>`
	<${elevationTag} dp="2">
    <div class="base ${getClasses}" aria-disabled="${(x) => x.disabled}">
      <${buttonTag} class="pause" icon="${x => x.paused ? 'play-solid' : 'pause-solid'}" 
      aria-lablel="${x => x.paused ? 'play-button' : 'pause-button'}"
      size='condensed' ?disabled="${x => x.disabled || !x.duration}" 
      connotation="${x => x.connotation}" 
      @click="${x => x._togglePlay()}"></${buttonTag}>

      <div class="controls" ${ref('_controlEl')}>
      ${when(x => x.timestamp,
		html`<span class="current-time">0:00</span>
          <span>/</span>
          <span class="total-time">0:00</span>`)}
		  ${when(x => !x.noseek,
		html`<div class="slider" ${ref('_sliderEl')} @click="${(x, c) => x._rewind(c.event as MouseEvent)}">
          <div class="progress">
            <div class="pin ${getClasses}" role='button' id="progress-pin" 
            @mousedown="${(x, c) => x._onMouseDown(c.event as MouseEvent)}"></div>
          </div>
        </div>`)}
      </div>
      <audio ${ref('_playerEl')} src="${x => x.src}"
      @timeupdate="${x => x._updateProgress()}" @loadedmetadata="${x => x._updateTotalTime()}"></audio>
    </div>
  </${elevationTag}>`;
};


