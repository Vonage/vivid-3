import type { RadioOptions } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './radio.scss';

import { Radio } from './radio';
import { RadioTemplate as template } from './radio.template';

const prefix = getPrefix(import.meta.url);

export const vividRadio = Radio.compose<RadioOptions>({
	baseName: 'radio',
	template: template as any,
	styles
});

(async () => {
	await loadComponentsModules(['focus'], prefix);
	designSystem.withPrefix(prefix).register(vividRadio());
})();
