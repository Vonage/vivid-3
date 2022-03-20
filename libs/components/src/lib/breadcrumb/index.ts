import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { breadcrumbTemplate as template } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

export const vividBreadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
});

designSystem.register(vividBreadcrumb());
