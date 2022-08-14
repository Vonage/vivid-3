import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './menu.scss';

import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';

export const vividMenu = Menu.compose<FoundationElementDefinition>({
	baseName: 'menu',
	template: template as any,
	styles,
});

designSystem.register(vividMenu());
