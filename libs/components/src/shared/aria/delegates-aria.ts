import {
	AttachedBehaviorHTMLDirective,
	type CaptureType,
} from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	type BoundAriaProperties,
	DelegateAriaBehavior,
} from './delegate-aria-behavior';
import { ariaMixinProperties } from './aria-mixin';

type DelegateAriaOptions = {
	onlySpecified?: boolean; /// Delegate only the specified properties
};

/**
 * Directive to delegate ARIA properties to the target element.
 */
export function delegateAria<T>(
	boundProperties: BoundAriaProperties<T> = {},
	options: DelegateAriaOptions = {}
): CaptureType<T> {
	// Forward all other properties to the target element, unless onlySpecified is set
	const forwardedProperties = new Set(
		(options.onlySpecified ? [] : ariaMixinProperties)
			.filter((p) => p !== 'role')
			.filter((p) => !(p in boundProperties))
	);

	// If role is a dynamic binding, it may delegate the role (e.g. `role: (x) => x.role ?? 'default'`)
	// Delegating the role and our mitigation (role=presentation) are mutually exclusive
	const disableAccessibilityMitigation =
		boundProperties.role instanceof Function;

	return new AttachedBehaviorHTMLDirective(
		'vvd-delegate-aria',
		DelegateAriaBehavior,
		{
			boundProperties,
			forwardedProperties,
			disableAccessibilityMitigation,
		}
	);
}

/**
 * Mixin for components that delegate ARIA properties to an element inside the
 * shadow root.
 */
export const DelegatesAria = <T extends Constructor<VividElement>>(Base: T) => {
	class DelegatesAriaElement extends Base {
		override _vividAriaBehaviour = 'delegate' as const;
	}

	return DelegatesAriaElement;
};

export type DelegatesAriaElement = MixinType<typeof DelegatesAria>;
