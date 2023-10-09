import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
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
export const AudioPlayerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AudioPlayer> = (_context: ElementDefinitionContext) => {
	return html<AudioPlayer>`
		<audio class="${getClasses}" src="${x => x.src}" type="${x => x.type}" controls controlsList="nodownload noplaybackrate">
		</audio>`;
};