import { buttonDefinition } from '../button/definition';
import { sliderDefinition } from '../slider/definition';
import { menuDefinition } from '../menu/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { menuItemDefinition } from '../menu-item/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './audio-player.scss?inline';
import { AudioPlayer } from './audio-player';
import { AudioPlayerTemplate as template } from './audio-player.template';

export type { AudioPlayerConnotation } from './audio-player';

/**
 * @internal
 */
export const audioPlayerDefinition = defineVividComponent(
	'audio-player',
	AudioPlayer,
	template,
	[buttonDefinition, sliderDefinition, menuDefinition, menuItemDefinition],
	{
		styles,
	}
);

/**
 * Registers the audio-player element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerAudioPlayer = createRegisterFunction(
	audioPlayerDefinition
);
