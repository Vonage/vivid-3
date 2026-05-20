import type { CaptureType } from '@microsoft/fast-element';
import type { Constructor, MixinType } from '../utils/mixins';
import type { VividElement } from '../foundation/vivid-element/vivid-element';
import {
	AriaBindingDirective,
	type BoundAriaProperties,
} from './aria-binding-directive';

/**
 * Directive to set ARIA properties to the host element.
 * This is not technically necessary but allows us to change aria handling for host semantics later.
 */
export function applyHostSemantics<T>(
	boundProperties: BoundAriaProperties<T> = {}
): CaptureType<T, any> {
	return new AriaBindingDirective({
		boundProperties,
		forwardedProperties: new Set(),
		requireHost: true,
	});
}

/**
 * Mixin for components that place semantics on the host element.
 */
export const HostSemantics = <T extends Constructor<VividElement>>(Base: T) => {
	class HostSemanticsElement extends Base {
		/** @internal */
		override _vividAriaBehaviour = 'host' as const;
	}

	return HostSemanticsElement;
};

export type HostSemanticsElement = MixinType<typeof HostSemantics>;
