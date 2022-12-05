import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './action-group.scss';

import { ActionGroup } from './action-group';
import { ActionGroupTemplate as template } from './action-group.template';

export const vividActionGroup = ActionGroup.compose<FoundationElementDefinition>({
	baseName: 'action-group',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividActionGroup());
