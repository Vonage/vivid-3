import { VividElement } from '../foundation/vivid-element/vivid-element';
import type { Constructor } from '../utils/mixins';
import type { Locale } from '../localization/Locale';
import { currentLocale } from '../localization';

/**
 * Mixin for elements that need to access the current locale.
 */
export const Localized = <T extends Constructor<VividElement>>(Base: T) => {
	class LocalizedElement extends Base {
		/**
		 * @internal
		 */
		get locale(): Locale {
			return currentLocale.locale;
		}
	}

	return LocalizedElement;
};
