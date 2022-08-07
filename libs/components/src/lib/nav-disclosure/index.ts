import '../icon';
import '../focus';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './nav-disclosure.scss';

import { SidenavDisclosure } from './nav-disclosure';
import { SidenavDisclosureTemplate as template } from './nav-disclosure.template';

export const vividSidenavDisclosure =
	SidenavDisclosure.compose<FoundationElementDefinition>({
		baseName: 'nav-disclosure',
		template: template as any,
		styles,
	});

designSystem.register(vividSidenavDisclosure());
