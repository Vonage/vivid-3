import '../icon';
import '../focus';

import { designSystem } from '../../shared/design-system';
import styles from './tab.scss';

import { Tab } from './tab';
import { TabTemplate as template } from './tab.template';

export const vividTab = Tab.compose({
	baseName: 'tab',
	template: template as any,
	styles,
});

designSystem.register(vividTab());
