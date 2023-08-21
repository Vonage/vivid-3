import { observable } from '@microsoft/fast-element';
import enUS from '../../locales/en-US';
import type { Locale } from './Locale';

class CurrentLocale {
	@observable locale: Locale = enUS;
}
export const currentLocale = new CurrentLocale();

export const setLocale = (locale: Locale) => {
	currentLocale.locale = locale;
};
