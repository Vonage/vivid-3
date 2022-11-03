import { designSystem } from '../../shared/design-system';
import styles from './radio-group.scss';

import { RadioGroup } from './radio-group';
import { RadioGroupTemplate as template } from './radio-group.template';

export const vividRadioGroup = RadioGroup.compose({
	baseName: 'radio-group',
	template: template as any,
	styles,
});

designSystem.register(vividRadioGroup());
