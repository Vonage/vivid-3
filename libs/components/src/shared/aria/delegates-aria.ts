import type { CaptureType } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import { ariaMixinProperties } from './aria-mixin';
import {
	AriaBindingDirective,
	type BoundAriaProperties,
} from './aria-binding-directive';

type DelegateAriaOptions = {
	onlySpecified?: boolean; /// Delegate only the specified properties
};

/**
 * Directive to delegate ARIA properties to the target element.
 */
export function delegateAria<T>(
	boundProperties: BoundAriaProperties<T> = {},
	options: DelegateAriaOptions = {}
): CaptureType<T, any> {
	// Forward all other properties to the target element, unless onlySpecified is set
	const forwardedProperties = new Set(
		(options.onlySpecified ? [] : ariaMixinProperties).filter(
			(p) => !(p in boundProperties)
		)
	);

	return new AriaBindingDirective({ boundProperties, forwardedProperties });
}

/**
 * Mixin for components that delegate ARIA properties to an element inside the
 * shadow root.
 */
export const DelegatesAria = <T extends Constructor<VividElement>>(Base: T) => {
	class DelegatesAriaElement extends Base {
		/** @internal */
		override _vividAriaBehaviour = 'delegate' as const;
	}

	return DelegatesAriaElement;
};

export type DelegatesAriaElement = MixinType<typeof DelegatesAria>;
