import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './switch.scss';
import '../focus';

import { Switch } from './switch';
import { SwitchTemplate as template } from './switch.template';

export const vividSwitch = Switch.compose<FoundationElementDefinition>({
	baseName: 'switch',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	}
});

designSystem.register(vividSwitch());
