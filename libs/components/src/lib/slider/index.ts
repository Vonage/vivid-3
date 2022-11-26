import type { SliderOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './slider.scss';

import { Slider } from './slider';
import { SliderTemplate as template } from './slider.template';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['focus'], prefix);

export const vividSlider = Slider.compose<SliderOptions>({
	baseName: 'slider',
	template: template as any,
	styles,
});

designSystem.withPrefix(prefix).register(vividSlider());
