import { AttributeConfiguration } from '@microsoft/fast-element';

/**
 * Apply mixins to a constructor.
 * @public
 */
export function applyMixins(derivedCtor: any, ...baseCtors: any[]) {
	const derivedAttributes = AttributeConfiguration.locate(derivedCtor);

	baseCtors.forEach((baseCtor) => {
		const baseAttributes = AttributeConfiguration.locate(baseCtor);
		baseAttributes.forEach((x) => derivedAttributes.push(x));
	});
}
