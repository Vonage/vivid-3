import type { Locale } from '../localization/Locale';
import { currentLocale } from '../localization';

export class Localized {
	get locale(): Locale {
		return currentLocale.locale;
	}
}
