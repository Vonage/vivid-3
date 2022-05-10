import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system/vivid-design-system.js';
import styles from './sidenav-item.scss';

import { SidenavItem } from './sidenav-item.js';
import { SidenavItemTemplate as template } from './sidenav-item.template';

export const vividSidenavItem =
	SidenavItem.compose<FoundationElementDefinition>({
		baseName: 'sidenav-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

designSystem.register(vividSidenavItem());
