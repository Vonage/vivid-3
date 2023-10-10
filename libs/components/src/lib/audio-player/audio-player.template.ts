/* eslint-disable max-len */
import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { Elevation } from '../elevation/elevation';
import { Button } from '../button/button';
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
	const buttonTag = context.tagFor(Button);
	const elevationTag = context.tagFor(Elevation);

	return html<AudioPlayer>`
	<${elevationTag} dp="2">
    <div class="audio">
      <${buttonTag} icon="play-solid" connotation="${x => x.connotation}" ${ref('playpauseBtn')}></${buttonTag}>

      <div class="controls">
        <span class="current-time" ${ref('currentTime')}>0:00</span>
        <span class="divider">/</span>
        <span class="total-time" ${ref('totalTime')}>0:00</span>
        <div class="slider" ${ref('slider')}>
          <div class="progress" ${ref('progress')}>
            <div class="pin" ${ref('pin')} id="progress-pin"></div>
          </div>
        </div>
      </div>

      <audio ${ref('player')} src="${x => x.src}" type="audio/mpeg"></audio>
    </div>
  </${elevationTag}>`;
};


