import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './sidenav-disclosure.scss';

import { SidenavDisclosure } from './sidenav-disclosure';
import { SidenavDisclosureTemplate as template } from './sidenav-disclosure.template';

export const vividSidenavDisclosure =
	SidenavDisclosure.compose<FoundationElementDefinition>({
		baseName: 'sidenav-disclosure',
		template: template as any,
		styles,
	});

designSystem.register(vividSidenavDisclosure());
