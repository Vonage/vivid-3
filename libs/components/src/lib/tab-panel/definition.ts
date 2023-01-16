import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';

import { TabPanel } from './tab-panel';
import { TabPanelTemplate as template } from './tab-panel.template';


/**
 * The tab panel element.
 */
export const tabPanelDefinition = TabPanel.compose<FoundationElementDefinition>({
	baseName: 'tab-panel',
	template: template as any,
});

/**
 * @internal
 */
export const tabPanelRegistries = [tabPanelDefinition()];

/**
 * Registers the tab-panel elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTabPanel = registerFactory(tabPanelRegistries);
