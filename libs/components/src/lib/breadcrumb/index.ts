import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './breadcrumb.scss';

import { Breadcrumb } from './breadcrumb';
import { BreadcrumbTemplate as template } from './breadcrumb.template';

export const vividBreadcrumb = Breadcrumb.compose<FoundationElementDefinition>({
  baseName: 'breadcrumb',
  template: template as any,
  styles,
});

designSystem.register(vividBreadcrumb());
