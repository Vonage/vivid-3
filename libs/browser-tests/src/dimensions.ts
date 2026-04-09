/** e.g. 'size' */
export type DimensionName = string;

/** e.g. 'large' */
export type DimensionValue = any;
/** Display label for a dimension value. E.g. 'large' instead of '50px' */
export type DimensionValueLabel = string;

/** Values of a dimension can optionally be an object to assign a label to each value */
export type DimensionValues =
	| Array<DimensionValue>
	| Record<DimensionValueLabel, DimensionValue>;

/** By default, the value is stringified to create a label for it */
const labelFromValue = (value: DimensionValue): DimensionValueLabel =>
	typeof value === 'string' ? value : JSON.stringify(value);

export function* iterateValues(
	values: DimensionValues
): Generator<DimensionValue> {
	if (Array.isArray(values)) {
		yield* values;
	} else {
		yield* Object.values(values);
	}
}

export function* iterateLabels(
	values: DimensionValues
): Generator<DimensionValueLabel> {
	if (Array.isArray(values)) {
		for (const value of values) yield labelFromValue(value);
	} else {
		yield* Object.keys(values);
	}
}

export function getDimensionSize(dimension: DimensionValues): number {
	if (Array.isArray(dimension)) {
		return dimension.length;
	}
	return Object.keys(dimension).length;
}

export type Dimensions = Record<DimensionName, DimensionValues>;

/** A cell in the matrix with a single value chosen for each dimension. */
export type Variant = Record<DimensionName, DimensionValue>;

export function generateVariants(dimensions: Dimensions): Variant[] {
	let variants: Variant[] = [{}];

	for (const [dimensionName, dimension] of Object.entries(dimensions)) {
		const newVariants: Variant[] = [];
		for (const variant of variants) {
			for (const value of iterateValues(dimension)) {
				newVariants.push({ ...variant, [dimensionName]: value });
			}
		}
		variants = newVariants;
	}

	return variants;
}
