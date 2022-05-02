import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './toolbar.scss';

import { Toolbar } from './toolbar';
import { ToolbarTemplate as template } from './toolbar.template';

export const vividToolbar = Toolbar.compose<FoundationElementDefinition>({
  baseName: 'toolbar',
  template: template as any,
  styles,
});

designSystem.register(vividToolbar());
