import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import styles from './tab.scss';

import { Tab } from './tab';
import { TabTemplate as template } from './tab.template';


/**
 * The tab element.
 */
export const tabDefinition = Tab.compose<FoundationElementDefinition>({
	baseName: 'tab',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const tabRegistries = [tabDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the tab elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTab = registerFactory(tabRegistries);
