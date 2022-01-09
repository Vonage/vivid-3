import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../core/design-system';
import { styles } from './icon.styles';

import { Icon } from './icon.base';
import { iconTemplate as template } from './icon.template';


export const vividIcon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
});

designSystem.register(vividIcon());
