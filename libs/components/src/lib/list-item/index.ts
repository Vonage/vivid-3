import '../focus';
import '../icon';
import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { ListItem } from './list-item';
import { ListItemTemplate as template } from './list-item.template';
import styles from './list-item.scss';

export const vividListItem = ListItem.compose<FoundationElementDefinition>({
	baseName: 'list-item',
	template: template as any,
	styles
});

designSystem.register(vividListItem());
