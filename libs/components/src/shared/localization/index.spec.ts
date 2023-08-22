import enUS from '../../locales/en-US';
import enGB from '../../locales/en-GB';
import { setLocale } from '../../index';
import { currentLocale } from './index';

describe('currentLocale', () => {
	it('should be initialized to en-US', () => {
		expect(currentLocale.locale).toEqual(enUS);
	});

	it('should update the locale when calling setLocale', () => {
		setLocale(enGB);
		expect(currentLocale.locale).toEqual(enGB);
	});
});
