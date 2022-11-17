import '../button';
import '../popup';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './toggletip.scss';

import { Toggletip } from './toggletip';
import { ToggletipTemplate as template } from './toggletip.template';

export const vividToggletip = Toggletip.compose<FoundationElementDefinition>({
	baseName: 'toggletip',
	template: template as any,
	styles,
});

designSystem.register(vividToggletip());
