import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './fab.scss';

import { Fab } from './fab';
import { FabTemplate as template } from './fab.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['icon', 'focus'], prefix);

export const vividFab = Fab.compose<FoundationElementDefinition>({
	baseName: 'fab',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

designSystem.withPrefix(prefix).register(vividFab());
