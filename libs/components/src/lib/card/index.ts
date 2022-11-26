import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../shared/utils';
import styles from './card.scss';

import { Card } from './card';
import { CardTemplate as template } from './card.template';

const prefix = getPrefix(import.meta.url);

loadComponentsModules(['icon', 'elevation'], prefix);

export const vividCard = Card.compose<FoundationElementDefinition>({
	baseName: 'card',
	template: template as any,
	styles,
});

designSystem.withPrefix(prefix).register(vividCard());
