import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';

import { Sidenav } from './sidenav';
import { SidenavTemplate as template } from './sidenav.template';

export const vividSidenav =
	Sidenav.compose<FoundationElementDefinition>({
		baseName: 'sidenav',
		template: template as any,
	});

designSystem.register(vividSidenav());
