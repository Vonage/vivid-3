import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './video-player.scss?inline';

import { VideoPlayer } from './video-player';
import { VideoPlayerTemplate as template } from './video-player.template';

export const videoPlayerDefinition =
	VideoPlayer.compose<FoundationElementDefinition>({
		baseName: 'video-player',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const videoPlayerRegistries = [videoPlayerDefinition()];

/**
 * Registers the video-player element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerVideoPlayer = registerFactory(videoPlayerRegistries);
