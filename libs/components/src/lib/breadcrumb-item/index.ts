import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import {designSystem} from '../../shared/design-system/vivid-design-system.js';
import styles from './breadcrumb-item.scss';

import {BreadcrumbItem} from './breadcrumb-item';
import {BreadcrumbItemTemplate as template} from './breadcrumb-item.template';

export const vividBreadcrumbItem = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
});

designSystem.register(vividBreadcrumbItem());
