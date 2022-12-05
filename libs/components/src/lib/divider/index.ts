import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './divider.scss';

import { Divider } from './divider';
import { DividerTemplate as template } from './divider.template';

export const vividDivider = Divider.compose<FoundationElementDefinition>({
	baseName: 'divider',
	template: template as any,
	styles,
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividDivider());
