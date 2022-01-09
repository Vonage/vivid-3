import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { styles } from './icon.styles';

import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';

import { designSystem } from '../../core/design-system';

export const vividIcon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
});

designSystem.register(vividIcon());
