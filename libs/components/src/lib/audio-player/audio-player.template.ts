import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { AudioPlayer } from './audio-player';

const getClasses = (_: AudioPlayer) => classNames('control');

/**
 * The template for the AudioPlayer component.
 *
 * @param context - element definition context
 * @public
 */
export const AudioPlayerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (
	_context: ElementDefinitionContext
) => html`<span class="${getClasses}">
	<audio controls>
	<source src="horse.ogg" type="audio/ogg">
	<source src="horse.mp3" type="audio/mpeg">
	Your browser does not support the audio element.
	</audio>
</span>`;
