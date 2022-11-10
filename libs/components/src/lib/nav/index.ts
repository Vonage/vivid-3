import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './nav.scss';

import { Nav } from './nav';
import { NavTemplate as template } from './nav.template';

export const vividNav =
	Nav.compose<FoundationElementDefinition>({
		baseName: 'nav',
		template: template as any,
		styles
	});

designSystem.register(vividNav());
