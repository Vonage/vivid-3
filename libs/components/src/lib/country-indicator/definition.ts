import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { iconDefinition } from '../icon/definition';
import styles from './country-indicator.scss?inline';
import { CountryIndicator } from './country-indicator';
import { CountryIndicatorTemplate as template } from './country-indicator.template';

/**
 * @internal
 */
export const countryIndicatorDefinition = defineVividComponent(
	'country-indicator',
	CountryIndicator,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the country-indicator element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCountryIndicator = createRegisterFunction(
	countryIndicatorDefinition
);

export { CountryIndicator as VwcCountryIndicatorElement };
