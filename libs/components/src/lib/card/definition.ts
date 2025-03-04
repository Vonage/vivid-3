import { iconDefinition } from '../icon/definition';
import { elevationDefinition } from '../elevation/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './card.scss?inline';
import { Card } from './card';
import { CardTemplate as template } from './card.template';

export type { CardAppearance } from './card';

/**
 * @internal
 */
export const cardDefinition = defineVividComponent(
	'card',
	Card,
	template,
	[iconDefinition, elevationDefinition],
	{
		styles,
	}
);

/**
 * Registers the card elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCard = createRegisterFunction(cardDefinition);

export { Card as VwcCardElement };
