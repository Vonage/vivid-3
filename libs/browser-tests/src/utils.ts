/**
 * Flatten a variant by spreading nested objects into a flat record.
 * Useful when specifying dimensions that combine multiple attributes into one value.
 */
export function flattenAttrs(
	variant: Record<string, any>
): Record<string, any> {
	const result: Record<string, any> = {};
	for (const [key, value] of Object.entries(variant)) {
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			Object.assign(result, value as Record<string, any>);
		} else {
			result[key] = value;
		}
	}
	return result;
}
