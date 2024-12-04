import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './video-player.scss?inline';
import { VideoPlayer } from './video-player';
import { VideoPlayerTemplate as template } from './video-player.template';

/**
 * @internal
 */
export const videoPlayerDefinition = defineVividComponent(
	'video-player',
	VideoPlayer,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the video-player element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerVideoPlayer = createRegisterFunction(
	videoPlayerDefinition
);
