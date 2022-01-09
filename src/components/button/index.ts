import '../icon';

import { Button as FastButton } from '@microsoft/fast-foundation';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';
import { designSystem } from '../../core/design-system';

export const vividButton = Button.compose({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividButton());
