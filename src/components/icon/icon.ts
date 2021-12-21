import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
// import styles from './icon.scss';

import { Icon } from './icon.base';
import { iconTemplate as template } from './icon.template';

import { designSystem } from '../../core/design-system';

export const vividIcon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	// styles,
});

designSystem.register(vividIcon());
