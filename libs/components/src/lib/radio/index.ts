import '../focus';

import type { RadioOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './radio.scss';

import { Radio } from './radio';
import { RadioTemplate as template } from './radio.template';

export const vividRadio = Radio.compose<RadioOptions>({
	baseName: 'radio',
	template: template as any,
	styles
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividRadio());
