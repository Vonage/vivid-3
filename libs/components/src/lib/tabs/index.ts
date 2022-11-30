import { designSystem } from '../../shared/design-system';
import styles from './tabs.scss';

import { Tabs } from './tabs';
import { TabsTemplate as template } from './tabs.template';

export const vividTabs = Tabs.compose({
	baseName: 'tabs',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.register(vividTabs());
