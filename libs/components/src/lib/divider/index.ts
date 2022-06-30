import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './divider.scss';

import { Divider } from './divider';
import { DividerTemplate as template } from './divider.template';

export const vividDivider = Divider.compose<FoundationElementDefinition>({
  baseName: 'divider',
  template: template as any,
  styles,
});

designSystem.register(vividDivider());
