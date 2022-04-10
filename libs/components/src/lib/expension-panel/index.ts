import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './expension-panel.scss';

import { ExpensionPanel } from './expension-panel';
import { ExpensionPanelTemplate as template } from './expension-panel.template';

export const vividExpensionPanel =
  ExpensionPanel.compose<FoundationElementDefinition>({
  	baseName: 'expension-panel',
  	template: template as any,
  	styles,
  });

designSystem.register(vividExpensionPanel());
