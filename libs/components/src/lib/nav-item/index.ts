import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './nav-item.scss';

import { SidenavItem } from './nav-item';
import { SidenavItemTemplate as template } from './nav-item.template';

export const vividSidenavItem =
	SidenavItem.compose<FoundationElementDefinition>({
		baseName: 'nav-item',
		template: template as any,
		styles,
	});

designSystem.register(vividSidenavItem());
