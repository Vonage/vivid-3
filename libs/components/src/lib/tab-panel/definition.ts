import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { TabPanel } from './tab-panel';
import { TabPanelTemplate as template } from './tab-panel.template';

/**
 * @internal
 */
export const tabPanelDefinition = defineVividComponent(
	'tab-panel',
	TabPanel,
	template,
	[],
	{}
);

/**
 * Registers the tab-panel elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTabPanel = createRegisterFunction(tabPanelDefinition);

export { TabPanel as VwcTabPanelElement };
