import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

export const vividBreadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividBreadcrumb());

