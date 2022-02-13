import '../icon';
import '../focus';


import { Button as FastButton } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';

/**
 * Represents a button custom element.
 */

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
