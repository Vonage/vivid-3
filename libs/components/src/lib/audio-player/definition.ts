import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { buttonRegistries } from '../button/definition';
import { sliderRegistries } from '../slider/definition';
import { menuRegistries } from '../menu/definition';
import styles from './audio-player.scss?inline';

import { AudioPlayer } from './audio-player';
import { AudioPlayerTemplate as template } from './audio-player.template';
export type { AudioPlayerConnotation } from './audio-player';

export const audioPlayerDefinition =
	AudioPlayer.compose<FoundationElementDefinition>({
		baseName: 'audio-player',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const audioPlayerRegistries = [
	audioPlayerDefinition(),
	...buttonRegistries,
	...sliderRegistries,
	...menuRegistries,
];

/**
 * Registers the audio-player element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAudioPlayer = registerFactory(audioPlayerRegistries);
