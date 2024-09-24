import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { buttonRegistries } from '../button/definition';
import styles from './tab.scss?inline';

import { Tab } from './tab';
import { TabTemplate as template } from './tab.template';

export type { TabConnotation, TabShape } from './tab';

/**
 * The tab element.
 */
export const tabDefinition = Tab.compose<FoundationElementDefinition>({
	baseName: 'tab',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const tabRegistries = [tabDefinition(), ...buttonRegistries, ...iconRegistries];

/**
 * Registers the tab elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTab = registerFactory(tabRegistries);
