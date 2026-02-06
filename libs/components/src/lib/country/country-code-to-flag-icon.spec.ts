import { describe, expect, it } from 'vitest';
import { getDialCode, getFlagIconName } from './country-code-to-flag-icon';

describe('country-code-to-flag-icon', () => {
	describe('getDialCode', () => {
		it('returns undefined when countryCode is undefined', () => {
			expect(getDialCode(undefined)).toBeUndefined();
		});

		it('returns undefined when countryCode is empty string', () => {
			expect(getDialCode('')).toBeUndefined();
		});

		it('returns undefined when countryCode is not a string', () => {
			expect(getDialCode(null as unknown as string)).toBeUndefined();
			expect(getDialCode(123 as unknown as string)).toBeUndefined();
		});

		it('returns dial code for valid country code (GB)', () => {
			expect(getDialCode('GB')).toBe('+44');
		});

		it('returns dial code for UK alias (same as GB)', () => {
			expect(getDialCode('UK')).toBe('+44');
		});

		it('is case-insensitive', () => {
			expect(getDialCode('gb')).toBe('+44');
			expect(getDialCode('us')).toBe('+1');
		});

		it('trims whitespace', () => {
			expect(getDialCode('  GB  ')).toBe('+44');
		});

		it('returns undefined for unknown country code', () => {
			expect(getDialCode('XX')).toBeUndefined();
		});
	});

	describe('getFlagIconName', () => {
		it('returns undefined when countryCode is undefined', () => {
			expect(getFlagIconName(undefined)).toBeUndefined();
		});

		it('returns undefined when countryCode is empty string', () => {
			expect(getFlagIconName('')).toBeUndefined();
		});

		it('returns undefined when countryCode is not a string', () => {
			expect(getFlagIconName(null as unknown as string)).toBeUndefined();
			expect(getFlagIconName(123 as unknown as string)).toBeUndefined();
		});

		it('returns flag icon name for valid country code', () => {
			expect(getFlagIconName('GB')).toBe('flag-united-kingdom');
			expect(getFlagIconName('US')).toBe('flag-united-states');
		});

		it('returns flag icon name for UK alias', () => {
			expect(getFlagIconName('UK')).toBe('flag-united-kingdom');
		});

		it('is case-insensitive', () => {
			expect(getFlagIconName('in')).toBe('flag-india');
		});

		it('returns undefined when country has no flag icon (empty iconFlagName)', () => {
			// AS (American Samoa) has empty iconFlagName in countries-data
			expect(getFlagIconName('AS')).toBeUndefined();
		});

		it('returns undefined for unknown country code', () => {
			expect(getFlagIconName('XX')).toBeUndefined();
		});

		it('trims whitespace', () => {
			expect(getFlagIconName('  GB  ')).toBe('flag-united-kingdom');
		});
	});
});
