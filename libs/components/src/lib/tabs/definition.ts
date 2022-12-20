import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { tabRegistries } from '../tab/definition';
import { tabPanelRegistries } from '../tab-panel/definition';
import styles from './tabs.scss';

import { Tabs } from './tabs';
import { TabsTemplate as template } from './tabs.template';


/**
 * The tabs element.
 */
export const tabsDefinition = Tabs.compose<FoundationElementDefinition>({
	baseName: 'tabs',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const tabsRegistries = [tabsDefinition(), ...tabRegistries, ...tabPanelRegistries];

/**
 * Registers the tabs elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTabs = registerFactory(tabsRegistries);
