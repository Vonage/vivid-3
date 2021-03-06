import '../elevation';
import '../icon';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem } from '../../shared/design-system';
import styles from './card.scss';

import { Card } from './card';
import { CardTemplate as template } from './card.template';

export const vividCard = Card.compose<FoundationElementDefinition>({
	baseName: 'card',
	template: template as any,
	styles,
});

designSystem.register(vividCard());
