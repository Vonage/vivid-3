import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../core/design-system';
import styles from './icon.scss';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';


export const vividIcon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
});

designSystem.register(vividIcon());
