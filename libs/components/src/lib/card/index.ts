import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import styles from './card.scss';

import { Card } from './card';
import { CardTemplate as template } from './card.template';

const prefix = getPrefix(import.meta.url);

export const vividCard = Card.compose<FoundationElementDefinition>({
	baseName: 'card',
	template: template as any,
	styles,
});

(async () => {
	await loadComponentsModules(['icon', 'elevation'], prefix);
	designSystem.withPrefix(prefix).register(vividCard());
})();
