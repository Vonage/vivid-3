import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './action-group.scss';
import '../text-field';

import { ActionGroup } from './action-group';
import { ActionGroupTemplate as template } from './action-group.template';

export const vividActionGroup = ActionGroup.compose<FoundationElementDefinition>({
	baseName: 'action-group',
	template: template as any,
	styles,
});

designSystem.register(vividActionGroup());
