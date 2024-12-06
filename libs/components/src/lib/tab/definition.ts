import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './tab.scss?inline';
import { Tab } from './tab';
import { TabTemplate as template } from './tab.template';

export type { TabConnotation, TabShape } from './tab';

/**
 * @internal
 */
export const tabDefinition = defineVividComponent(
	'tab',
	Tab,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the tab elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTab = createRegisterFunction(tabDefinition);
