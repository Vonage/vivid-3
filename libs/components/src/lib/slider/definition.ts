import type { SliderOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';
import styles from './slider.scss?inline';

import { Slider } from './slider';
import { SliderTemplate as template } from './slider.template';
export type { SliderConnotation } from './slider';

/**
 * The slider element.
 */
export const sliderDefinition = Slider.compose<SliderOptions>({
	baseName: 'slider',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const sliderRegistries = [...popupRegistries, sliderDefinition()];

/**
 * Registers the slider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSlider = registerFactory(sliderRegistries);
