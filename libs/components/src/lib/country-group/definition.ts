import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { badgeDefinition } from '../badge/definition';
import { countryDefinition } from '../country/definition';
import { popupDefinition } from '../popup/definition';
import styles from './country-group.scss?inline';
import { CountryGroup } from './country-group';
import { CountryGroupTemplate as template } from './country-group.template';

/**
 * @internal
 */
export const countryGroupDefinition = defineVividComponent(
	'country-group',
	CountryGroup,
	template,
	[countryDefinition, badgeDefinition, popupDefinition],
	{
		styles,
	}
);

/**
 * Registers the country-group element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCountryGroup = createRegisterFunction(countryGroupDefinition);

export { CountryGroup as VwcCountryGroupElement };
