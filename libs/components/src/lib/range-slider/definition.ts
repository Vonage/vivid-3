import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';
import styles from './range-slider.scss?inline';
import { RangeSlider } from './range-slider';
import { RangeSliderTemplate as template } from './range-slider.template';
import { RangeSliderThumb, RangeSliderThumbTemplate } from './range-slider-thumb';

export const rangeSliderDefinition =
	RangeSlider.compose<FoundationElementDefinition>({
		baseName: 'range-slider',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

	export const rangeSliderThumbDefinition =
	RangeSliderThumb.compose<FoundationElementDefinition>({
		baseName: 'range-slider-thumb',
		template: RangeSliderThumbTemplate as any,
	});

/**
 * @internal
 */
export const rangeSliderRegistries = [
	...popupRegistries,
	rangeSliderDefinition(),
	rangeSliderThumbDefinition(),
];

/**
 * Registers the range-slider element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRangeSlider = registerFactory(rangeSliderRegistries);
