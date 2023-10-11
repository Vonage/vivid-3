/* eslint-disable max-len */
import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Elevation } from '../elevation/elevation';
import { Button } from '../button/button';
import type { AudioPlayer } from './audio-player';

const getClasses = ({ connotation, disabled }: AudioPlayer) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['disabled', Boolean(disabled)],
	);

/**
 * The template for the AudioPlayer component.
 *
 * @param context - element definition context
 * @public
 */
export const AudioPlayerTemplate: (context: ElementDefinitionContext, definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (context: ElementDefinitionContext) => {
	const buttonTag = context.tagFor(Button);
	const elevationTag = context.tagFor(Elevation);

	return html<AudioPlayer>`
	<${elevationTag} dp="2">
    <div class="${getClasses}">
      <${buttonTag} icon="${x => x.paused ? 'play-solid' : 'pause-solid'}" connotation="${x => x.connotation}" @click="${x => x.togglePlay()}"></${buttonTag}>

      <div class="controls">
        <span class="current-time">0:00</span>
        <span class="divider">/</span>
        <span class="total-time">0:00</span>
        <div class="slider" @click="${(x, c) => x.rewind(c.event as MouseEvent)}">
          <div class="progress">
            <div class="pin" id="progress-pin" @mousedown="${x => x.onMouseDown()}"></div>
          </div>
        </div>
      </div>

      <audio src="${x => x.src}" type="audio/mpeg"
      @timeupdate="${x => x.updateProgress()}" @loadedmetadata="${x => x.updateTotalTime()}"></audio>
    </div>
  </${elevationTag}>`;
};


