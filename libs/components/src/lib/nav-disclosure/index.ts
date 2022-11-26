import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './nav-disclosure.scss';

import { NavDisclosure } from './nav-disclosure';
import { NavDisclosureTemplate as template } from './nav-disclosure.template';

const prefix = getPrefix(import.meta.url);

await loadComponentsModules(['icon', 'focus'], prefix);

export const vividNavDisclosure =
	NavDisclosure.compose<FoundationElementDefinition>({
		baseName: 'nav-disclosure',
		template: template as any,
		styles,
	});

designSystem.withPrefix(prefix).register(vividNavDisclosure());
