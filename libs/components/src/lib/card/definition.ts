import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { elevationElements } from '../elevation/definition';
import styles from './card.scss';

import { Card } from './card';
import { CardTemplate as template } from './card.template';


/**
 * The Card component is a container for content and actions.
 *
 * @internal
 */
export const card = Card.compose<FoundationElementDefinition>({
	baseName: 'card',
	template: template as any,
	styles,
})();

export const cardElements = [card, ...iconElements, ...elevationElements];

/**
 * Registers the card elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCard = registerFactorial(cardElements);
