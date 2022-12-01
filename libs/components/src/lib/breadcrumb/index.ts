import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import { breadcrumbTemplate as template } from './breadcrumb.template';
import styles from './breadcrumb.scss';
import { Breadcrumb } from './breadcrumb';

export const vividBreadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
	baseName: 'breadcrumb',
	template,
	styles,
});

export const getPrefix = (url:string) => new URL(url).searchParams.get('prefix') || 'vwc';

console.log(import.meta.url);

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividBreadcrumb());