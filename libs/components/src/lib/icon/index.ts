import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './icon.scss';
import { Icon } from './icon';
import { iconTemplate as template } from './icon.template';


export const vividIcon = Icon.compose<FoundationElementDefinition>({
	baseName: 'icon',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividIcon());
