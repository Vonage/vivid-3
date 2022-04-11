import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './expansion-panel.scss';

import { ExpansionPanel } from './expansion-panel';
import { ExpansionPanelTemplate as template } from './expansion-panel.template';
import '../icon';

export const vividExpansionPanel =
  ExpansionPanel.compose<FoundationElementDefinition>({
  	baseName: 'expansion-panel',
  	template: template as any,
  	styles,
  });

designSystem.register(vividExpansionPanel());
