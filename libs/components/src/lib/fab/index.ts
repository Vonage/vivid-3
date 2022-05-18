import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './fab.scss';

import { Fab } from './fab';
import { FabTemplate as template } from './fab.template';

export const vividFab = Fab.compose<FoundationElementDefinition>({
	baseName: 'fab',
	template: template as any,
	styles,
});

designSystem.register(vividFab());
