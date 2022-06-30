import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './sidenav-disclosure.scss';

import { Disclosure } from './sidenav-disclosure';
import { SidenavDisclosureTemplate as template } from './sidenav-disclosure.template';

export const vividSidenavDisclosure =
	Disclosure.compose<FoundationElementDefinition>({
		baseName: 'sidenav-disclosure',
		template: template as any,
		styles,
	});

designSystem.register(vividSidenavDisclosure());
