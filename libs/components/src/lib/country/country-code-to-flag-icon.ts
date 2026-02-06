import { countries, type Country } from './countries-data';

export type { Country };
export { countries };

const CODE_TO_COUNTRY = new Map<string, Country>(
	countries.map((c) => [c.code, c])
);

/**
 * Returns the dial code for a given country code (e.g. "+44" for GB/UK), or undefined if not found.
 * @param countryCode - ISO 3166-1 alpha-2 code (e.g. "UK", "GB", "US"). Case-insensitive.
 */
export function getDialCode(
	countryCode: string | undefined
): string | undefined {
	if (!countryCode || typeof countryCode !== 'string') {
		return undefined;
	}
	return CODE_TO_COUNTRY.get(countryCode.trim().toUpperCase())?.countryCode;
}

/**
 * Returns the Vivid flag icon name for a given country code (e.g. "flag-india" for IN), or undefined if not available.
 * @param countryCode - ISO 3166-1 alpha-2 code (e.g. "UK", "GB", "US"). Case-insensitive.
 */
export function getFlagIconName(
	countryCode: string | undefined
): string | undefined {
	if (!countryCode || typeof countryCode !== 'string') {
		return undefined;
	}
	const icon = CODE_TO_COUNTRY.get(
		countryCode.trim().toUpperCase()
	)?.iconFlagName;
	return icon && icon.length > 0 ? icon : undefined;
}
