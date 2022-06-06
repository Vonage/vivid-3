import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './header.scss';

import { header } from './header';
import { headerTemplate as template } from './header.template';

export const vividheader = header.compose<FoundationElementDefinition>({
	baseName: 'header',
	template: template as any,
	styles,
});

designSystem.register(vividheader());
