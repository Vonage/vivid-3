import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './accordion-item.scss';

import { accordionItem } from './accordion-item';
import { accordionItemTemplate as template } from './accordion-item.template';
import '../icon';

export const vividaccordionItem =
	accordionItem.compose<FoundationElementDefinition>({
		baseName: 'accordion-item', template: template as any, styles,
	});

designSystem.register(vividaccordionItem());
