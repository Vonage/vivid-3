import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import type { AudioPlayer } from './audio-player';
import { Elevation } from '../elevation/elevation';

const getClasses = ({ connotation, disabled }: AudioPlayer) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['disabled', Boolean(disabled)],
	);

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const formatTime = (seconds: number) => {
	const outputTime: Array<number> = [];
	[HOUR, MINUTE, SECOND].reduce((ac: number, divider: number) => {
		outputTime.push(~~(ac / divider));
		return ac % divider;
	}, seconds);
	return outputTime
		.filter((segment: number, index: number, arr: number[]) => segment > 0 || index > arr.length - 3)
		.map((segment: number, index: number) => segment.toString().padStart(index === 0 ? 1 : 2, '0'))
		.join(':');
};


function getTimeStampTemplate(_playheadPosition: number, _duration: number) {
	const timeString = _duration === Infinity ? '__ / __' : `${formatTime(_playheadPosition)} / ${formatTime(_duration)}`;
	return html`<div class="playhead-position">${timeString}</div>`;
}

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
	<audio class='audio' src='${x => x.src}'></audio>
	<${elevationTag} dp="2">
		<div class="${getClasses}">
			<${buttonTag}
				aria-label="Play/Pause"
				class="control-button"
				?disabled=${x => x.disabled}
				icon="play-solid"
				connotation=${x => x.connotation}
			></${buttonTag}>
			${x => x.timestamp ? getTimeStampTemplate(x._playheadPosition, x._duration) : ''}
		</div>
	</${elevationTag}>`;
};