import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './initials.scss';

import { Initials } from './initials';
import { InitialsTemplate as template } from './initials.template';

export const vividInitials = Initials.compose<FoundationElementDefinition>({
	baseName: 'initials',
	template: template as any,
	styles,
});

designSystem.register(vividInitials());
