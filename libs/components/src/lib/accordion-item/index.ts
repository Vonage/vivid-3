import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './accordion-item.scss';

import { AccordionItem } from './accordion-item';
import { AccordionItemTemplate as template } from './accordion-item.template';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['icon', 'focus'], prefix);

export const vividAccordionItem =
	AccordionItem.compose<FoundationElementDefinition>({
		baseName: 'accordion-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	});

designSystem.withPrefix(prefix).register(vividAccordionItem());
