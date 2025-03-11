import { tabDefinition } from '../tab/definition';
import { tabPanelDefinition } from '../tab-panel/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tabs.scss?inline';
import { Tabs } from './tabs';
import { TabsTemplate as template } from './tabs.template';

/**
 * @internal
 */
export const tabsDefinition = defineVividComponent(
	'tabs',
	Tabs,
	template,
	[tabDefinition, tabPanelDefinition],
	{
		styles,
	}
);

/**
 * Registers the tabs elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTabs = createRegisterFunction(tabsDefinition);

export { Tabs as VwcTabsElement };
