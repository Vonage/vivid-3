import { popupDefinition } from '../popup/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './slider.scss?inline';
import { Slider } from './slider';
import { SliderTemplate as template } from './slider.template';

export type { SliderConnotation } from './slider';

/**
 * @internal
 */
export const sliderDefinition = defineVividComponent(
	'slider',
	Slider,
	template,
	[popupDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the slider elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSlider = createRegisterFunction(sliderDefinition);
