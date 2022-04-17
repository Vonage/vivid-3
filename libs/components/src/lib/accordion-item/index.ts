import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './accordion-item.scss';

import { AccordionItem } from './accordion-item';
import { AccordionItemTemplate as template } from './accordion-item.template';
import '../icon';

export const vividAccordionItem =
	AccordionItem.compose<FoundationElementDefinition>({
		baseName: 'accordion-item', template: template as any, styles,
	});

designSystem.register(vividAccordionItem());
