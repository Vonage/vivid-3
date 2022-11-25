import '../icon';
import '../focus';


import { Button as FastButton, type FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { Button } from './button';
import styles from './button.scss';
import { buttonTemplate as template } from './button.template';

/**
 * Represents a button custom element.
 */

export const vividButton = Button.compose<FoundationElementDefinition>({
	baseName: 'button',
	baseClass: FastButton,
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividButton());
