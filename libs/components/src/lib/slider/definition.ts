import type { SliderOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { focusElements } from '../focus/definition';
import styles from './slider.scss';

import { Slider } from './slider';
import { SliderTemplate as template } from './slider.template';

/**
 * The slider element.
 *
 * @internal
 */
export const sliderDefinition = Slider.compose<SliderOptions>({
	baseName: 'slider',
	template: template as any,
	styles,
});

export const sliderRegistries = [slider(), ...focusRegistries];

/**
 * Registers the slider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSlider = registerFactory(sliderRegistries);
