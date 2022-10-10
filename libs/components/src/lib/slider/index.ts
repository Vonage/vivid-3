import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './slider.scss';

import { Slider } from './slider';
import { SliderTemplate as template } from './slider.template';

export const vividSlider = Slider.compose<FoundationElementDefinition>({
	baseName: 'slider',
	template: template as any,
	styles,
});

designSystem.register(vividSlider());
