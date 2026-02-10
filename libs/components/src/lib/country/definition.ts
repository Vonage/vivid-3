import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { iconDefinition } from '../icon/definition';
import styles from './country.scss?inline';
import { Country } from './country';
import { CountryTemplate as template } from './country.template';

/**
 * @internal
 */
export const countryDefinition = defineVividComponent(
	'country',
	Country,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the country element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCountry = createRegisterFunction(countryDefinition);

export { Country as VwcCountryElement };
