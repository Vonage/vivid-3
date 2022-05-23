import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './top-app-bar.scss';

import { TopAppBar } from './top-app-bar';
import { TopAppBarTemplate as template } from './top-app-bar.template';

export const vividTopAppBar = TopAppBar.compose<FoundationElementDefinition>({
  baseName: 'top-app-bar',
  template: template as any,
  styles,
});

designSystem.register(vividTopAppBar());
