/* eslint-disable max-len */
import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { Elevation } from '../elevation/elevation';
import type { AudioPlayer } from './audio-player';

// const getClasses = ({ connotation, disabled }: AudioPlayer) =>
// 	classNames(
// 		'base',
// 		[`connotation-${connotation}`, Boolean(connotation)],
// 		['disabled', Boolean(disabled)],
// 	);


/**
 * The template for the AudioPlayer component.
 *
 * @param context - element definition context
 * @public
 */
export const AudioPlayerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {
	// const buttonTag = context.tagFor(Button);
	const elevationTag = context.tagFor(Elevation);

	return html<AudioPlayer>`
	<${elevationTag} dp="2">
    <div ${ref('audioPlayer')} class="audio green-audio-player">
      <div class="play-pause-btn" ${ref('playpauseBtn')}>  
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
          <path fill="#566574" fill-rule="evenodd" d="M18 12L0 24V0" class="play-pause-icon" id="playPause" ${ref('playPause')}/>
        </svg>
      </div>

      <div class="controls">
        <span class="current-time" ${ref('currentTime')}>0:00</span>
        <span> / </span>
        <span class="total-time" ${ref('totalTime')}>0:00</span>
        <div class="slider" ${ref('sliders')} data-direction="horizontal">
          <div class="progress" ${ref('progress')} >
            <div class="pin" id="progress-pin" data-method="${x => x.rewind}"></div>
          </div>
        </div>
      </div>

      <audio ${ref('player')} src="${x => x.src}" type="audio/mpeg"></audio>
    </div>
  </${elevationTag}>`;
};


