import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './dialog.scss';

import { Dialog } from './dialog';
import { DialogTemplate as template } from './dialog.template';

export const vividDialog = Dialog.compose<FoundationElementDefinition>({
  baseName: 'dialog',
  template: template as any,
  styles,
});

designSystem.register(vividDialog());
