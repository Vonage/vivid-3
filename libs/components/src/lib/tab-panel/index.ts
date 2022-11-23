import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';

import { TabPanel } from './tab-panel';
import { TabPanelTemplate as template } from './tab-panel.template';

export const vividTabPanel = TabPanel.compose<FoundationElementDefinition>({
	baseName: 'tab-panel',
	template: template as any,
});

designSystem.register(vividTabPanel());
