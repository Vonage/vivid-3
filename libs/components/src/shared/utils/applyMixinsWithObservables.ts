import { Observable } from '@microsoft/fast-element';
import { applyMixins } from '@microsoft/fast-foundation';

/**
 * Extends applyMixins to also apply observables from base classes to the derived class.
 */
export function applyMixinsWithObservables(
	derivedCtor: any,
	...baseCtors: any[]
) {
	applyMixins(derivedCtor, ...baseCtors);

	baseCtors.forEach((baseCtor) => {
		Observable.getAccessors(baseCtor.prototype).forEach((accessor) => {
			Observable.defineProperty(derivedCtor.prototype, accessor.name);
		});
	});
}
