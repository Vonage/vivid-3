import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './tab.scss';

import { Tab } from './tab';
import { TabTemplate as template } from './tab.template';

export const vividTab = Tab.compose<FoundationElementDefinition>({
	baseName: 'tab',
	template: template as any,
	styles,
});

designSystem.register(vividTab());
