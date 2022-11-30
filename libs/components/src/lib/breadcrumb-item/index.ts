import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import {designSystem, getPrefix} from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './breadcrumb-item.scss';

import {BreadcrumbItem} from './breadcrumb-item';
import {BreadcrumbItemTemplate as template} from './breadcrumb-item.template';

const prefix = getPrefix(import.meta.url);

export const vividBreadcrumbItem = BreadcrumbItem.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb-item',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

(async () => {
	await loadComponentsModules(['icon', 'focus'], prefix);
	designSystem.withPrefix(prefix).register(vividBreadcrumbItem());
})();
