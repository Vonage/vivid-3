import { popupDefinition } from '../popup/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './range-slider.scss?inline';
import { RangeSlider } from './range-slider';
import { RangeSliderTemplate as template } from './range-slider.template';

/**
 * @internal
 */
export const rangeSliderDefinition = defineVividComponent(
	'range-slider',
	RangeSlider,
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
 * Registers the range-slider element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRangeSlider = createRegisterFunction(
	rangeSliderDefinition
);
